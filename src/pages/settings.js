export function renderSettings(container) {
  container.innerHTML = `
    <div class="max-w-3xl mx-auto space-y-6">
      <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">Pengaturan Sistem</h2>

      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 dark:border-slate-800">
           <h3 class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
             <span class="material-symbols-outlined text-indigo-600 dark:text-indigo-400">cloud_sync</span>
             Sinkronisasi Supabase
           </h3>
           <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Hubungkan aplikasi dengan database cloud untuk auto-sync data.</p>
        </div>
        <div class="p-6 space-y-4">
           <div>
             <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Supabase URL</label>
             <input type="text" placeholder="https://xyzcompany.supabase.co" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors" readonly value="Terhubung via env">
           </div>
           <div>
             <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Autentikasi (Email)</label>
             <input type="email" placeholder="admin@toko.ku" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors">
           </div>
           <div>
             <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Password</label>
             <input type="password" placeholder="••••••••" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors">
           </div>
           <button class="w-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors mt-2">
             Login & Aktifkan Sinkronisasi
           </button>
        </div>
      </div>
      
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 dark:border-slate-800">
           <h3 class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
             <span class="material-symbols-outlined text-indigo-600 dark:text-indigo-400">save</span>
             Data Lokal
           </h3>
           <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Manajemen database IndexedDB pada perangkat ini.</p>
        </div>
        <div class="p-6 flex flex-col md:flex-row gap-4">
           <button class="flex-1 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 px-5 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
             <span class="material-symbols-outlined text-[20px]">file_download</span>
             Backup JSON
           </button>
           <button class="flex-1 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-5 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
             <span class="material-symbols-outlined text-[20px]">file_upload</span>
             Restore JSON
           </button>
        </div>
      </div>
      
    </div>
  `;
}

