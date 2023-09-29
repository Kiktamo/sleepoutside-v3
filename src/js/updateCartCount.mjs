import { getLocalStorage } from './utils.mjs';

// Function to update the cart count
export default function updateCartCount() {
  const cartElement = document.querySelector('.cart');
  const cartCountElement = cartElement.querySelector('.cart-count'); // Find the cart count element

  const cartItems = getLocalStorage('so-cart');
  const count = cartItems ? cartItems.length : 0; // Check if cartItems is not null

  if (count > 0) {
    const cartCountHTML = `<span class="cart-count">${count}</span>`;
    
    // Check if cartCountElement exists, and if it doesn't, insert the HTML
    if (!cartCountElement) {
      cartElement.insertAdjacentHTML('beforeend', cartCountHTML);
    }
  } else {
    // If count is 0 and cartCountElement exists, remove it
    if (cartCountElement) {
      cartCountElement.remove();
    }
  }
}