import { qs } from './utils.mjs';
import { checkLogin } from './auth.mjs';
import { getOrders } from './externalServices.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default async function currentOrders(selector, page = 1) {
  const token = await checkLogin();
  const allOrders = await getOrders(token);
  const totalItems = allOrders.length;
  const orderList = qs(selector);
  console.log(allOrders);

  // Determine orders per page
  const numPerPage = 10;
  const startIndex = (page - 1) * numPerPage;
  const endIndex = startIndex + numPerPage;

  const orders = allOrders.slice(startIndex, endIndex);

  renderListWithTemplate(orderCardTemplate, orderList, orders);

  // Create Page Numbers
  const numPages = Math.ceil(totalItems / numPerPage);
  const pages = await createPageList(page, numPages);

  const pageList = document.createElement('ul');
  pageList.classList.add('page-list');
  pageList.insertAdjacentHTML('afterbegin', pages);
  orderList.after(pageList);
}

async function createPageList(currentPage, numPages) {
  var pages = '';

  // Previous page
  if (currentPage > 1) {
    if (currentPage - 1 > 1) {
      pages += `<li><a href="?page=1">1</a></li><li>...</li>`;
    }
    pages += `
    <li><a href="?page=${currentPage - 1}">${currentPage - 1}</a></li>
    <li>${currentPage}</li>`;
  } else {
    pages += `<li>${currentPage}</li>`;
  }

  // Next pages
  for (
    let i = currentPage + 1;
    i <= Math.min(numPages - 1, currentPage + 4);
    i++
  ) {
    pages += `<li><a href="?page=${i}">${i}</a></li>`;
  }

  if (currentPage + 4 < numPages - 1) {
    pages += `<li>...</li>`;
  }

  // Last page
  if (currentPage != numPages) {
    pages += `<li><a href="?page=${numPages}">${numPages}</a></li>`;
  }

  return pages;
}

function orderCardTemplate(order) {
  var orderCard = `<li class="order-card">
  <h2 class="order__name"><b>Order For:</b> ${order.fname} ${order.lname}</h2>
  <p class="order__date"><b>Order Date:</b> ${new Date(
    order.orderDate
  ).toDateString()}</p>
  <p class="order__total"><b>Order Total:</b> $${Number(
    order.orderTotal
  ).toFixed(2)}</p><ul class="order-items">`;

  order.items.forEach((item) => {
    orderCard += `<li>
    <p class="order-item-name"><b>Product:</b> ${item.name}</p>
    <p class="order-item-quantity"><b>Qty:</b> ${item.quantity}</p>
    <p class="order-item-price"><b>Price:</b> $${item.price}</p></li>`;
  });

  orderCard += `</ul></li>`;
  return orderCard;
}
