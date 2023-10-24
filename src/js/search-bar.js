// Function to handle product search and open the search results page
export function handleProductSearch() {
  return function () {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim().toLowerCase();

    // Open the search results page with the search query as a query parameter
    window.location.href = `/search-results/index.html?q=${encodeURIComponent(
      query
    )}`;
  };
}
