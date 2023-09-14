// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart as customAddToCart } from '../cart/setupCart.js';
import {
  singleProductUrl,
  getElement as getCustomElement,
  formatPrice as formatCustomPrice,
} from '../utils.js';

// selections
const loading = getCustomElement('.page-loading');
const centerDOM = getCustomElement('.single-product-center');
const pageTitleDOM = getCustomElement('.page-hero-title');
const imgDOM = getCustomElement('.single-product-img');
const titleDOM = getCustomElement('.single-product-title');
const companyDOM = getCustomElement('.single-product-company');
const priceDOM = getCustomElement('.single-product-price');
const colorsDOM = getCustomElement('.single-product-colors');
const descDOM = getCustomElement('.single-product-desc');
const cartBtn = getCustomElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  const urlID = window.location.search;

  try {
    const response = await fetch(`${singleProductUrl}${urlID}`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      // grab data
      const { id, fields } = product;
      productID = id;

      const { name, company, price, colors, description } = fields;
      const image = fields.image[0].thumbnails.large.url;
      // set values

      document.title = `${name.toUpperCase()} | Comfy`;
      pageTitleDOM.textContent = `Home / ${name}`;
      imgDOM.src = image;
      titleDOM.textContent = name;
      companyDOM.textContent = `by ${company}`;
      priceDOM.textContent = formatCustomPrice(price);
      descDOM.textContent = description;
      colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('product-color');
        span.style.backgroundColor = `${color}`;
        colorsDOM.appendChild(span);
      });
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `
    <div>
    <h3 class="error">sorry, something went wrong</h3>
    <a href="index.html" class="btn">back home</a>
    </div> 
     `;
    }
  } catch (error) {
    console.log(error);
  }

  loading.style.display = 'none';
});

cartBtn.addEventListener('click', function () {
  customAddToCart(productID);
});
