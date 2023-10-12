// Load the alerts.json file
export default function loadAlerts() {
  fetch(`../json/alerts.json`)
    .then((response) => response.json())
    .then((data) => {
      createAlerts(data);
    })
    /* eslint-disable no-console */ // Allows console statements in this file
    .catch((error) => console.error(error));
}

// Function to create and display alerts
function createAlerts(alerts) {
  if (alerts && Array.isArray(alerts)) {
    // Create a <section> element for alerts
    const alertSection = document.createElement('section');
    alertSection.className = 'alert-list';

    // Loop through the alerts and create <p> elements
    alerts.forEach((alertData) => {
      const alert = document.createElement('p');
      alert.textContent = alertData.message;
      alert.style.backgroundColor = alertData.background;
      alert.style.color = alertData.color;

      // Append the alert to the alert section
      alertSection.appendChild(alert);
    });

    // Prepend the alert section to the main element
    const mainElement = document.querySelector('main');
    mainElement.prepend(alertSection);
  }
}
