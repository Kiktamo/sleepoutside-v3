import { qs } from './utils.mjs';
import { getOrders } from './externalServices.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default async function currentOrders(selector, token, page = 1) {
  const allOrders = await getOrders(token);
  const totalItems = allOrders.length;
  const orderList = qs(selector);

  // Determine orders per page
  const numPerPage = 20;
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
    pages += `<li><a href="?page=${currentPage - 1}">${
      currentPage - 1
    }</a></li>`;
  }

  // Adjacent pages
  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(numPages, currentPage + 1);
    i++
  ) {
    if (i != currentPage || i != numPages) {
      pages += `<li><a href="?page=${i}">${i}</a></li>`;
    }
  }

  // Next page
  if (currentPage < numPages) {
    pages += `<li>...</li>`;
  }

  // Last page
  pages += `<li><a href="?page=${numPages}">${numPages}</a></li>`;

  return pages;
}

function orderCardTemplate(order) {
  return `<li class="order-card">${order.id}</li>`;
}
