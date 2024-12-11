import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "../utils/get-token";

// Create Notification
export const createNotification = async (notificationData) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie
  
  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(`${API_ROUTES.NOTIFICATIONS}get_own/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(notificationData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

// Get All Notifications
export const getNotifications = async () => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(API_ROUTES.NOTIFICATIONS, {
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


// Delete Notification
export const deleteNotification = async (notificationId) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(`${API_ROUTES.NOTIFICATIONS}get_own/`, {
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

// Get All Notifications of Authenticated User
export const getUserNotifications = async () => {
  const token = getTokenFromCookie(); // Retrieve token from cookie
  
  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(API_ROUTES.NOTIFICATIONS, {
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

export const clearAllNotifications = async () => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

  if (!token) {
    throw new Error('Token is missing');
  }

  const response = await fetch(`${API_ROUTES.NOTIFICATIONS}delete_all/`, {  // Assuming you have this endpoint in your API
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




