import { qs } from './utils.mjs';
import { getAllProducts } from './externalServices.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default async function recommendProducts(selector, currentId) {
  const product_list = qs(selector);
  const allProducts = await getAllProducts();

  // Remove current product from list
  const filteredProducts = allProducts.filter(
    (product) => product.Id !== currentId
  );

  // Shuffle the products to get a random selection
  const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());

  // Select the first three products
  const selectedProducts = shuffledProducts.slice(0, 3);

  renderListWithTemplate(productCardTemplate, product_list, selectedProducts);
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
