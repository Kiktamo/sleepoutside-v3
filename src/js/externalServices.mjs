const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  try {
    const jsonResponse = await res.json(); // Attempt to parse the response body as JSON
    if (!res.ok) {
      throw { name: 'servicesError', message: jsonResponse };
    }
    return jsonResponse; // If the response is okay, return the JSON data
  } catch (error) {
    // Handle any errors that occur during parsing or processing
    console.error(error);
    throw error; // throw it again to propagate and handle upstream
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function getAllProducts() {
  // Define the categories
  const categories = ['tents', 'backpacks', 'sleeping-bags', 'hammocks'];

  // Create an array to store products
  const allProducts = [];

  // Loop through each category and fetch products
  for (const category of categories) {
    const products = await getProductsByCategory(category);
    allProducts.push(...products);
  }

  return allProducts;
}

export async function checkout(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + 'checkout', options).then(convertToJson);
}

export async function loginRequest(creds) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  };
  return await fetch(baseURL + 'login', options).then(convertToJson);
}

export async function getOrders(token) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await fetch(baseURL + 'orders', options).then(convertToJson);
}

export async function signup(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + 'users', options).then(convertToJson);
}
