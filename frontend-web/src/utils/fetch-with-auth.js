const getAuthToken = () => {
  // Assuming you're storing the token in localStorage or similar
  return localStorage.getItem('auth_token') || '';  // Or wherever your token is stored
}

// General fetch function to add Bearer token
const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();  // Get the token from localStorage or other sources
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,  // Add Bearer token to the headers
    ...options.headers,  // Spread any additional headers passed to the fetch options
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Handle the error if the response is not successful (2xx)
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  const responseData = await response.json();  // Parse JSON response
  return responseData;
};