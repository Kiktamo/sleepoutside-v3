import { qs } from './utils.mjs';
import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default async function productList(selector, category) {
  const product_list = qs(selector);
  const products = await getData(category);

  const topProductIds = await getData('top-products');
  const topProducts = await filterProducts(products, topProductIds); // Filter the products

  // render out the top product list to the element
  renderListWithTemplate(productCardTemplate, product_list, topProducts);
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`
}

async function filterProducts(products, topProductIds) {
  return products.filter(product => topProductIds.includes(product.Id));
}