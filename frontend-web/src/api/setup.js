 // Import the axios instance with the interceptor
import { API_ROUTES } from '@/routes/apiRoute';
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
    console.log('Axios Default Headers:', axios.defaults.headers.common);
    console.log(data)
    const response = await axios.post('http://127.0.0.1:8000/users/college-admin/', data, {
      headers: {
        'Content-Type': 'application/json',  // Content-Type header
      },
    });
    return response.data;
  } catch (error) {
    console.log(data)
    console.error(error.response?.data || error.message);
    throw error;
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
