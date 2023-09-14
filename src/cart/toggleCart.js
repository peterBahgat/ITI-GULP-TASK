import { getElement as getCustomElement } from '../utils.js';

const cartOverlay = getCustomElement('.cart-overlay');
const closeCartBtn = getCustomElement('.cart-close');
const toggleCartBtn = getCustomElement('.toggle-cart');

toggleCartBtn.addEventListener('click', () => {
  cartOverlay.classList.add('show');
});
closeCartBtn.addEventListener('click', () => {
  cartOverlay.classList.remove('show');
});

export const openCart = () => {
  cartOverlay.classList.add('show');
};
