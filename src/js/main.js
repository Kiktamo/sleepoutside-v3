import updateCartCount from './updateCartCount.mjs';
import productList from './productList.mjs';

updateCartCount();
productList('.product-list', 'tents');


const search = () => {
  // get the id of the search bar input section from index page
  const searchProduct = document.querySelector('#searchInput').value.toLowerCase();

  // get the ul of proudct section from index page
  const itemList = document.querySelector('#product-list')

  // get the li of  all proudct from index page
  const productCard = document.querySelectorAll('.product-card');

  // get the h2 that has the product name index page
  const productName = itemList.getElementsByTagName('h2')

  // 
  for (let e = 0; e < productName.length; e++) {
    // This variable holds the name of the product being searched for
    let match = productCard[e].getElementsByTagName('h2')[0];

    if (match) {
      let textValue = match.textContent || match.innerHTML // textValue is stored when the item seearched matches any product on the page

      
      // item is sorted and displayed in the top prduct section of the home page.
      if (textValue.toLowerCase().indexOf(searchProduct) > -1) {
        productCard[e].style.display = '';
      }
      else {
        productCard[e].style.display = 'none';
      }
    }
  }
}

//search function is called using an eventlistener. 
document.querySelector('#searchInput').addEventListener('input', search);