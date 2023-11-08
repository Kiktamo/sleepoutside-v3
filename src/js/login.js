import { loadHeaderFooter } from './utils.mjs';
import { getParam } from './utils.mjs';
import { login } from './auth.mjs';

const redirect = getParam('redirect');
loadHeaderFooter();

document.forms['login'].addEventListener('submit', (e) => {
  e.preventDefault();
  // e.target would contain our form in this case
  var chk_status = e.target.checkValidity();

  console.log(e.target);

  if (chk_status) {
    login(e.target, redirect);
  }
});
