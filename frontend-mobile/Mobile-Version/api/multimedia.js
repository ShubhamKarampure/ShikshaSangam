import { BACKEND_URL } from "../constants";  // Import BACKEND_URL from the constants file
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure you are using AsyncStorage from React Native

const API_BASE_URL = BACKEND_URL;  // Use BACKEND_URL for the API base URL

// Define API routes with correct URLs
const API_ROUTES = {
  CHAT_LIST: `${API_BASE_URL}/multimedia/chats/`, // List all chats for the user
  CHAT_CREATE: `${API_BASE_URL}/multimedia/chats/create/`, // Create a new chat
  MESSAGE_LIST: (chatId) => `${API_BASE_URL}/multimedia/chats/${chatId}/messages/`, // List messages for a specific chat
  MESSAGE_CREATE: (chatId) => `${API_BASE_URL}/multimedia/chats/${chatId}/messages/create/`, // Send a message in a chat
  CHAT_CLEAR: (chatId) => `${API_BASE_URL}/multimedia/chats/${chatId}/clear/`, // Clear all messages in a chat
};

// Handle API fetch logic
const handleFetch = async (url, method, body = null, additionalParams = {}) => {
  // Retrieve token from AsyncStorage
  const token = await AsyncStorage.getItem('access_token');

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const options = {
    method: method,
    headers: headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  // Manually append query parameters to the URL
  let fullUrl = url;
  if (Object.keys(additionalParams).length > 0) {
    const queryParams = new URLSearchParams(additionalParams).toString();
    fullUrl = `${url}?${queryParams}`;
  }

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

// API method implementations
export const fetchChats = async (chatId = null) => {
  const params = chatId ? { chat_id: chatId } : {};
  return await handleFetch(API_ROUTES.CHAT_LIST, "GET", null, params);
};

export const createChat = async (otherUserId) => {
  const body = { other_user_id: otherUserId };
  return await handleFetch(API_ROUTES.CHAT_CREATE, "POST", body);
};

export const fetchMessages = async (chatId, options = {}) => {
  const { after_timestamp = null, limit = 50 } = options;

  const params = {
    ...(after_timestamp && { after_timestamp }),
    limit
  };

  return await handleFetch(API_ROUTES.MESSAGE_LIST(chatId), "GET", null, params);
};

export const sendMessage = async (chatId, messageContent) => {
  const body = { chat: chatId, content: messageContent };
  return await handleFetch(API_ROUTES.MESSAGE_CREATE(chatId), "POST", body);
};

export const clearChat = async (chatId) => {
  return await handleFetch(API_ROUTES.CHAT_CLEAR(chatId), "DELETE");
};
