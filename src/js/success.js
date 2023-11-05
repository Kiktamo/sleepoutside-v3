import { getParam, loadHeaderFooter } from './utils.mjs';

const orderId = getParam('order');
document.getElementById('order-id').textContent = orderId;
loadHeaderFooter();
