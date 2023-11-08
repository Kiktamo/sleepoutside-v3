import { loadHeaderFooter, getParam } from './utils.mjs';
import currentOrders from './currentOrders.mjs';

const page = Number(getParam('page'));
loadHeaderFooter();

if (page) {
  currentOrders('.orders-list', page);
} else currentOrders('.orders-list', 1);
