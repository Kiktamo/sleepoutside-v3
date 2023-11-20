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
    subtotal += element.FinalPrice * element.quantity;
  });

  subtotal = subtotal.toFixed(2);

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
  const cartFooter = document.querySelector('.cart-footer');
  const count = cartItems.length;

  if (count > 0) {
    cartFooter.setAttribute('class', 'cart-footer');
  }
  if (count <= 0) {
    cartFooter.setAttribute('class', 'cart-footer hidden');
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

function modifyQuantityInCart(productId, action) {
  const cartItems = getLocalStorage('so-cart');
  const existingItem = cartItems.find((item) => item.Id === productId);

  if (action === 'increase') {
    existingItem.quantity++;
  } else if (action === 'decrease') {
    existingItem.quantity--;
  }

  if (existingItem.quantity <= 0) {
    removeProductFromCart(productId);
  } else {
    setLocalStorage('so-cart', cartItems);
    updateCartCount(true);
  }
}

function setupQuantityButtonListeners(buttons, increase = true) {
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.currentTarget.getAttribute('data-id');
      const action = increase ? 'increase' : 'decrease';
      modifyQuantityInCart(productId, action);
      ShoppingCart();
    });
  });
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

  const increaseButtons = document.querySelectorAll('.increase-quantity');
  const decreaseButtons = document.querySelectorAll('.decrease-quantity');

  setupQuantityButtonListeners(increaseButtons, true); // For increase buttons
  setupQuantityButtonListeners(decreaseButtons, false); // For decrease buttons
}

function cartItemTemplate(product) {
  const baseTemplate = `<li class="cart-card divider">
    <a href="../product_pages/index.html?product=${product.Id}" class="cart-card__image">
      <img
        src="${product.Images.PrimaryMedium}"
        srcset="${product.Images.PrimarySmall} 80w, ${product.Images.PrimaryMedium} 160w, ${product.Images.PrimaryLarge} 320w, ${product.Images.PrimaryExtraLarge} 600w"
        sizes="(max-width: 400px) 80px,
        (max-width: 600px) 160px,
        (max-width: 2000px) 320px,
        600px"
        alt="${product.Name}"
      />
    </a>
    <a href="../product_pages/index.html?product=${product.Id}">
      <h2 class="card__name">${product.Name}</h2>
    </a>
    <p class="cart-card__color">${product.Colors[0].ColorName}</p>
    <i class="fa-solid fa-trash-can remove-product" data-id="${product.Id}"></i>
    <p class="cart-card__quantity">qty: <span data-id="${product.Id}" class="decrease-quantity">-</span> ${product.quantity} <span data-id="${product.Id}" class="increase-quantity">+</span></p>
    <p class="cart-card__price">$${product.FinalPrice}`;

  if (product.FinalPrice < product.ListPrice) {
    const discount =
      ((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100;
    return `${baseTemplate}
      <span class='list-price'><i><s>$${(
        product.ListPrice * product.quantity
      ).toFixed(2)}</i></s></span>
      <span class='discount-small'><b>${discount.toFixed(0)}% off</b></span>
    </p>
  </li>`;
  }

  return `${baseTemplate}</p></li>`;
}
