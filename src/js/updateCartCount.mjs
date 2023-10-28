import { getLocalStorage } from './utils.mjs';

export default function updateCartCount(animate = false) {
  const cartElement = document.querySelector('.cart');
  const cartItems = getLocalStorage('so-cart');
  let count = 0;

  if (cartItems) {
    cartItems.forEach((item) => {
      count += item.quantity;
    });
  }

  // Find the existing cart count element or create a new one
  let cartCountEl =
    cartElement.querySelector('.cart-count') || document.createElement('span');
  cartCountEl.classList.add('cart-count');
  const cartIcon = cartElement.querySelector('svg');

  if (animate) {
    // Add a class to trigger the animation
    cartCountEl.style.animation = 'cartBounce 0.5s ease';

    // Remove the class after the animation completes
    cartCountEl.addEventListener('animationend', () => {
      cartCountEl.style.animation = '';
    });

    cartIcon.style.animation = 'cartShake 0.8s ease-in-out';

    cartIcon.addEventListener('animationend', () => {
      cartIcon.style.animation = '';
    });
  }

  cartCountEl.textContent = count.toString();

  // Add or remove the cart count element based on the count value
  if (count > 0) {
    cartElement.appendChild(cartCountEl);
  } else {
    cartCountEl.remove();
  }
}
