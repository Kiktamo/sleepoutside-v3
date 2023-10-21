import updateCartCount from './updateCartCount.mjs';
import { handleProductSearch } from './search-bar.js';

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}
// Get a query parameter value from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(''));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  callback,
  data,
  position = 'afterbegin',
  clear = true
) {
  console.log('renderWithTemplate called');

  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);

  if (callback) {
    console.log('Callback called within renderWithTemplate');

    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  console.log('loadHeaderFooter called');
  const headerTemplateFn = loadTemplate('/partials/header.html');
  const footerTemplateFn = loadTemplate('/partials/footer.html');

  const headerEl = document.querySelector('#main-header');
  const footerEl = document.querySelector('#main-footer');

  await renderWithTemplate(headerTemplateFn, headerEl, updateCartCount);
  // After rendering the header template, add the event listener for the search button

  // const searchButton = document.getElementById('search-button');

  // if (searchButton) {
  //   searchButton.addEventListener('click', handleProductSearch());
  //   // You may need to define 'searchQuery' or retrieve it from an appropriate source.
  //   console.log('search button listener added');

  //   // Call any other necessary functions here.
  // }
  const searchForm = document.getElementById('search-form');

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Call handleProductSearch to get the returned function
    const searchFunction = handleProductSearch();

    // Execute the returned function
    searchFunction();
  });

  renderWithTemplate(footerTemplateFn, footerEl);
}
