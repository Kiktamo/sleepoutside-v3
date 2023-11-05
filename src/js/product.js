import { getParam, loadHeaderFooter } from './utils.mjs';
import productDetails from './productDetails.mjs';
import recommendProducts from './recommendProduct.mjs';

const productId = getParam('product');
productDetails(productId);
recommendProducts('.recommended-list', productId);
loadHeaderFooter();
