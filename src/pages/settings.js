/**
 * Halaman Pengaturan
 * Mengelola konfigurasi sinkronisasi data dengan Supabase
 */
import { updateSupabaseConfig, getSupabase, updateSyncStatusUI, checkSupabaseSession } from '../utils/supabase.js';
import { getSyncLogs } from '../utils/supabase.js';

export function renderSettings(container) {
  const supabaseUrl = localStorage.getItem('supabase_url') || import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = localStorage.getItem('supabase_anon_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const supabaseUser = import.meta.env.VITE_SUPABASE_USER || '';
  const supabasePass = import.meta.env.VITE_SUPABASE_PASS || '';

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
             <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-2">Supabase URL</label>
             <input type="text" id="supabase-url" placeholder="https://xyzcompany.supabase.co" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors" value="${supabaseUrl}">
           </div>
           <div>
             <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-2">Supabase Anon Key</label>
             <input type="password" id="supabase-anon-key" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors" value="${supabaseAnonKey}">
           </div>
           <div>
             <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-2">Autentikasi (Email)</label>
             <input type="email" id="supabase-email" placeholder="admin@toko.ku" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors" value="${supabaseUser}">
           </div>
           <div>
             <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-2">Password</label>
             <input type="password" id="supabase-password" placeholder="••••••••" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-colors" value="${supabasePass}">
           </div>
           
           <div id="supabase-status-message" class="text-sm font-medium hidden p-3 rounded-lg"></div>

           <button id="btn-save-supabase" class="w-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors mt-2 flex justify-center items-center gap-2">
             <span class="material-symbols-outlined text-[18px]">login</span>
             Simpan Konfigurasi & Login
           </button>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
           <div>
             <h3 class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
               <span class="material-symbols-outlined text-indigo-600 dark:text-indigo-400">history</span>
               Log Sinkronisasi
             </h3>
             <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Riwayat proses sinkronisasi dengan Supabase.</p>
           </div>
           <button id="btn-clear-logs" class="text-xs text-slate-500 hover:text-rose-500 transition-colors">Bersihkan Log</button>
        </div>
        <div class="p-0">
           <ul id="sync-log-list" class="divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto">
             <!-- Logs will be rendered here -->
           </ul>
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

  setupSupabaseHandlers();
  renderSyncLogs();

  // Listen to custom event to update logs dynamically
  window.addEventListener('syncLogsUpdated', renderSyncLogs);
  
  document.getElementById('btn-clear-logs').addEventListener('click', () => {
    localStorage.removeItem('sync_logs');
    renderSyncLogs();
  });
}

function renderSyncLogs() {
  const logList = document.getElementById('sync-log-list');
  if (!logList) return;
  
  const logs = getSyncLogs();
  
  if (logs.length === 0) {
    logList.innerHTML = `
      <li class="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Belum ada riwayat sinkronisasi.
      </li>
    `;
    return;
  }
  
  logList.innerHTML = logs.map(log => {
    const time = new Date(log.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = new Date(log.time).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    
    let icon = 'info';
    let iconColor = 'text-blue-500';
    let bgHover = 'hover:bg-blue-50/50 dark:hover:bg-blue-500/10';
    
    if (log.type === 'error') {
      icon = 'error';
      iconColor = 'text-rose-500';
      bgHover = 'hover:bg-rose-50/50 dark:hover:bg-rose-500/10';
    } else if (log.type === 'success') {
      icon = 'check_circle';
      iconColor = 'text-emerald-500';
      bgHover = 'hover:bg-emerald-50/50 dark:hover:bg-emerald-500/10';
    }
    
    return `
      <li class="p-4 flex gap-3 transition-colors ${bgHover}">
        <span class="material-symbols-outlined ${iconColor} mt-0.5 text-[18px]">${icon}</span>
        <div class="flex-1">
          <p class="text-sm font-medium text-slate-800 dark:text-slate-200">${log.message}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${date}, ${time}</p>
        </div>
      </li>
    `;
  }).join('');
}

async function setupSupabaseHandlers() {
  const btnSave = document.getElementById('btn-save-supabase');
  const statusMsg = document.getElementById('supabase-status-message');
  
  const showMessage = (msg, isError = false) => {
    statusMsg.textContent = msg;
    statusMsg.className = `text-sm font-medium p-3 rounded-lg mb-2 ${isError ? 'bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'}`;
    statusMsg.classList.remove('hidden');
  };

  const updateUIState = async () => {
    const isConnected = await checkSupabaseSession();
    if (isConnected) {
      btnSave.classList.add('hidden');
      document.getElementById('supabase-email').parentElement.classList.add('hidden');
      document.getElementById('supabase-password').parentElement.classList.add('hidden');
      showMessage('Berhasil terhubung dengan Supabase.');
    } else {
      btnSave.classList.remove('hidden');
      document.getElementById('supabase-email').parentElement.classList.remove('hidden');
      document.getElementById('supabase-password').parentElement.classList.remove('hidden');
    }
  };

  await updateUIState();

  btnSave.addEventListener('click', async () => {
    const url = document.getElementById('supabase-url').value.trim();
    const key = document.getElementById('supabase-anon-key').value.trim();
    const email = document.getElementById('supabase-email').value.trim();
    const password = document.getElementById('supabase-password').value.trim();

    if (!url || !key) {
      showMessage('URL dan Anon Key wajib diisi.', true);
      return;
    }

    btnSave.disabled = true;
    btnSave.innerHTML = '<span class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Menyimpan...';

    // Update config first
    const supabase = updateSupabaseConfig(url, key);

    if (email && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        await updateUIState();
        updateSyncStatusUI();
      } catch (e) {
        showMessage('Login gagal: ' + e.message, true);
      }
    } else {
      showMessage('Konfigurasi disimpan. Masukkan email & password untuk login.', false);
      updateSyncStatusUI(); // Try to update status if session exists
    }

    btnSave.disabled = false;
    btnSave.innerHTML = '<span class="material-symbols-outlined text-[18px]">login</span> Simpan Konfigurasi & Login';
  });
}


