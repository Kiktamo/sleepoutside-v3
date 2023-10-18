import productList from './productList.mjs';
import loadAlerts from './alerts.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

const category = getParam('category');
loadHeaderFooter();
loadAlerts();
productList('.product-list', category);

const productType = document.getElementById('productType');

productType.innerHTML = ': ' + category;
