import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { findProductById } from './externalServices.mjs';
import updateCartCount from './updateCartCount.mjs';
import { setupCarousel, updateCarousel } from './carousel.mjs';

// This variable will store the current product data
let currentProduct;

// This function will be the entry point into our module
export default async function productDetails(productId) {
  try {
    // Fetch product data by ID
    currentProduct = await findProductById(productId);

    // Render product details in the HTML
    renderProductDetails(currentProduct);
    // add listener to Add to Cart button
    document
      .getElementById('addToCart')
      .addEventListener('click', addToCartHandler);

    document
      .getElementById('increaseQuantity')
      .addEventListener('click', (event) => {
        modifyQuantity('increase');
      });
    document
      .getElementById('decreaseQuantity')
      .addEventListener('click', (event) => {
        modifyQuantity('decrease');
      });
  } catch (error) {
    // Product not found
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = 'Product not found.';
    errorMessageDiv.style.display = 'flex'; // Show the Error Message centered
  }
}

function renderProductDetails(product) {
  // Get references to the HTML elements
  const productName = document.getElementById('productName');
  const productNameWithoutBrand = document.getElementById(
    'productNameWithoutBrand'
  );
  const productImage = document.getElementById('productImage');
  const productFinalPrice = document.getElementById('productFinalPrice');
  const productColorName = document.getElementById('productColorName');
  const productDescriptionHtmlSimple = document.getElementById(
    'productDescriptionHtmlSimple'
  );
  const addToCartButton = document.getElementById('addToCart');

  // Populate the HTML elements with product data
  productName.textContent = product.Name;
  productNameWithoutBrand.textContent = product.NameWithoutBrand;
  productImage.src = product.Images.PrimaryLarge;
  productImage.setAttribute(
    'srcset',
    `${product.Images.PrimarySmall} 80w, ${product.Images.PrimaryMedium} 160w, ${product.Images.PrimaryLarge} 320w, ${product.Images.PrimaryExtraLarge} 600w`
  );
  productImage.setAttribute(
    'sizes',
    '(max-width: 400px) 80px, (max-width: 600px) 160px,(max-width: 1000px) 320px, 600px'
  );
  productImage.alt = product.Name;

  if (product.Images.ExtraImages) {
    const carousel = document.createElement('div');
    carousel.classList.add('image-carousel');

    // Create dots
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dots');

    for (let i = 0; i < product.Images.ExtraImages.length + 1; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.dataset.index = i;

      dotsContainer.appendChild(dot);
    }

    let carouselTemplate = `
      <button class="prev slide"><i class="fa-solid fa-arrow-left"></i></button>
      <button class="next slide"><i class="fa-solid fa-arrow-right"></i></button>
      <ul>
      <li><img src="${product.Images.PrimaryLarge}" 
      srcset="${product.Images.PrimarySmall} 80w, ${product.Images.PrimaryMedium} 160w, ${product.Images.PrimaryLarge} 320w, ${product.Images.PrimaryExtraLarge} 600w"
      sizes="(max-width: 400px) 80px, (max-width: 600px) 160px,(max-width: 1000px) 320px, 600px"
      alt="${product.Name}"></li>`;

    product.Images.ExtraImages.forEach((image) => {
      carouselTemplate += `<li><img src="${image.Src}" alt="${image.Title}"></li>`;
    });

    carouselTemplate += `</ul>
    </div>`;

    carousel.innerHTML = carouselTemplate;
    carousel.appendChild(dotsContainer);

    productImage.replaceWith(carousel);
    setupCarousel();
  }

  // Determine discount if there's a difference between the final price and list price.
  if (product.FinalPrice < product.ListPrice) {
    const discount =
      ((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100;
    productFinalPrice.innerHTML = `<div class='discount'><b>${discount.toFixed(
      0
    )}% off</b> deal</div>Price: $${product.FinalPrice}
    <div class='list-price'><i>List Price: <s>$${
      product.ListPrice
    }</i></s></div>`;
  } else {
    // Do the default if there's no discount
    productFinalPrice.textContent = `Price: $${product.FinalPrice}`;
  }

  productColorName.textContent = `Color: ${product.Colors[0].ColorName}`;
  productDescriptionHtmlSimple.innerHTML = product.DescriptionHtmlSimple;

  // Set the data-id attribute of the "Add to Cart" button with the product's ID
  addToCartButton.setAttribute('data-id', product.Id);
  addToCartButton.style.display = 'block'; // Show the Add button
}

function addProductToCart(product) {
  // get the existing cart
  const existingCart = getLocalStorage('so-cart');
  // make sure it is an array
  const cartArray = Array.isArray(existingCart) ? existingCart : [];

  // Check for existing item
  const existingItem = cartArray.find((item) => item.Id === product.Id);
  // Get quantity to add
  const quantity = parseInt(
    document.getElementById('quantityNumber').innerHTML
  );

  if (existingItem) {
    // Increase quantity if it already exists
    existingItem.quantity += quantity;
  } else {
    // add the new product to the cart
    product.quantity = quantity;
    cartArray.push(product);
  }
  // store it
  setLocalStorage('so-cart', cartArray);
  updateCartCount(true);
}

function modifyQuantity(action) {
  const quantity = document.getElementById('quantityNumber');
  var counter = parseInt(quantity.innerHTML);

  if (action === 'increase') {
    counter++;
  } else if (action === 'decrease') {
    counter--;
  }

  if (counter <= 0) {
    counter = 1;
  }
  quantity.innerHTML = counter;
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}
