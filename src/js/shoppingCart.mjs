import {
  setLocalStorage,
  getLocalStorage,
  renderListWithTemplate,
} from './utils.mjs';
import updateCartCount from './updateCartCount.mjs';

function renderCartSubtotal(cartItems) {
  // Add subtotal
  let subtotal = 0;

  cartItems.forEach((element) => {
    subtotal += element.FinalPrice;
  });

  const cartTotal = document.querySelector('.cart-total');

  if (cartTotal) {
    cartTotal.innerHTML = `Total: ${subtotal}`;
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
  const hidden = document.querySelector('.cart-footer-hidden');
  const count = cartItems.length;

  if (count > 0 && hidden) {
    hidden.setAttribute('class', 'cart-footer');
  }
  if (count <= 0 && !hidden) {
    document
      .querySelector('.cart-footer')
      .setAttribute('class', 'cart-footer-hidden');
  }
}

function removeProductFromCart(productIdToRemove) {
  const cartItems = getLocalStorage('so-cart');
  const updatedCart = cartItems.filter(
    (product) => product.Id !== productIdToRemove
  );
  setLocalStorage('so-cart', updatedCart);
  updateCartCount();
}

export default function ShoppingCart() {
  const cartItems = getLocalStorage('so-cart');
  const outputEl = document.querySelector('.product-list');

  updateCartFooter(cartItems);

  // check that cartItems is a non-empty array
  if (cartItems && cartItems.length > 0) {
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
    renderCartSubtotal(cartItems);
  } else {
    // Handle the case when the cart is empty
    document.querySelector('.product-list').innerHTML = 'Your cart is empty.';
  }

  const removeButtons = document.querySelectorAll('.remove-product');
  removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productIdToRemove = event.currentTarget.getAttribute('data-id');
      removeProductFromCart(productIdToRemove);
      ShoppingCart(); // Re-render the cart after removal
    });
  });
}

function cartItemTemplate(product) {
  const baseTemplate = `<li class="cart-card divider">
    <span class="remove-product" data-id="${product.Id}">remove</span>
    <a href="#" class="cart-card__image">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${product.Name}</h2>
    </a>
    <p class="cart-card__color">${product.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${product.FinalPrice}`;

  if (product.FinalPrice < product.ListPrice) {
    const discount =
      ((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100;
    return `${baseTemplate}
      <span class='list-price'><i><s>$${product.ListPrice}</i></s></span>
      <span class='discount-small'><b>${discount.toFixed(0)}% off</b></span>
    </p>
  </li>`;
  }

  return `${baseTemplate}</p></li>`;
}
