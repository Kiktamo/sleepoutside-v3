import { qs } from './utils.mjs';
import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default async function productList(
  selector,
  category,
  sortKey,
  sortOrder = 'asc'
) {
  const product_list = qs(selector);
  const products = await getData(category);

  // Sort the products based on the provided key and order
  sortProducts(products, sortKey, sortOrder);

  // Render the sorted product list
  renderListWithTemplate(productCardTemplate, product_list, products);
}

function productCardTemplate(product) {
  if (product.FinalPrice < product.ListPrice) {
    const discount =
      ((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100;
    return `<li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}
      <span class='list-price'><i><s>$${product.ListPrice}</i></s></span>
      <div class='discount-small'><b>${discount.toFixed(0)}% off</b>
      </div></p>
      </a>
    </li>`;
  } else {
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
  }
}

// async function filterProducts(products, topProductIds) {
//   return products.filter((product) => topProductIds.includes(product.Id));
// }

// Modify your sortProducts function
function sortProducts(products, key, order) {
  products.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    if (order === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}
