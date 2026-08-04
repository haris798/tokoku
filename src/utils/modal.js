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
