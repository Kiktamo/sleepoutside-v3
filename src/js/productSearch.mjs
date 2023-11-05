import { qs } from './utils.mjs';
import { getAllProducts } from './externalServices.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default async function productSearch(selector, query) {
  const product_list = qs(selector);
  //   const products = await getProductsByCategory(category);
  const products = await buildProductList(query);

  // Sort the products based on the provided key and order
  //   sortProducts(products, sortKey, sortOrder);

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

async function buildProductList(query) {
  const allProducts = getAllProducts();

  // Use the filter method to filter products based on the query
  const filteredProducts = allProducts.filter((product) => {
    // Convert the product name and query to lowercase for a case-insensitive search
    const productName = product.Name.toLowerCase();
    const lowercaseQuery = query.toLowerCase();

    // Check if the product name contains the query
    return productName.includes(lowercaseQuery);
  });
  // You can do further processing or rendering with the combined product list
  return filteredProducts;
}
