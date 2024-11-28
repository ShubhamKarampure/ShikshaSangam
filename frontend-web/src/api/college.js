import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "../utils/get-token";

// Create College
export const createCollege = async (collegeData) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(API_ROUTES.COLLEGE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(collegeData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Get All Colleges
export const getColleges = async () => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(API_ROUTES.COLLEGE, {
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

// Get Single College
export const getCollege = async (collegeId) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(`${API_ROUTES.COLLEGE}${collegeId}/`, {
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

// Update College
export const updateCollege = async (collegeId, collegeData) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(`${API_ROUTES.COLLEGE}${collegeId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(collegeData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Delete College
export const deleteCollege = async (collegeId) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(`${API_ROUTES.COLLEGE}${collegeId}/`, {
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
