import { getParam } from './utils.mjs';
import productDetails from './productDetails.mjs';
import updateCartCount from './updateCartCount.mjs';

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

const productId = getParam('product');
productDetails(productId);
updateCartCount();

