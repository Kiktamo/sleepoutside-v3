import {
  setLocalStorage,
  getLocalStorage,
  loadHeaderFooter,
} from './utils.mjs';
import { findProductById } from './productData.mjs';
import updateCartCount from './updateCartCount.mjs';

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
  productImage.src = product.Image;
  productImage.alt = product.Name;

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
  // add the new product to the cart
  cartArray.push(product);
  // store it
  setLocalStorage('so-cart', cartArray);
  updateCartCount();
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}
