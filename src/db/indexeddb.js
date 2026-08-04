import { openDB } from 'idb';

let dbPromise;

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
