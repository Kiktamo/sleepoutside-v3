import { getParam } from './utils.mjs';
import productDetails from './productDetails.mjs';
import updateCartCount from './updateCartCount.mjs';

const productId = getParam('product');
productDetails(productId);
updateCartCount();
