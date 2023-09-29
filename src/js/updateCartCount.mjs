import { getLocalStorage } from './utils.mjs';

export default function updateCartCount() {
  const cartElement = document.querySelector('.cart');
  const cartItems = getLocalStorage('so-cart');
  const count = cartItems ? cartItems.length : 0;

  // Find the existing cart count element or create a new one
  let cartCountElement =
    cartElement.querySelector('.cart-count') || document.createElement('span');
  cartCountElement.classList.add('cart-count');
  cartCountElement.textContent = count.toString();

  // Add or remove the cart count element based on the count value
  if (count > 0) {
    cartElement.appendChild(cartCountElement);
  } else {
    cartCountElement.remove();
  }
}
