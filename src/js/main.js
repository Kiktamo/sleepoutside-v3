import productList from './productList.mjs';
import loadAlerts from './alerts.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();
loadAlerts();
productList('.product-list', 'tents');
const search = () => {
  // Get the search query from the input field and convert it to lowercase
  const searchProduct = document.querySelector('#searchInput').value.toLowerCase();

  // Get references to the product list container and product cards
  const itemList = document.querySelector('#product-list');
  const productCard = document.querySelectorAll('.product-card');

  // Get a list of product names within the product list
  const productName = itemList.getElementsByTagName('h2');

  // Loop through each product name to check for a match
  for (let e = 0; e < productName.length; e++) {
    // Get the specific product name within the current product card
    let match = productCard[e].getElementsByTagName('h2')[0];

    // Check if a product name match was found in the current product card
    if (match) {
      // Get the text content (or inner HTML) of the product name
      let textValue = match.textContent || match.innerHTML;

      // Check if the search query exists within the product name
      if (textValue.toLowerCase().indexOf(searchProduct) > -1) {
        // If there's a match, display the product card
        productCard[e].style.display = '';
      } else {
        // If there's no match, hide the product card
        productCard[e].style.display = 'none';
      }
    }
  }
};

// Call the search function when the input field content changes
document.querySelector('#searchInput').addEventListener('input', search);
