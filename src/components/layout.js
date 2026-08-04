import { navigateTo } from '../utils/router.js';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'sales', label: 'Penjualan', icon: 'point_of_sale' },
  { id: 'purchase', label: 'Pembelian', icon: 'shopping_cart' },
  { id: 'report', label: 'Rekap Data', icon: 'monitoring' },
];

const settingsItem = { id: 'settings', label: 'Pengaturan', icon: 'settings' };

export function renderSidebar() {
  const sidebarNav = document.getElementById('sidebar-nav');
  const sidebarFooter = document.getElementById('sidebar-footer');
  
  if (!sidebarNav || !sidebarFooter) return;

  sidebarNav.innerHTML = menuItems.map(item => `
    <a href="#${item.id}" id="nav-desktop-${item.id}" class="nav-item flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 rounded-lg transition-colors font-medium">
      <span class="material-symbols-outlined text-[20px]">${item.icon}</span>
      ${item.label}
    </a>
  `).join('');

  sidebarFooter.innerHTML = `
    <a href="#${settingsItem.id}" id="nav-desktop-${settingsItem.id}" class="nav-item flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 rounded-lg transition-colors font-medium">
      <span class="material-symbols-outlined text-[20px]">${settingsItem.icon}</span>
      ${settingsItem.label}
    </a>
  `;
}

export function renderBottomNav() {
  const bottomNav = document.getElementById('bottom-nav');
  if (!bottomNav) return;

  const allItems = [...menuItems, settingsItem];
  
  bottomNav.innerHTML = allItems.map(item => `
    <a href="#${item.id}" id="nav-mobile-${item.id}" class="nav-item flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
      <span class="material-symbols-outlined text-[24px] mb-1">${item.icon}</span>
      <span class="text-[10px] font-bold">${item.label}</span>
    </a>
  `).join('');
}

export function updateActiveNav(pageId) {
  // Update desktop nav
  document.querySelectorAll('#sidebar-nav .nav-item, #sidebar-footer .nav-item').forEach(el => {
    el.className = 'nav-item flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 rounded-lg transition-colors font-medium';
  });
  
  const activeDesktop = document.getElementById(`nav-desktop-${pageId}`);
  if (activeDesktop) {
    activeDesktop.className = 'nav-item flex items-center gap-3 px-4 py-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 rounded-lg font-bold shadow-sm border border-indigo-100/50 dark:border-indigo-500/20';
  }

  // Update mobile nav
  document.querySelectorAll('#bottom-nav .nav-item').forEach(el => {
    el.className = 'nav-item flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors';
  });
  
  const activeMobile = document.getElementById(`nav-mobile-${pageId}`);
  if (activeMobile) {
    activeMobile.className = 'nav-item flex flex-col items-center justify-center w-full h-full text-indigo-600 dark:text-indigo-400 transition-colors';
  }
}
