import { getElement as getCustomElement } from './utils.js';

const toggleNav = getCustomElement('.toggle-nav');
const sidebarOverlay = getCustomElement('.sidebar-overlay');
const closeBtn = getCustomElement('.sidebar-close');

toggleNav.addEventListener('click', () => {
  sidebarOverlay.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarOverlay.classList.remove('show');
});
