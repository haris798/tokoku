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

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Database
  await initDB();
  
  // Initialize UI components
  renderSidebar();
  renderBottomNav();
  initTheme();
  
  // Initialize Supabase Status
  await updateSyncStatusUI();
  
  // Initialize Router
  initRouter();
  
  // Navigate to default route if none
  if (window.location.hash === '') {
    navigateTo('dashboard');
  }
});
