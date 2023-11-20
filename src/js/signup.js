import { loadHeaderFooter, alertMessage, formDataToJSON } from './utils.mjs';
import { signup } from './externalServices.mjs';

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
      alertMessage('Passwords do not match. Please try again.');
    } else {
      // Submit the form if everything is valid
      // You can send the data to your server for user creation
      // Example: You can use fetch to post the data to your server
      // Here's a simplified example:
      // try {
      //   const response = await fetch('/users', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       email,
      //       password,
      //       fullName,
      //       address,
      //     }),
      //   });
      const json = formDataToJSON(signupForm);
      console.log(json);
      try {
        const res = await signup(json);
        console.log(res);

        window.location.href = `./success.html?message=${encodeURIComponent(
          res.message
        )}`;
        this.finish();
      } catch (err) {
        console.log(err);
        // err.message.forEach((element) => {
        //   alertMessage(element.toString());
        // });
        if (typeof err.message === 'object') {
          for (const key in err.message) {
            if (err.message.hasOwnProperty(key)) {
              const element = err.message[key];
              // Here, 'key' is the property name, and 'element' is the value.
              alertMessage(element);
            }
          }
        }

        if (response.status === 200) {
          // User creation successful
          alert('User created successfully.');
        } else {
          // Handle server error responses or other cases
          alert('User creation failed. Please try again.');
        }
      }
    }
  });
});
