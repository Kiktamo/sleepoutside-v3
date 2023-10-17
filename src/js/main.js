import productList from './productList.mjs';
import loadAlerts from './alerts.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();
loadAlerts();
productList('.product-list', 'tents');
