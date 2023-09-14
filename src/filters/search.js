import { getElement as getCustomElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
  const form = getCustomElement('.input-form');
  const nameInput = getCustomElement('.search-input');
  form.addEventListener('keyup', function () {
    const value = nameInput.value;
    if (value) {
      const newStore = store.filter((product) => {
        let { name } = product;
        name = name.toLowerCase();
        if (name.startsWith(value)) {
          return product;
        }
      });
      display(newStore, getCustomElement('.products-container'), true);
      if (newStore.length < 1) {
        const products = getCustomElement('.products-container');
        products.innerHTML = `<h3 class="filter-error">
       sorry, no products matched your search
       </h3>`;
      }
    } else {
      display(store, getCustomElement('.products-container'), true);
    }
  });
};

export default setupSearch;
