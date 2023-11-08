import loadAlerts from './alerts.mjs';
import loadBanner from './call2action.js';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();
loadBanner();
loadAlerts();

// Get form elements
const emailInput = document.getElementById('emailInput');
const signupButton = document.getElementById('signupButton');
const optOutButton = document.getElementById('optOutButton');
const message = document.getElementById('message');
const newsletterSection = document.getElementById('newsletterSection');

// Check the user's subscription status
let subscriptionStatus = localStorage.getItem('subscriptionStatus');

if (subscriptionStatus === 'subscribed') {
  showMessage('You are already signed up for our newsletter');
  newsletterSection.style.display = 'none'; // Hide the newsletter section
  message.classList.remove('hidden');
}

// Form submit handler
signupButton.addEventListener('click', signUpHandler);
optOutButton.addEventListener('click', optOutHandler);

// Listen for Enter key press in the email input field
emailInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    if (emailInput.value.trim() !== '') {
      event.preventDefault(); // Prevent default form submission
      signUpHandler();
    }
  }
});

function signUpHandler() {
  const email = emailInput.value.trim();

  // Basic email validation
  if (!email.includes('@')) {
    showMessage('Please enter a valid email address', true); // Make the error message bold and set the background to red
    return;
  }

  // Check if the user is already subscribed
  if (subscriptionStatus === 'subscribed') {
    showMessage('You are already signed up for our newsletter');
  } else {
    // Subscribe user
    subscribeUser(email);
    newsletterSection.style.display = 'none'; // Hide the newsletter section
  }
}

// Opt out handler
optOutButton.addEventListener('click', optOutHandler);

function optOutHandler() {
  const email = emailInput.value.trim();

  // Ensure the input is not empty and is a valid email
  if (email === '' || !email.includes('@')) {
    showMessage('Please enter a valid email to opt out', true); // Make the error message bold and set the background to red
    return;
  }

  // Check if the user is already opted out
  if (subscriptionStatus === 'opted-out') {
    showMessage('You have already opted out from subscribing to our newsletter');
    newsletterSection.innerHTML = '';
  } else {
    // Unsubscribe user
    unsubscribeUser(email);
    newsletterSection.innerHTML = ''; // Hide the newsletter section
  }
}

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.remove('hidden');

  if (isError) {
    message.classList.add('error-message'); // Apply the error-message class
  } else {
    message.classList.remove('error-message');
  }

  // Clear the input field
  emailInput.value = '';
}

function subscribeUser(email) {
  // Simulated subscription logic (replace with your actual logic)
  showMessage('Subscribing...');
  setTimeout(() => {
    showMessage(`You are now subscribed with email: ${email}`);
    subscriptionStatus = 'subscribed';
    localStorage.setItem('subscriptionStatus', subscriptionStatus);
    emailInput.value = ''; // Clear the input field
  }, 2000);
}

function unsubscribeUser(email) {
  // Simulated unsubscription logic (replace with your actual logic)
  showMessage('Unsubscribing...');
  setTimeout(() => {
    showMessage(`You have been unsubscribed with email: ${email}`);
    subscriptionStatus = 'opted-out';
    localStorage.setItem('subscriptionStatus', subscriptionStatus);
    emailInput.value = ''; // Clear the input field
  }, 2000);
}