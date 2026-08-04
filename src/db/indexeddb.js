/**
 * Modul IndexedDB
 * Mengatur koneksi dan operasi database lokal menggunakan idb
 */
import { openDB } from 'idb';

let dbPromise;

/**
 * Inisialisasi database lokal (toko-ku-db)
 */
export async function initDB() {
  dbPromise = openDB('toko-ku-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('sales')) {
        const salesOS = db.createObjectStore('sales', { keyPath: 'id' });
        salesOS.createIndex('date', 'date');
        salesOS.createIndex('updated_at', 'updated_at');
      }
      if (!db.objectStoreNames.contains('purchase')) {
        const purchaseOS = db.createObjectStore('purchase', { keyPath: 'id' });
        purchaseOS.createIndex('date', 'date');
        purchaseOS.createIndex('updated_at', 'updated_at');
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings');
      }
    },
  });
  return dbPromise;
}

export async function getDB() {
  if (!dbPromise) await initDB();
  return dbPromise;
}

export async function getAllData(storeName) {
  const db = await getDB();
  return db.getAll(storeName);
}

export async function addData(storeName, data) {
  const db = await getDB();
  return db.put(storeName, data);
}

export async function deleteData(storeName, id) {
  const db = await getDB();
  return db.delete(storeName, id);
}
