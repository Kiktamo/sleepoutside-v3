import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Reset error messages
    // (You can implement a popup for error messages here)

    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const fullName = signupForm.fullName.value;
    const address = signupForm.address.value;
    const passwordConfirmation = signupForm.passwordConfirmation.value;

    // Implement your validation logic here
    // Ensure email, password, and passwordConfirmation are valid
    // Check if password and passwordConfirmation match
    // You can handle validation and error messages here

    if (password !== passwordConfirmation) {
      // Passwords do not match - display an error message in a popup
      alert('Passwords do not match. Please try again.');
    } else {
      // Submit the form if everything is valid
      // You can send the data to your server for user creation
      // Example: You can use fetch to post the data to your server
      // Here's a simplified example:
      try {
        const response = await fetch('/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            fullName,
            address,
          }),
        });

        if (response.status === 200) {
          // User creation successful
          alert('User created successfully.');
        } else {
          // Handle server error responses or other cases
          alert('User creation failed. Please try again.');
        }
      } catch (error) {
        // Handle fetch or server communication errors
        alert('An error occurred. Please try again.');
      }
    }
  });
});
