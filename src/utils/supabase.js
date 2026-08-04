/**
 * Modul Supabase
 * Mengatur inisialisasi, autentikasi, dan status sinkronisasi cloud
 */
import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

export function getSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const url = localStorage.getItem('supabase_url') || import.meta.env.VITE_SUPABASE_URL || '';
  const key = localStorage.getItem('supabase_anon_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  if (url && key) {
    try {
      supabaseInstance = createClient(url, key);
    } catch (e) {
      console.error('Failed to initialize Supabase:', e);
    }
  }

  return supabaseInstance;
}

export function updateSupabaseConfig(url, key) {
  localStorage.setItem('supabase_url', url);
  localStorage.setItem('supabase_anon_key', key);
  supabaseInstance = null; // force re-init
  return getSupabase();
}

export async function checkSupabaseSession() {
  const supabase = getSupabase();
  if (!supabase) return false;
  
  try {
    const { data, error } = await supabase.auth.getSession();
    return !error && !!data.session;
  } catch(e) {
    return false;
  }
}

export function addSyncLog(message, type = 'info') {
  const logs = JSON.parse(localStorage.getItem('sync_logs') || '[]');
  const now = new Date();
  logs.unshift({
    id: crypto.randomUUID(),
    time: now.toISOString(),
    message,
    type
  });
  if (logs.length > 50) logs.length = 50;
  localStorage.setItem('sync_logs', JSON.stringify(logs));
  
  // Custom event to trigger UI update
  window.dispatchEvent(new Event('syncLogsUpdated'));
}

export function getSyncLogs() {
  return JSON.parse(localStorage.getItem('sync_logs') || '[]');
}

export async function syncDataToCloud() {
  const supabase = getSupabase();
  if (!supabase) {
    addSyncLog('Gagal memulai sinkronisasi: Supabase tidak terhubung', 'error');
    return { success: false, error: 'Supabase tidak terhubung' };
  }

  addSyncLog('Memulai sinkronisasi data...', 'info');

  try {
    const { getAllData } = await import('../db/indexeddb.js');
    
    // Ambil session user untuk ditambahkan ke payload jika RLS mewajibkan user_id
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    const sales = await getAllData('sales');
    const purchases = await getAllData('purchase');

    // 1. Sync Products (Extract unique products from local data)
    const productNames = [...new Set([
      ...sales.map(s => s.product), 
      ...purchases.map(p => p.product)
    ])].filter(Boolean);

    let productMap = {}; // name -> id
    
    if (productNames.length > 0) {
      addSyncLog(`Menyiapkan ${productNames.length} produk...`, 'info');
      // Fetch existing products
      const { data: existingProducts, error: prodErr } = await supabase.from('products').select('id, name');
      if (prodErr && !prodErr.message?.includes('row-level security')) throw prodErr; // Abaikan error RLS select sementara jika policy belum lengkap
      
      const existingNames = (existingProducts || []).map(p => p.name);
      const newProducts = productNames.filter(n => !existingNames.includes(n)).map(name => ({ name }));
      
      if (newProducts.length > 0) {
         const { data: inserted, error: insErr } = await supabase.from('products').insert(newProducts).select('id, name');
         if (insErr && !insErr.message?.includes('row-level security')) {
           console.warn('Gagal insert produk baru', insErr);
         }
         if (inserted) {
           inserted.forEach(p => productMap[p.name] = p.id);
         }
      }
      
      (existingProducts || []).forEach(p => productMap[p.name] = p.id);
    }

    // 2. Sync Sales & Sale Items
    if (sales.length > 0) {
      addSyncLog(`Sinkronisasi ${sales.length} data penjualan...`, 'info');
      
      const salesPayload = sales.map(s => ({
        id: s.id,
        sale_date: s.date,
        customer_name: s.customer,
        total_amount: s.total,
        created_at: s.updated_at || new Date().toISOString()
      }));
      
      const { error: salesError } = await supabase.from('sales').upsert(salesPayload);
      if (salesError) throw salesError;

      const saleItemsPayload = sales.map(s => ({
        id: s.id, // Using sale id as item id (1:1 relation locally) to ensure upsert works correctly
        sale_id: s.id,
        product_id: productMap[s.product] || null,
        quantity: s.qty,
        price: s.price,
        created_at: s.updated_at || new Date().toISOString()
      }));

      const { error: saleItemsError } = await supabase.from('sale_items').upsert(saleItemsPayload);
      if (saleItemsError) throw saleItemsError;
    }

    // 3. Sync Purchases & Purchase Items
    if (purchases.length > 0) {
      addSyncLog(`Sinkronisasi ${purchases.length} data pembelian...`, 'info');
      
      const purchasesPayload = purchases.map(p => ({
        id: p.id,
        purchase_date: p.date,
        supplier_name: p.supplier,
        total_amount: p.total,
        created_at: p.updated_at || new Date().toISOString()
      }));
      
      const { error: purchaseError } = await supabase.from('purchases').upsert(purchasesPayload);
      if (purchaseError) throw purchaseError;

      const purchaseItemsPayload = purchases.map(p => ({
        id: p.id, // Using purchase id as item id
        purchase_id: p.id,
        product_id: productMap[p.product] || null,
        quantity: p.qty,
        price: p.price,
        created_at: p.updated_at || new Date().toISOString()
      }));

      const { error: purchaseItemsError } = await supabase.from('purchase_items').upsert(purchaseItemsPayload);
      if (purchaseItemsError) throw purchaseItemsError;
    }

    addSyncLog('Sinkronisasi selesai dengan sukses', 'success');
    return { success: true };
  } catch (error) {
    console.error('Error syncing to Supabase:', error);
    let errorMsg = error.message || JSON.stringify(error);
    
    if (errorMsg.includes('row-level security')) {
      errorMsg = 'Akses ditolak (RLS). Pastikan Policy tabel sudah benar di Supabase.';
    } else if (errorMsg.includes('does not exist')) {
      errorMsg = `Tabel atau kolom tidak ditemukan: ${errorMsg}`;
    }
    
    addSyncLog(`Sinkronisasi gagal: ${errorMsg}`, 'error');
    return { success: false, error: errorMsg };
  }
}

