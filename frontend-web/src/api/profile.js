// src/services/profileApi.js
import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "../utils/get-token";

// user profile api crud
export const createUserProfile = async (profileData) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');
  const response = await fetch(API_ROUTES.USERPROFILE, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: profileData,  // Send the FormData as the body
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// 1. Student Profile API CRUD

// Create Student Profile
export const createStudentProfile = async (profileData) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(API_ROUTES.STUDENTPROFILE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),  
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Get Student Profile
export const getStudentProfile = async (profileId) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.STUDENTPROFILE}${profileId}/`, {
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

// Update Student Profile
export const updateStudentProfile = async (profileId, profileData) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.STUDENTPROFILE}${profileId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Delete Student Profile
export const deleteStudentProfile = async (profileId) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.STUDENTPROFILE}${profileId}/`, {
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

// 2. Alumnus Profile API CRUD

// Create Alumnus Profile
export const createAlumnusProfile = async (profileData) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(API_ROUTES.ALUMNIPROFILE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Get Alumnus Profile
export const getAlumnusProfile = async (profileId) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.ALUMNIPROFILE}${profileId}/`, {
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

// Update Alumnus Profile
export const updateAlumnusProfile = async (profileId, profileData) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.ALUMNIPROFILE}${profileId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Delete Alumnus Profile
export const deleteAlumnusProfile = async (profileId) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.ALUMNIPROFILE}${profileId}/`, {
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

// 3. College Admin Profile API CRUD

// Create College Admin Profile
export const createCollegeAdminProfile = async (profileData) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(API_ROUTES.COLLEGEADMINPROFILE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Get College Admin Profile
export const getCollegeAdminProfile = async (profileId) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.COLLEGEADMINPROFILE}${profileId}/`, {
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

// Update College Admin Profile
export const updateCollegeAdminProfile = async (profileId, profileData) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.COLLEGEADMINPROFILE}${profileId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Delete College Admin Profile
export const deleteCollegeAdminProfile = async (profileId) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.COLLEGEADMINPROFILE}${profileId}/`, {
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

// 4. College Staff Profile API CRUD

// Create College Staff Profile
export const createCollegeStaffProfile = async (profileData) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(API_ROUTES.COLLEGESTAFFPROFILE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Get College Staff Profile
export const getCollegeStaffProfile = async (profileId) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.COLLEGESTAFFPROFILE}${profileId}/`, {
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

// Update College Staff Profile
export const updateCollegeStaffProfile = async (profileId, profileData) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.COLLEGESTAFFPROFILE}${profileId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Delete College Staff Profile
export const deleteCollegeStaffProfile = async (profileId) => {
  const token = getTokenFromCookie();
  if (!token) throw new Error('Token not found');

  const response = await fetch(`${API_ROUTES.COLLEGESTAFFPROFILE}${profileId}/`, {
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
