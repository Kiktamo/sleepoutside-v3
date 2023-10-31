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
