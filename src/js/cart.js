import {
  setLocalStorage,
  getLocalStorage
} from './utils.mjs';
import updateCartCount from './updateCartCount.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  // check that cartItems is a non-empty array
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    updateCartFooter(cartItems);
    renderCartSubtotal(cartItems);

  } else {
    // Handle the case when the cart is empty
    updateCartFooter(cartItems);
    document.querySelector('.product-list').innerHTML = 'Your cart is empty.';
  }

  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const itemIdToRemove = event.currentTarget.getAttribute('data-id');
      removeItemFromCart(itemIdToRemove);
      renderCartContents(); // Re-render the cart after removal
    });
  });
}

function renderCartSubtotal(cartItems) {

  // Add subtotal
  let subtotal = 0;

  cartItems.forEach((element) => {
    subtotal += element.FinalPrice;
  });

  const cartTotal = document.querySelector('.cart-total')

  if (cartTotal) {
    cartTotal.innerHTML = `Total: ${subtotal}`
  } else {
    document
      .querySelector('.cart-footer')
      .insertAdjacentHTML(
        'afterBegin',
        `<p class="cart-total">Total: ${subtotal}</p></span>`
      );
  }
}

function updateCartFooter(cartItems) {
  const hidden = document.querySelector('.cart-footer-hidden')
  const count = cartItems.length

  if (count > 0 && hidden) {
    hidden.setAttribute('class', 'cart-footer');
  } if (count <= 0 && !hidden) {
    document
    .querySelector('.cart-footer')
    .setAttribute('class', 'cart-footer-hidden');
  }

}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="remove-item" data-id="${item.Id}">remove</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeItemFromCart(itemIdToRemove) {
  const cartItems = getLocalStorage('so-cart');
  const updatedCart = cartItems.filter((item) => item.Id !== itemIdToRemove);
  setLocalStorage('so-cart', updatedCart);
  updateCartCount();
}

renderCartContents();
updateCartCount();
