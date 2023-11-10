import { getParam, loadHeaderFooter } from './utils.mjs';

const message = getParam('message');
document.getElementById('message').textContent = message;
loadHeaderFooter();
