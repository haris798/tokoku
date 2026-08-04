export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

function applyTheme(theme) {
  const themeIcon = document.getElementById('theme-icon');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    if (themeIcon) themeIcon.textContent = 'dark_mode';
  } else {
    document.documentElement.classList.remove('dark');
    if (themeIcon) themeIcon.textContent = 'light_mode';
  }
}
