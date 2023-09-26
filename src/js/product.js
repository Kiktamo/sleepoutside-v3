import { getParam } from './utils.mjs';
// import { productDetails } from './productDetails.mjs';
import productDetails from './productDetails.mjs';

const productId = getParam('product');
productDetails(productId);

// eslint-disable-next-line no-console
//console.log(findProductById(productId));
