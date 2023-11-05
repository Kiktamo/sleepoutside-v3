import { formDataToJSON } from './utils.mjs';
import { loginRequest } from './externalServices.mjs';
import { alertMessage, setLocalStorage, getLocalStorage } from './utils.mjs';
import { jwtDecode } from 'jwt-decode';

const tokenKey = 'so_token';

export async function login(creds, redirect = '/') {
  const json = formDataToJSON(creds);

  try {
    const res = await loginRequest(json);
    console.log(res);
    setLocalStorage(tokenKey, res.accessToken);
    window.location = redirect;
  } catch (err) {
    console.log(err);
    if (typeof err.message === 'object') {
      for (const key in err.message) {
        if (err.message.hasOwnProperty(key) && key != 'status') {
          const element = err.message[key];
          alertMessage(element);
        }
      }
    }
  }
}

export async function checkLogin() {
  const token = getLocalStorage(tokenKey);
  if (!isTokenValid(token)) {
    localStorage.removeItem(tokenKey);
    const location = window.location;
    console.log(location);
    window.location = `/login/index.html?redirect=${location.pathname}`;
  } else return token;
}

function isTokenValid(token) {
  if (token) {
    const decoded = jwtDecode(token);
    let currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      console.log('Token expired.');
      return false;
    } else {
      console.log('Valid token');
      return true;
    }
  } else return false;
}
