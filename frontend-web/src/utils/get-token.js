export const getTokenFromCookie = () => {
  // This function assumes you are using a cookie library or native JS for cookies
  const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
  if (token) {
    return token.split('=')[1]; // Extract the token from the cookie string
  }
  return null; // Return null if no token found
};
