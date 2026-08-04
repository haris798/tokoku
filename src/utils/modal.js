/**
 * Modul Modal
 * Menangani tampilan pop-up modal
 */
export function showModal(html, onInit) {
  const container = document.getElementById('modal-container');
  container.innerHTML = html;
  container.classList.remove('hidden');
  container.classList.add('flex');
  
  const closeBtn = container.querySelector('[data-close-modal]');
  if (closeBtn) {
    closeBtn.addEventListener('click', hideModal);
  }

  const modalContent = container.querySelector('.modal-content');
  if (modalContent) {
    modalContent.addEventListener('click', (e) => e.stopPropagation());
  }

  const handleOutsideClick = (e) => {
    if (e.target === container) {
      hideModal();
      container.removeEventListener('click', handleOutsideClick);
    }
  };
  container.addEventListener('click', handleOutsideClick);

  if (onInit) {
    onInit(container);
  }
}

export function hideModal() {
  const container = document.getElementById('modal-container');
  container.classList.add('hidden');
  container.classList.remove('flex');
  container.innerHTML = '';
}

export function confirmModal(title, message, onConfirm) {
  const modalHtml = `
    <div class="modal-content w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-800">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <span class="material-symbols-outlined">warning</span>
          </div>
          <h3 class="font-bold text-lg text-slate-800 dark:text-slate-100">${title}</h3>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 pl-13">${message}</p>
      </div>
      <div class="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
        <button type="button" data-close-modal class="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors">
          Batal
        </button>
        <button type="button" id="btn-confirm-action" class="px-4 py-2 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors">
          Hapus
        </button>
      </div>
    </div>
  `;
  
  showModal(modalHtml, (container) => {
    document.getElementById('btn-confirm-action').addEventListener('click', () => {
      if (onConfirm) onConfirm();
      hideModal();
    });
  });
}

