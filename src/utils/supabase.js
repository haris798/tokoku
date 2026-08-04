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
