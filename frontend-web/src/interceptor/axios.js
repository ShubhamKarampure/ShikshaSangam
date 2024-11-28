import axios from "axios";
import { getCookie, setCookie } from 'cookies-next';  // Add cookies-next to handle session cookies

let refresh = false; // Flag to prevent multiple refresh attempts at the same time

// Axios interceptor for handling 401 errors and refreshing the token
axios.interceptors.response.use(
    
  (response) => response, // If the response is successful, just pass it through
  async (error) => {
    if (error.response.status === 401 && !refresh) {  // If 401 Unauthorized
      refresh = true;  // Prevents making multiple refresh requests

      try {
        const refreshToken = getCookie('refresh_token'); // Get the refresh token from cookies
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Log refresh token for debugging
        console.log('Refresh Token:', refreshToken);

        // Send a request to refresh the token
        const refreshResponse = await axios.post(
          'http://localhost:8000/users/token/refresh/',  // Replace with your refresh endpoint
          { refresh: refreshToken }, // Pass the refresh token
          {
            headers: {
              'Content-Type': 'application/json',  // Set appropriate content type
            },
            withCredentials: true,  // Send cookies if required
          }
        );

        // If the refresh request is successful
        if (refreshResponse.status === 200) {
          // Update the Authorization header globally with the new access token
          axios.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.data.access}`;

          // Save the new access and refresh tokens in cookies
          setCookie('access_token', refreshResponse.data.access);
          setCookie('refresh_token', refreshResponse.data.refresh);

          // Retry the original request with the new access token
          return axios(error.config);
        }
      } catch (e) {
        console.error('Error refreshing token', e);
        return Promise.reject(error);  // Reject the request if token refresh fails
      }
    }

    refresh = false;  // Reset the flag if the error is handled
    return Promise.reject(error);  // Reject the error so it can be handled later
  }
);

// Set default Authorization header from session cookie
const accessToken = getCookie('access_token'); // Get access token from session cookies
if (accessToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export default axios;
