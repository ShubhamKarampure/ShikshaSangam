import AsyncStorage from '@react-native-async-storage/async-storage';
 import BACKEND_URL from "../constants"

// Helper function to get the access token
const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) throw new Error('Access token not found');
      return token;
    } catch (error) {
      console.error("Error retrieving access token:", error);
      throw error;
    }
  };

  // CREATE (POST) user profile
export const createUserProfile = async (profileData) => {
    const token = await getAccessToken();
    const response = await fetch(`${BACKEND_URL}/users/user-profile/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: profileData, // FormData instance
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create user profile');
    }
  
    return response.json();
  };

  // READ (GET) user profile
export const getUserProfile = async (profile_id) => {
    const token = await getAccessToken();
    const response = await fetch(`${BACKEND_URL}/users/userprofiles/${profile_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user profile');
    }
  
    return response.json();
  };
  // UPDATE (PUT) user profile
export const updateUserProfile = async (profileId, profileData) => {
  const token = await getAccessToken();
  const response = await fetch(`${BACKEND_URL}/users/userprofiles/${profileId}/`, {  // Use profileId here
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    body: profileData, // FormData instance for updating the profile
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update user profile');
  }

  return response.json();
};

  // DELETE user profile
export const deleteUserProfile = async () => {
    const token = await getAccessToken();
    const response = await fetch(`${BACKEND_URL}/users/user-profiles/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete user profile');
    }
  
    return response.json();
  };