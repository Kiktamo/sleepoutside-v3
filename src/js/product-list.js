import productList from './productList.mjs';
import loadAlerts from './alerts.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

const category = getParam('category');
loadHeaderFooter();
// loadAlerts();
productList('.product-list', category);

const productType = document.getElementById('productType');

productType.innerHTML = ': ' + category;

// Add an event listener to the "apply-sort" button
document.getElementById('apply-sort').addEventListener('click', () => {
  const selectedSortOption = document.getElementById('sort-select').value;
  let sortKey = '';
  let sortOrder = '';

  if (selectedSortOption) {
    const [key, order] = selectedSortOption.split('_');

    // Map the sort keys to the actual data keys
    switch (key) {
      case 'name':
        sortKey = 'NameWithoutBrand';
        break;
      case 'brand':
        sortKey = 'Name';
        break;
      case 'price':
        sortKey = 'FinalPrice';
        break;
    }

    sortOrder = order;
  }

  productList('.product-list', category, sortKey, sortOrder);
});
