import productSearch from './productSearch.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

const searchQuery = getParam('q');
loadHeaderFooter();
productSearch('.product-list', searchQuery);

const productQuery = document.getElementById('searchQuery');

productQuery.innerHTML = ': ' + searchQuery;
