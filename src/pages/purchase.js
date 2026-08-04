export function renderPurchase(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto space-y-6">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">Data Pembelian</h2>
         <button class="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-100 dark:shadow-none transition-all flex items-center justify-center gap-2">
           <span class="material-symbols-outlined text-[18px]">add</span>
           Tambah Pembelian
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
            <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th class="px-6 py-4">Tanggal</th>
                <th class="px-6 py-4">Supplier</th>
                <th class="px-6 py-4">Produk</th>
                <th class="px-6 py-4">Qty</th>
                <th class="px-6 py-4">Total</th>
                <th class="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
               <!-- Mock Data -->
               <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                 <td class="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">08-01-2026</td>
                 <td class="px-6 py-4">PT. Sumber Rejeki</td>
                 <td class="px-6 py-4">Kopi Arabica 10kg</td>
                 <td class="px-6 py-4">1</td>
                 <td class="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Rp 1.200.000</td>
                 <td class="px-6 py-4 text-center">
                    <button class="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><span class="material-symbols-outlined text-[18px]">edit</span></button>
                    <button class="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"><span class="material-symbols-outlined text-[18px]">delete</span></button>
                 </td>
               </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  `;
}
