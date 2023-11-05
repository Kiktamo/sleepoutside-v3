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
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);

  if (callback) {
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
  const headerTemplateFn = loadTemplate('/partials/header.html');
  const footerTemplateFn = loadTemplate('/partials/footer.html');

  const headerEl = document.querySelector('#main-header');
  const footerEl = document.querySelector('#main-footer');

  await renderWithTemplate(headerTemplateFn, headerEl, updateCartCount);

  const searchForm = document.getElementById('search-form');

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const searchFunction = handleProductSearch();
    searchFunction();
  });

  renderWithTemplate(footerTemplateFn, footerEl);
}

export function alertMessage(message, scroll = true) {
  // Create an element to hold our alert
  const main = document.querySelector('main');
  const alert = document.createElement('div');

  // Add a class to style the alert
  alert.classList.add('alert');

  // Set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `${message} <span class="close">X</span>`;

  // Add a listener to the alert to see if they clicked on the X
  // If they did, then remove the alert
  alert.addEventListener('click', function (e) {
    if (e.target.tagName === 'SPAN' && e.target.innerText === 'X') {
      main.removeChild(this);
    }
  });

  // Add the alert to the top of main
  main.prepend(alert);

  // Make sure they see the alert by scrolling to the top of the window
  // We may not always want to do this, so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) {
    window.scrollTo(0, 0);
  }
}

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
