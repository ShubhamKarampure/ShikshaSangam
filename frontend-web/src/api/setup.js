 // Import the axios instance with the interceptor
import { API_ROUTES } from '@/routes/apiRoute';

const getAccessToken = () => {
  const match = document.cookie.match(/(?:^|; )access_token=([^;]*)/);
  return match ? match[1] : null;
};

import axios from "axios";
export const studentProfile = async (data) => {
  try {
    // Make the API call using the axios instance
    const response = await axios.post(API_ROUTES.STUDENTPROFILE, data, {
      headers: {
        'Content-Type': 'application/json',  // Set the content type as JSON
      },
    });

    return response.data;  // Axios automatically parses and returns the response data
  } catch (error) {
    // Handle errors and log them for debugging
    console.error(error.response?.data || error.message);
    throw error;  // Rethrow the error to be handled by the caller
  }
};

// Similarly for other endpoints:

export const alumnusProfile = async (data) => {
  try {
    const response = await axios.post(API_ROUTES.ALUMNIPROFILE, data, {
      headers: {
        'Content-Type': 'application/json',  // Content-Type header
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

export const collegeStaffProfile = async (data) => {
  try {
    const response = await axios.post(API_ROUTES.COLLEGESTAFFPROFILE, data, {
      headers: {
        'Content-Type': 'application/json',  // Content-Type header
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

export const collegeAdminProfile = async (data) => {
  try {
    let token = getAccessToken();
    console.log(token)
    console.log('Data being sent:', data);

    const response = await fetch(API_ROUTES.COLLEGEADMINPROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Set the content type to JSON
         'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),  // Convert the data object to JSON
    });

    if (!response.ok) {
      // If the response status is not OK (2xx), throw an error
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const responseData = await response.json();  // Parse the JSON response
    return responseData;  // Return the data from the API response

  } catch (error) {
    console.error('Error occurred:', error.message);
    throw error;  // Re-throw the error so it can be handled upstream
  }
};


export const createCollege = async (data) => {
  try {
    const response = await axios.post(API_ROUTES.COLLEGE, data, {
      headers: {
        'Content-Type': 'application/json',  // Content-Type header
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

export default {
  studentProfile,
  alumnusProfile,
  collegeStaffProfile,
  collegeAdminProfile,
  createCollege,
};