export async function updateSyncStatusUI() {
  const syncStatusEl = document.getElementById('sync-status');
  const btnManualSync = document.getElementById('btn-manual-sync');
  if (!syncStatusEl) return;

  const indicator = syncStatusEl.querySelector('.indicator');
  const icon = syncStatusEl.querySelector('.material-symbols-outlined');

  const isConnected = await checkSupabaseSession();

  if (isConnected) {
    if (btnManualSync) btnManualSync.classList.remove('hidden');
    syncStatusEl.classList.remove('bg-slate-100', 'text-slate-500', 'border-slate-200');
    syncStatusEl.classList.add('bg-emerald-50', 'text-emerald-600', 'border-emerald-200');
    
    // dark mode classes
    syncStatusEl.classList.remove('dark:bg-slate-800', 'dark:text-slate-400', 'dark:border-slate-700');
    syncStatusEl.classList.add('dark:bg-emerald-500/10', 'dark:text-emerald-400', 'dark:border-emerald-500/20');

    if (indicator) {
      indicator.classList.remove('bg-slate-400');
      indicator.classList.add('bg-emerald-500');
    }
    if (icon) icon.textContent = 'cloud_done';
  } else {
    if (btnManualSync) btnManualSync.classList.add('hidden');
    syncStatusEl.classList.remove('bg-emerald-50', 'text-emerald-600', 'border-emerald-200');
    syncStatusEl.classList.add('bg-slate-100', 'text-slate-500', 'border-slate-200');

    // dark mode classes
    syncStatusEl.classList.remove('dark:bg-emerald-500/10', 'dark:text-emerald-400', 'dark:border-emerald-500/20');
    syncStatusEl.classList.add('dark:bg-slate-800', 'dark:text-slate-400', 'dark:border-slate-700');

    if (indicator) {
      indicator.classList.remove('bg-emerald-500');
      indicator.classList.add('bg-slate-400');
    }
    if (icon) icon.textContent = 'cloud_off';
  }
}
