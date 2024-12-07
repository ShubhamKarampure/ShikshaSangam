import BACKEND_URL from "../constants";
import { API_ROUTES } from "../constants";
const signin = async (data) => {
  

  try {
    // Correct the URL here by removing spaces and using BACKEND_URL
    const response = await fetch(API_ROUTES.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw { response: { data: errorData } };
    }

    const result = await response.json();
    console.log(result);
    
    return result;
  } catch (error) {
    throw error;
  }
};

export default signin;


// Signup API call using fetch
export const signup = async (data) => {
  try {
    // Send the POST request using fetch
    const response = await fetch(API_ROUTES.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type as JSON
      },
      body: JSON.stringify(data), // Convert JavaScript object to JSON string
    });

    // Check if the response status is not OK
    if (!response.ok) {
      // Extract error information and throw an error
      const errorData = await response.json();
      console.log(errorData);
      throw { response: { data: errorData } };
    }

    // Parse the JSON response
    const res = await response.json();
    console.log(res);

    return res;
  } catch (error) {
    throw error;
  }
};


