import { setLocalStorage } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';
import { findProductById } from './productData.mjs';

function addProductToCart(product) {
// get the existing cart
const existingCart = getLocalStorage('so-cart');
// make sure it is an array
const cartArray = Array.isArray(existingCart) ? existingCart : [];
// add the new product to the cart
cartArray.push(product);
// store it
setLocalStorage('so-cart', cartArray);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
