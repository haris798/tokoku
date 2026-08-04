/**
 * Main Entry Point
 * Inisialisasi awal aplikasi
 */
import './style.css';
import { renderSidebar, renderBottomNav } from './components/layout.js';
import { initRouter, navigateTo } from './utils/router.js';
import { initTheme } from './utils/theme.js';
import { initDB } from './db/indexeddb.js';
import { updateSyncStatusUI } from './utils/supabase.js';
import { showToast } from './utils/toast.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Database
  await initDB();
  
  // Initialize UI components
  renderSidebar();
  renderBottomNav();
  initTheme();
  
  // Initialize Supabase Status
  await updateSyncStatusUI();

  // Manual Sync Button Handler
  const btnManualSync = document.getElementById('btn-manual-sync');
  if (btnManualSync) {
    btnManualSync.addEventListener('click', async () => {
      // Simulate sync delay
      const icon = btnManualSync.querySelector('.material-symbols-outlined');
      if (icon) icon.classList.add('animate-spin');
      
      setTimeout(() => {
        if (icon) icon.classList.remove('animate-spin');
        showToast('Sinkronisasi selesai', 'success');
        
        // Update tooltip status
        const syncStatusEl = document.getElementById('sync-status');
        if (syncStatusEl) {
          syncStatusEl.title = `Terakhir Sync: ${new Date().toLocaleTimeString('id-ID')}`;
        }
      }, 1500);
    });
  }
  
  // Initialize Router
  initRouter();
  
  // Navigate to default route if none
  if (window.location.hash === '') {
    navigateTo('dashboard');
  }
});
