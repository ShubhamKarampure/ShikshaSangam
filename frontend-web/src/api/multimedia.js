import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "../utils/get-token";

const handleFetch = async (url, method, body = null, additionalParams = {}) => {
  const token = getTokenFromCookie();

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

  // Construct URL with query parameters
  const fullUrl = new URL(url);
  Object.entries(additionalParams).forEach(([key, value]) => {
    fullUrl.searchParams.append(key, value);
  });

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

export const fetchChats = async (chatId = null) => {
  const params = chatId ? { chat_id: chatId } : {};
  return await handleFetch(API_ROUTES.CHAT_LIST, "GET", null, params);
};

export const createChat = async (otherUserId) => {
  const body = { other_user_id: otherUserId };
  return await handleFetch(API_ROUTES.CHAT_CREATE, "POST", body);
};

export const fetchMessages = async (chatId, options = {}) => {
  const { 
    after_timestamp = null,
    limit = 50  // Default limit to 50 messages
  } = options;

  const params = {
    ...(after_timestamp && { after_timestamp }),
    limit
  };

  return await handleFetch(API_ROUTES.MESSAGE_LIST(chatId), "GET", null, params);
};

export const sendMessage = async (chatId, messageContent) => {
  const body = { 
    chat: chatId, 
    content: messageContent 
  };

  return await handleFetch(API_ROUTES.MESSAGE_CREATE(chatId), "POST", body);
};