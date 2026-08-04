import Chart from 'chart.js/auto';
/**
 * Halaman Dashboard
 * Menampilkan ringkasan sistem, metrik penjualan/pembelian, dan grafik
 */
import { getAllData } from '../db/indexeddb.js';

export async function renderDashboard(container) {
  container.innerHTML = `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- Metric Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <p class="text-xs font-bold text-slate-400 capitalize tracking-wider mb-1">Total Penjualan</p>
          <p class="text-2xl font-black text-slate-800 dark:text-slate-100" id="total-penjualan">Rp 0</p>
          <p class="text-xs text-slate-400 font-bold mt-2 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">remove</span> Belum ada data
          </p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <p class="text-xs font-bold text-slate-400 capitalize tracking-wider mb-1">Total Pembelian</p>
          <p class="text-2xl font-black text-slate-800 dark:text-slate-100" id="total-pembelian">Rp 0</p>
          <p class="text-xs text-slate-400 font-bold mt-2 flex items-center gap-1">
             <span class="material-symbols-outlined text-[14px]">remove</span> Belum ada data
          </p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <p class="text-xs font-bold text-slate-400 capitalize tracking-wider mb-1">Laba Kotor</p>
          <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400" id="laba-kotor">Rp 0</p>
          <p class="text-xs text-slate-400 font-bold mt-2 flex items-center gap-1">
             <span class="material-symbols-outlined text-[14px]">remove</span> Belum ada data
          </p>
        </div>
        <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-900 dark:to-indigo-950 p-5 rounded-2xl border border-indigo-500 dark:border-indigo-800 shadow-sm flex flex-col justify-between text-white">
          <p class="text-xs font-bold text-indigo-200 capitalize tracking-wider mb-1">Sisa Stok Produk</p>
          <div class="mt-1">
            <p class="text-2xl font-black" id="sisa-stok-unit">0</p>
            <p class="text-sm font-medium text-indigo-100 mt-0.5" id="sisa-stok-value">Rp 0</p>
          </div>
          <p class="text-xs text-indigo-200 font-bold mt-2 flex items-center gap-1">
             <span class="material-symbols-outlined text-[14px]">info</span> Estimasi total aset
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Chart Container -->
        <div class="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 md:p-6 flex flex-col min-h-[300px]">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-slate-800 dark:text-slate-100">Grafik Penjualan vs Pembelian</h3>
          </div>
          
          <div class="flex-1 relative w-full h-[300px]">
             <canvas id="salesPurchaseChart"></canvas>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 md:p-6 overflow-hidden flex flex-col">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-slate-800 dark:text-slate-100">Transaksi Terakhir</h3>
          </div>
          <div class="space-y-4 flex-1 overflow-y-auto pr-2 flex items-center justify-center">
            <p class="text-sm font-medium text-slate-400">Belum ada transaksi</p>
          </div>
          <button class="mt-4 w-full py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold text-[10px] rounded-lg border border-slate-100 dark:border-slate-700 transition-colors capitalize tracking-wider opacity-50 cursor-not-allowed">
            Lihat Semua
          </button>
        </div>
      </div>
      
      <!-- Action Bar Desktop -->
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

  await loadDashboardData();
}

let dashboardChart = null;

async function loadDashboardData() {
  try {
    const sales = await getAllData('sales');
    const purchases = await getAllData('purchase');

    // Aggregate monthly data
    const monthlySales = new Array(12).fill(0);
    const monthlyPurchases = new Array(12).fill(0);

    let totalSales = 0;
    let totalPurchases = 0;

    const products = {};

    sales.forEach(sale => {
      if (sale.date) {
        const date = new Date(sale.date);
        const month = date.getMonth(); // 0-11
        const amount = Number(sale.total) || 0;
        monthlySales[month] += amount;
        totalSales += amount;
      }
      
      const productName = sale.product?.trim().toLowerCase();
      if (productName) {
         if (!products[productName]) products[productName] = { purchaseQty: 0, salesQty: 0, latestPrice: 0 };
         products[productName].salesQty += (Number(sale.qty) || 0);
      }
    });

    // Sort purchases by date ascending so we can capture the latest price correctly
    const sortedPurchases = [...purchases].sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedPurchases.forEach(purchase => {
      if (purchase.date) {
        const date = new Date(purchase.date);
        const month = date.getMonth(); // 0-11
        const amount = Number(purchase.total) || 0;
        monthlyPurchases[month] += amount;
        totalPurchases += amount;
      }
      
      const productName = purchase.product?.trim().toLowerCase();
      if (productName) {
         if (!products[productName]) products[productName] = { purchaseQty: 0, salesQty: 0, latestPrice: 0 };
         products[productName].purchaseQty += (Number(purchase.qty) || 0);
         // Update latest price
         if (purchase.price) {
             products[productName].latestPrice = Number(purchase.price);
         }
      }
    });
    
    let totalStokUnit = 0;
    let totalStokValue = 0;
    
    for (const key in products) {
       const product = products[key];
       const remainingQty = product.purchaseQty - product.salesQty;
       if (remainingQty > 0) {
           totalStokUnit += remainingQty;
           totalStokValue += remainingQty * product.latestPrice;
       }
    }

    // Update Metric Cards
    const formatCurrency = (num) => 'Rp ' + num.toLocaleString('id-ID');
    document.getElementById('total-penjualan').textContent = formatCurrency(totalSales);
    document.getElementById('total-pembelian').textContent = formatCurrency(totalPurchases);
    document.getElementById('laba-kotor').textContent = formatCurrency(totalSales - totalPurchases);
    document.getElementById('sisa-stok-unit').textContent = `${totalStokUnit}`;
    document.getElementById('sisa-stok-value').textContent = formatCurrency(totalStokValue);

    renderChart(monthlySales, monthlyPurchases);
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
  }
}

function renderChart(monthlySales, monthlyPurchases) {
  const ctx = document.getElementById('salesPurchaseChart');
  if (!ctx) return;

  if (dashboardChart) {
    dashboardChart.destroy();
  }

  const isDarkMode = document.documentElement.classList.contains('dark');
  const textColor = isDarkMode ? '#cbd5e1' : '#64748b';
  const gridColor = isDarkMode ? '#1e293b' : '#f1f5f9';

  dashboardChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      datasets: [
        {
          label: 'Penjualan',
          data: monthlySales,
          backgroundColor: '#4f46e5',
          borderRadius: 4,
        },
        {
          label: 'Pembelian',
          data: monthlyPurchases,
          backgroundColor: '#94a3b8',
          borderRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: textColor,
            font: {
              family: "'Inter', sans-serif",
              size: 12
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: textColor
          }
        },
        y: {
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor,
            callback: function(value) {
              if (value >= 1000000) return (value / 1000000) + 'M';
              if (value >= 1000) return (value / 1000) + 'k';
              return value;
            }
          }
        }
      }
    }
  });
}
