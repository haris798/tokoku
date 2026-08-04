# Toko.ku

Toko.ku adalah aplikasi pencatatan sederhana yang dirancang untuk membantu mengelola penjualan, pembelian, dan persediaan stok barang. Aplikasi ini memiliki antarmuka pengguna yang bersih dan modern menggunakan desain responsif dengan Tailwind CSS.

## Fitur Utama

- **Dashboard Lengkap:** Ringkasan total penjualan, pembelian, laba kotor, dan estimasi sisa stok (berdasarkan harga beli terakhir). Dilengkapi dengan grafik penjualan vs. pembelian (menggunakan Chart.js).
- **Manajemen Penjualan:** Pencatatan transaksi penjualan secara rinci (tanggal, pelanggan, produk, kuantitas, harga satuan, dan total).
- **Manajemen Pembelian:** Pencatatan transaksi pembelian stok barang, lengkap dengan tanggal, supplier, kuantitas, harga satuan, dan biaya ongkir.
- **Penyimpanan Lokal (Offline-first):** Menggunakan basis data lokal (IndexedDB) sehingga aplikasi tetap dapat berjalan secara cepat meskipun tanpa koneksi internet.
- **Tampilan Gelap & Terang (Dark/Light Mode):** Mendukung pengaturan tema tampilan yang bisa disesuaikan dengan preferensi pengguna.

## Teknologi

- Vanilla JavaScript (ES Modules)
- Vite (Build Tool)
- Tailwind CSS v4 (Styling)
- Chart.js (Data Visualization)
- IndexedDB (Data Storage via `idb` package)
- Mendukung integrasi Capacitor untuk platform Android

## Skrip

- `npm run dev`: Menjalankan server pengembangan di mode lokal.
- `npm run build`: Membangun aplikasi ke dalam versi rilis (`dist/`).
- `npm run preview`: Melihat pratinjau rilis hasil *build*.

## Hak Cipta & Lisensi

Aplikasi dikembangkan secara privat.
