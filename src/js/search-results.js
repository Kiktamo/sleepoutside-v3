import productSearch from './productSearch.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

const searchQuery = getParam('search');
loadHeaderFooter();
productSearch('.product-list', searchQuery);

const productQuery = document.getElementById('productQuery');

productQuery.innerHTML = ': ' + searchQuery;
