export function renderReport(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto space-y-6">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">Rekap Data</h2>
         <button class="w-full md:w-auto border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
           <span class="material-symbols-outlined text-[18px]">download</span>
           Export Semua Laporan
         </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-colors cursor-pointer group">
           <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <span class="material-symbols-outlined">receipt_long</span>
           </div>
           <h3 class="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1">Rekap Penjualan</h3>
           <p class="text-xs text-slate-500 dark:text-slate-400">Laporan transaksi harian, bulanan dengan filter lengkap.</p>
        </div>
        
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-colors cursor-pointer group">
           <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <span class="material-symbols-outlined">inventory_2</span>
           </div>
           <h3 class="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1">Rekap Produk</h3>
           <p class="text-xs text-slate-500 dark:text-slate-400">Analisis stok masuk, keluar, dan sisa per produk.</p>
        </div>
        
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-colors cursor-pointer group">
           <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <span class="material-symbols-outlined">group</span>
           </div>
           <h3 class="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1">Rekap Customer</h3>
           <p class="text-xs text-slate-500 dark:text-slate-400">Detail total belanja dan histori transaksi per pelanggan.</p>
        </div>
      </div>
      
    </div>
  `;
}
