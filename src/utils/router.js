/**
 * Modul Router
 * Mengatur navigasi antar halaman (SPA routing berbasis hash)
 */
import { updateActiveNav } from '../components/layout.js';
import { renderDashboard } from '../pages/dashboard.js';
import { renderSales } from '../pages/sales.js';
import { renderPurchase } from '../pages/purchase.js';
import { renderReport } from '../pages/report.js';
import { renderSettings } from '../pages/settings.js';

const routes = {
  'dashboard': { title: 'Dashboard', subtitle: 'Ringkasan Sistem', render: renderDashboard },
  'sales': { title: 'Penjualan', subtitle: 'Manajemen Transaksi', render: renderSales },
  'purchase': { title: 'Pembelian', subtitle: 'Manajemen Stok & Supplier', render: renderPurchase },
  'report': { title: 'Rekap Data', subtitle: 'Laporan & Analisis', render: renderReport },
  'settings': { title: 'Pengaturan', subtitle: 'Konfigurasi Sistem', render: renderSettings }
};

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  // Initial route
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || 'dashboard';
  const pageId = hash.split('?')[0]; // simple routing
  
  const route = routes[pageId];
  if (route) {
    updatePageContent(pageId, route);
  }
}

export function navigateTo(pageId) {
  window.location.hash = pageId;
}

function updatePageContent(pageId, route) {
  // Update Header
  document.getElementById('page-title').textContent = route.title;
  document.getElementById('page-subtitle').textContent = route.subtitle;
  
  // Update Nav
  updateActiveNav(pageId);
  
  // Render Content
  const container = document.getElementById('page-content');
  container.innerHTML = ''; // clear current
  route.render(container);
}
