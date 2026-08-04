export function renderDashboard(container) {
  // Extracting from the HTML design block provided
  container.innerHTML = `
    <div class="space-y-6 max-w-7xl mx-auto">
      <!-- Metric Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Penjualan</p>
          <p class="text-2xl font-black text-slate-800 dark:text-slate-100">Rp 12.450.000</p>
          <p class="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">trending_up</span> 12% vs bln lalu
          </p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Pembelian</p>
          <p class="text-2xl font-black text-slate-800 dark:text-slate-100">Rp 8.210.000</p>
          <p class="text-xs text-slate-400 font-bold mt-2 flex items-center gap-1">
             <span class="material-symbols-outlined text-[14px]">receipt_long</span> 24 Transaksi
          </p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Laba Kotor</p>
          <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400">Rp 4.240.000</p>
          <p class="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2 flex items-center gap-1">
             <span class="material-symbols-outlined text-[14px]">account_balance_wallet</span> Margin 34%
          </p>
        </div>
        <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-900 dark:to-indigo-950 p-5 rounded-2xl border border-indigo-500 dark:border-indigo-800 shadow-sm flex flex-col justify-between text-white">
          <p class="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-1">Sisa Stok Produk</p>
          <p class="text-2xl font-black">1.422 Unit</p>
          <p class="text-xs text-indigo-200 font-bold mt-2 flex items-center gap-1">
             <span class="material-symbols-outlined text-[14px]">warning</span> 8 Produk Menipis
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Chart Mockup (In reality we'd use Chart.js, here's the styled empty container) -->
        <div class="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 md:p-6 flex flex-col min-h-[300px]">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-slate-800 dark:text-slate-100">Grafik Penjualan vs Pembelian</h3>
            <select class="text-xs border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 px-2 py-1 outline-none text-slate-600 dark:text-slate-300 font-medium">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
            </select>
          </div>
          
          <div class="flex-1 relative flex items-end gap-2 md:gap-4 pb-4 mt-4">
             <!-- Mocked Bar Chart for Visual Polish -->
            <div class="flex-1 h-[60%] bg-indigo-50 dark:bg-indigo-900/30 rounded-t-lg relative group transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50">
              <div class="absolute bottom-0 w-full h-[80%] bg-indigo-500 dark:bg-indigo-500/80 rounded-t-lg transition-all group-hover:bg-indigo-600"></div>
            </div>
            <div class="flex-1 h-[75%] bg-indigo-50 dark:bg-indigo-900/30 rounded-t-lg relative group transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50">
               <div class="absolute bottom-0 w-full h-[65%] bg-indigo-500 dark:bg-indigo-500/80 rounded-t-lg transition-all group-hover:bg-indigo-600"></div>
            </div>
            <div class="flex-1 h-[90%] bg-indigo-50 dark:bg-indigo-900/30 rounded-t-lg relative group transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50">
               <div class="absolute bottom-0 w-full h-[85%] bg-indigo-500 dark:bg-indigo-500/80 rounded-t-lg transition-all group-hover:bg-indigo-600"></div>
            </div>
            <div class="flex-1 h-[55%] bg-indigo-50 dark:bg-indigo-900/30 rounded-t-lg relative group transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50">
               <div class="absolute bottom-0 w-full h-[40%] bg-indigo-500 dark:bg-indigo-500/80 rounded-t-lg transition-all group-hover:bg-indigo-600"></div>
            </div>
            <div class="flex-1 h-[80%] bg-indigo-50 dark:bg-indigo-900/30 rounded-t-lg relative group transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50">
               <div class="absolute bottom-0 w-full h-[70%] bg-indigo-500 dark:bg-indigo-500/80 rounded-t-lg transition-all group-hover:bg-indigo-600"></div>
            </div>
            <div class="flex-1 h-[65%] bg-indigo-50 dark:bg-indigo-900/30 rounded-t-lg relative group transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50">
               <div class="absolute bottom-0 w-full h-[50%] bg-indigo-500 dark:bg-indigo-500/80 rounded-t-lg transition-all group-hover:bg-indigo-600"></div>
            </div>
            <div class="flex-1 h-[100%] bg-indigo-50 dark:bg-indigo-900/30 rounded-t-lg relative group transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50">
               <div class="absolute bottom-0 w-full h-[90%] bg-indigo-500 dark:bg-indigo-500/80 rounded-t-lg transition-all group-hover:bg-indigo-600"></div>
            </div>
          </div>
          <div class="flex justify-between text-[10px] text-slate-400 font-bold px-2 pt-2 border-t border-slate-50 dark:border-slate-800/50">
            <span>SEN</span><span>SEL</span><span>RAB</span><span>KAM</span><span>JUM</span><span>SAB</span><span>MIN</span>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 md:p-6 overflow-hidden flex flex-col">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-slate-800 dark:text-slate-100">Transaksi Terakhir</h3>
          </div>
          <div class="space-y-4 flex-1 overflow-y-auto pr-2">
            
            <div class="flex items-center gap-3 border-b border-slate-50 dark:border-slate-800/50 pb-3">
              <div class="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs shrink-0 border border-emerald-100 dark:border-emerald-500/20">
                <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">Penjualan #0442</p>
                <p class="text-[10px] text-slate-400 truncate">Ahmad Sudrajat</p>
              </div>
              <p class="text-xs font-black text-emerald-600 dark:text-emerald-400 text-right shrink-0">+Rp 145rb</p>
            </div>
            
            <div class="flex items-center gap-3 border-b border-slate-50 dark:border-slate-800/50 pb-3">
              <div class="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs shrink-0 border border-rose-100 dark:border-rose-500/20">
                <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">Pembelian Stok</p>
                <p class="text-[10px] text-slate-400 truncate">PT. Sumber Rejeki</p>
              </div>
              <p class="text-xs font-black text-rose-600 dark:text-rose-400 text-right shrink-0">-Rp 1.2jt</p>
            </div>
            
            <div class="flex items-center gap-3 border-b border-slate-50 dark:border-slate-800/50 pb-3">
              <div class="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs shrink-0 border border-emerald-100 dark:border-emerald-500/20">
                <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">Penjualan #0441</p>
                <p class="text-[10px] text-slate-400 truncate">Sari Indah</p>
              </div>
              <p class="text-xs font-black text-emerald-600 dark:text-emerald-400 text-right shrink-0">+Rp 62rb</p>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs shrink-0 border border-emerald-100 dark:border-emerald-500/20">
                <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">Penjualan #0440</p>
                <p class="text-[10px] text-slate-400 truncate">Walk-in Customer</p>
              </div>
              <p class="text-xs font-black text-emerald-600 dark:text-emerald-400 text-right shrink-0">+Rp 210rb</p>
            </div>
            
          </div>
          <button class="mt-4 w-full py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold text-[10px] rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors uppercase tracking-wider">
            Lihat Semua
          </button>
        </div>
      </div>
      
      <!-- Action Bar Desktop (Optional representation from Polish theme) -->
      <div class="hidden md:flex bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm items-center gap-4">
         <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-100 dark:shadow-none transition-all flex items-center gap-2">
           <span class="material-symbols-outlined text-[18px]">add_circle</span>
           Transaksi Baru
         </button>
         <button class="border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
           <span class="material-symbols-outlined text-[18px]">download</span>
           Export Laporan
         </button>
         <div class="ml-auto text-xs font-medium text-slate-400 flex items-center gap-2">
            <span class="block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Data Tersinkronisasi Otomatis
         </div>
      </div>

    </div>
  `;
}
