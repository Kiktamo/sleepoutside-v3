export default function loadBanner() {
  // Check if first visit
  if (!localStorage.getItem('firstVisit')) {
    // Show banner
    document.getElementById('register-banner').classList.remove('hidden');

    // Set localStorage value
    localStorage.setItem('firstVisit', 'true');
  }

  // Add click handler to close banner
  document.getElementById('register').addEventListener('click', () => {
    document.getElementById('register-banner').classList.add('hidden');
    window.location.href = '/signup/index.html';
  });
}
