import { qs } from './utils.mjs';
import { getProductsByCategory, findProductById } from './externalServices.mjs';
import { renderListWithTemplate, renderWithTemplate } from './utils.mjs';
import { setupCarousel } from './carousel.mjs';

export default async function productList(
  selector,
  category,
  sortKey,
  sortOrder = 'asc'
) {
  const product_list = qs(selector);
  const products = await getProductsByCategory(category);

  // Sort the products based on the provided key and order
  sortProducts(products, sortKey, sortOrder);

  // Render the sorted product list
  renderListWithTemplate(productCardTemplate, product_list, products);

  const elQuicklookButtons = document.querySelectorAll('.quick-look');
  elQuicklookButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.currentTarget.getAttribute('data-id');
      toggleQuicklook(productId, true);
    });
  });
}

function productCardTemplate(product) {
  const baseTemplate = `<li class="product-card">
  <i data-id="${product.Id}" class="quick-look fas fa-eye"></i>
  <a href="../product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    srcset="${product.Images.PrimarySmall} 80w, ${product.Images.PrimaryMedium} 160w, ${product.Images.PrimaryLarge} 320w, ${product.Images.PrimaryExtraLarge} 600w"
    sizes="(max-width: 400px) 80px,
    (max-width: 600px) 160px,
    (max-width: 2000px) 320px,
    600px"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.NameWithoutBrand}</h2>
  <p class="product-card__price">$${product.FinalPrice}`;

  if (product.FinalPrice < product.ListPrice) {
    const discount =
      ((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100;
    return `${baseTemplate}
      <span class='list-price'><i><s>$${product.ListPrice}</i></s></span>
      <div class='discount-small'><b>${discount.toFixed(0)}% off</b>
      </div></p>
      </a>
    </li>`;
  } else {
    return `${baseTemplate}</p></a>
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

async function toggleQuicklook(productId, display) {
  const elQuicklookModal = document.querySelector('.product-modal');
  const elOverlay = document.querySelector('.overlay');

  if (display) {
    const product = await findProductById(productId);
    await renderWithTemplate(
      productQuicklookTemplate,
      elQuicklookModal,
      '',
      product
    );

    // Unhide the modal
    elQuicklookModal.setAttribute('class', 'product-modal');
    elOverlay.setAttribute('class', 'overlay');

    document
      .querySelector('.close-modal')
      .addEventListener('click', (event) => {
        toggleQuicklook(productId, false);
      });

    setupCarousel();
  } else {
    // Hide the modal
    elQuicklookModal.setAttribute('class', 'product-modal hidden');
    elOverlay.setAttribute('class', 'overlay hidden');
  }
}

function productQuicklookTemplate(product) {
  let imageTemplate = '';
  if (product.Images.ExtraImages) {
    imageTemplate = `
    <div class="image-carousel">
    <button class="prev slide"><i class="fa-solid fa-arrow-left"></i></button>
    <button class="next slide"><i class="fa-solid fa-arrow-right"></i></button>
      <ul>
      <li><img src="${product.Images.PrimaryMedium}" alt="${product.Name}" /></li>`;

    product.Images.ExtraImages.forEach((image) => {
      imageTemplate += `<li><img src="${image.Src}" alt="${image.Title}"></li>`;
    });

    imageTemplate += `</ul><div class="dots">`;

    for (let i = 0; i < product.Images.ExtraImages.length + 1; i++) {
      imageTemplate += `<button class="dot" data-index="${i}"></button>`;
    }
    imageTemplate += `</div></div>`;
  } else {
    imageTemplate = `<img id="productImage" class="img-small" src="${product.Images.PrimaryMedium}" alt="${product.Name}" />`;
  }

  const baseTemplate = `
  <span class="close-modal">X</span>
  <section class="product-quicklook">
  <h4 class="divider" id="productName">${product.Brand.Name} - ${product.NameWithoutBrand}</h2>
  ${imageTemplate}
  <p class="product-card__price divider-top" id="productFinalPrice">`;

  const endTemplate = `
  <p class="product__color" id="productColorName">Color: ${product.Colors[0].ColorName}</p>

  <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>`;

  if (product.FinalPrice < product.ListPrice) {
    const discount =
      ((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100;

    return `${baseTemplate} <div class='discount'><b>${discount.toFixed(
      0
    )}% off</b> deal</div>Price: $${product.FinalPrice}
    <div class='list-price'><i>List Price: <s>$${
      product.ListPrice
    }</i></s></div>
    </p> ${endTemplate}`;
  } else {
    return `${baseTemplate}Price: $${product.FinalPrice}</p> ${endTemplate}`;
  }
}
