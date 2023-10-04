import {
  qs
} from './utils.mjs';
import {
  getData
} from './productData.mjs';


export default async function productList(selector, category) {
  const product_list = qs(selector);
  const products = await getData(category);
  console.log(products)
  const topProductIds = await getData("top-products");
  const topProducts = [];
  renderList(products, product_list);
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

function renderList(list, el) {
  const htmlStrings = list.map(productCardTemplate);
  el.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
}

async function filterProducts(product, topProducts) {
  found = false;
  topProducts.array.forEach(element => {
    if (product.Id === element) {
      found = true;
    }
  });
  return;
}
