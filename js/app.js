// const toggleBtn = document.querySelector('.btn-dark');
// const theme = document.querySelector(':root');
// let darkMode = localStorage.getItem('dark-mode');

// const enableDarkMode = () => {
//   theme.classList.add('dark-mode-theme');
//   localStorage.setItem('dark-mode', 'enabled');
// };

// const disableDarkMode = () => {
//   theme.classList.remove('dark-mode-theme');
//   localStorage.setItem('dark-mode', 'disabled');
// };

// if (darkMode === 'enabled') {
//   enableDarkMode();
// }

// toggleBtn.addEventListener('click', function (e) {
//   darkMode = localStorage.getItem('dark-mode');
//   if (darkMode === 'disabled') {
//     enableDarkMode();
//   } else {
//     disableDarkMode();
//   }
// });

// function getElement(selection) {
//   const element = document.querySelector(selection);
//   if (element) {
//     return element;
//   }
//   throw new Error(
//     `Please check "${selection}" selector, no such element exist`
//   );
// }

// class Reaction {
//   constructor(element) {
//     this.container = element;

//     // selecting the icons
//     this.list = [...element.querySelectorAll('.icon')];
//   }
// }
