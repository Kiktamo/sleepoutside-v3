import { loadHeaderFooter, getParam } from './utils.mjs';
import { checkLogin } from './auth.mjs';
import currentOrders from './currentOrders.mjs';

const token = await checkLogin();
const page = getParam('page');
loadHeaderFooter();

if (page) {
  currentOrders('.orders-list', token, page);
} else currentOrders('.orders-list', token, 1);
