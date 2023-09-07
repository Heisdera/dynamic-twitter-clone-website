import get from './getElement.js';

const toggleBtn = get('.btn-dark');
const theme = get(':root');
const icon = document.querySelector('.btn-dark i');
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
  theme.classList.add('dark-mode-theme');
  localStorage.setItem('dark-mode', 'enabled');
};

const disableDarkMode = () => {
  theme.classList.remove('dark-mode-theme');
  localStorage.setItem('dark-mode', 'disabled');
};

const switchMode = () => {
  if (darkMode === 'enabled') {
    enableDarkMode(); // to check if darkMode is enabled on load
  }

  toggleBtn.addEventListener('click', () => {
    darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'disabled') {
      enableDarkMode(); // enable when darkMode is 'disabled'
      icon.setAttribute('class', 'far fa-sun');
    } else {
      disableDarkMode(); // disable when darkMode is 'enabled'
      icon.setAttribute('class', 'fas fa-moon');
    }
  });
};

export { switchMode };
