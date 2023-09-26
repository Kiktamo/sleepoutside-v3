import { getLocalStorage } from './utils.mjs';

// Function to update the cart count
 export default function updateCartCount() {
  const count = getLocalStorage('so-cart').length;
  const cartCountElement = document.querySelector('.cart-count');
  // Check if the count is greater than zero
  if (count > 0) {
    cartCountElement.textContent = count;
    cartCountElement.classList.remove('hidden'); // Show the cart count
  } else {
    cartCountElement.classList.add('hidden'); // Hide the cart count
  }
}