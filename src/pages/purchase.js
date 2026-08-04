/**
 * Halaman Pembelian
 * Menangani daftar pembelian, form tambah pembelian, dan UI terkait
 */
import { getAllData, addData, deleteData } from '../db/indexeddb.js';
import { showModal, hideModal } from '../utils/modal.js';
import { showToast } from '../utils/toast.js';

export async function renderPurchase(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto space-y-6">
      
      <div class="flex flex-row justify-between items-center gap-4">
         <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">Data Pembelian</h2>
         <button id="btn-add-purchase" class="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white w-10 h-10 rounded-xl font-bold text-sm shadow-md shadow-indigo-100 dark:shadow-none transition-all flex items-center justify-center" title="Tambah Pembelian">
           <span class="material-symbols-outlined text-[20px]">add</span>
         </button>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between">
           <div class="relative flex-1 max-w-md">
             <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
             <input type="text" placeholder="Cari nota, supplier, produk..." class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors">
           </div>
           <button class="border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
             <span class="material-symbols-outlined text-[18px]">filter_list</span>
             Filter
           </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm whitespace-nowrap">
            <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs capitalize font-bold tracking-wider">
              <tr>
                <th class="px-6 py-4">Tanggal</th>
                <th class="px-6 py-4">Supplier</th>
                <th class="px-6 py-4">Produk</th>
                <th class="px-6 py-4">Qty</th>
                <th class="px-6 py-4">Total</th>
                <th class="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody id="purchase-table-body" class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
               <tr>
                 <td colspan="6" class="px-6 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                    Memuat data...
                 </td>
               </tr>
            </tbody>
          </table>
        </div>
        
        <div class="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
           <span id="purchase-count">Menampilkan 0 transaksi</span>
           <div class="flex gap-1">
             <button class="p-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"><span class="material-symbols-outlined text-[18px]">chevron_left</span></button>
             <button class="p-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800"><span class="material-symbols-outlined text-[18px]">chevron_right</span></button>
           </div>
        </div>
      </div>
      
    </div>
  `;

  document.getElementById('btn-add-purchase').addEventListener('click', () => {
    showPurchaseModal(null, loadPurchases);
  });

  document.getElementById('purchase-table-body').addEventListener('click', async (e) => {
    const btnEdit = e.target.closest('.btn-edit-purchase');
    const btnDelete = e.target.closest('.btn-delete-purchase');
    
    if (btnEdit) {
      const id = btnEdit.dataset.id;
      const purchases = await getAllData('purchase');
      const purchase = purchases.find(p => p.id === id);
      if (purchase) showPurchaseModal(purchase, loadPurchases);
    } else if (btnDelete) {
      const id = btnDelete.dataset.id;
      if (confirm('Apakah Anda yakin ingin menghapus pembelian ini?')) {
        try {
          await deleteData('purchase', id);
          showToast('Pembelian dihapus', 'success');
          loadPurchases();
        } catch (err) {
          showToast('Gagal menghapus', 'error');
        }
      }
    }
  });

  await loadPurchases();
}

async function loadPurchases() {
  const tbody = document.getElementById('purchase-table-body');
  const countEl = document.getElementById('purchase-count');
  
  if (!tbody) return;

  try {
    const purchases = await getAllData('purchase');
    purchases.sort((a, b) => new Date(b.date) - new Date(a.date)); // descending

    countEl.textContent = `Menampilkan ${purchases.length} transaksi`;

    if (purchases.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
            Belum ada data pembelian.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = purchases.map(purchase => `
      <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
        <td class="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">${new Date(purchase.date).toLocaleDateString('id-ID')}</td>
        <td class="px-6 py-4">${purchase.supplier}</td>
        <td class="px-6 py-4">${purchase.product}</td>
        <td class="px-6 py-4">${purchase.qty}</td>
        <td class="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Rp ${Number(purchase.total).toLocaleString('id-ID')}</td>
        <td class="px-6 py-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <button class="btn-edit-purchase p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors" data-id="${purchase.id}" title="Edit">
              <span class="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button class="btn-delete-purchase p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors" data-id="${purchase.id}" title="Hapus">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
    
  } catch (e) {
    console.error(e);
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center text-rose-500 dark:text-rose-400 text-sm">
          Gagal memuat data.
        </td>
      </tr>
    `;
  }
}

function showPurchaseModal(purchaseData, onSuccess) {
  const isEdit = !!purchaseData;
  const modalHtml = `
    <div class="modal-content w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-800">
      <div class="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
        <h3 class="font-bold text-lg text-slate-800 dark:text-slate-100">${isEdit ? 'Edit' : 'Tambah'} Pembelian</h3>
        <div class="flex items-center gap-2">
          <button type="submit" form="form-add-purchase" class="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors flex items-center justify-center p-1" title="Simpan">
            <span class="material-symbols-outlined">save</span>
          </button>
          <button type="button" data-close-modal class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors flex items-center justify-center p-1" title="Tutup">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
      <form id="form-add-purchase" class="p-5 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-2">Tanggal</label>
            <input type="date" id="purchase-date" required class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-2">Supplier</label>
            <input type="text" id="purchase-supplier" required placeholder="Nama Supplier" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-2">Produk</label>
          <input type="text" id="purchase-product" required placeholder="Nama Produk" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-2">Qty</label>
            <input type="number" id="purchase-qty" required min="1" placeholder="0" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-2">Harga Satuan (Rp)</label>
            <input type="number" id="purchase-price" required min="0" placeholder="0" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-2">Ongkir (Rp)</label>
          <input type="number" id="purchase-ongkir" required min="0" placeholder="0" value="0" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors">
        </div>
      </form>
    </div>
  `;

  showModal(modalHtml, (container) => {
    if (isEdit) {
      document.getElementById('purchase-date').value = purchaseData.date;
      document.getElementById('purchase-supplier').value = purchaseData.supplier;
      document.getElementById('purchase-product').value = purchaseData.product;
      document.getElementById('purchase-qty').value = purchaseData.qty;
      document.getElementById('purchase-price').value = purchaseData.price;
      document.getElementById('purchase-ongkir').value = purchaseData.ongkir || 0;
    } else {
      document.getElementById('purchase-date').valueAsDate = new Date();
    }
    
    document.getElementById('form-add-purchase').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const date = document.getElementById('purchase-date').value;
      const supplier = document.getElementById('purchase-supplier').value;
      const product = document.getElementById('purchase-product').value;
      const qty = parseInt(document.getElementById('purchase-qty').value, 10);
      const price = parseInt(document.getElementById('purchase-price').value, 10);
      const ongkir = parseInt(document.getElementById('purchase-ongkir').value, 10) || 0;
      const total = (qty * price) + ongkir;
      
      const newPurchase = {
        id: isEdit ? purchaseData.id : crypto.randomUUID(),
        date,
        supplier,
        product,
        qty,
        price,
        ongkir,
        total,
        updated_at: new Date().toISOString()
      };

      try {
        await addData('purchase', newPurchase); // idb put works as update if id exists
        showToast(isEdit ? 'Pembelian diperbarui' : 'Pembelian berhasil ditambahkan', 'success');
        hideModal();
        if (onSuccess) onSuccess();
      } catch (err) {
        showToast('Gagal menyimpan pembelian', 'error');
        console.error(err);
      }
    });
  });
}
