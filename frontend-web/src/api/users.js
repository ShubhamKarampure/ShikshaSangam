import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "../utils/get-token";

// Create User
export const createUser = async (userData) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(API_ROUTES.USERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Get All Users
export const getUsers = async () => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(API_ROUTES.USERS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Get Single User
export const getUser = async (userId) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(`${API_ROUTES.USERS}${userId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Update User
export const updateUser = async (userId, userData) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(`${API_ROUTES.USERS}${userId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Delete User
export const deleteUser = async (userId) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(`${API_ROUTES.USERS}${userId}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};