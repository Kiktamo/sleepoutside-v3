import { getLocalStorage } from './utils.mjs';
import updateCartCount from './updateCartCount.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  // check that cartItems is a non-empty array
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');

    //Remove hidden status on footer
    document
      .querySelector('.cart-footer-hidden')
      .setAttribute('class', 'cart-footer');

    // Add subtotal
    let subtotal = 0;
    cartItems.forEach((element) => {
      subtotal += element.FinalPrice;
    });

    document
      .querySelector('.cart-footer')
      .insertAdjacentHTML(
        'afterBegin',
        `<p class="cart-total">Total: ${subtotal}</p></span>`
      );
  } else {
    // Handle the case when the cart is empty
    document.querySelector('.product-list').innerHTML = 'Your cart is empty.';
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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

renderCartContents();
updateCartCount();
