import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "../utils/get-token";

const handleFetch = async (url, method, body = null, additionalParams = {}) => {
  const token = getTokenFromCookie();

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
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
    limit = 50, // Default limit to 50 messages
  } = options;

  const params = {
    ...(after_timestamp && { after_timestamp }),
    limit,
  };

  return await handleFetch(
    API_ROUTES.MESSAGE_LIST(chatId),
    "GET",
    null,
    params
  );
};

export const sendMessage = async (chatId, messageContent) => {
  const body = {
    chat: chatId,
    content: messageContent,
  };

  return await handleFetch(API_ROUTES.MESSAGE_CREATE(chatId), "POST", body);
};

export const sendMedia = async (chatId, file) => {
  const formData = new FormData();
  formData.append("chat", chatId);
  formData.append("media", file[0]);
  console.log(file);
  
  const token = getTokenFromCookie();
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log(formData);

  const response = await fetch(API_ROUTES.MESSAGE_CREATE(chatId), {
    method: "POST",
    headers,
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

export const clearChat = async (chatId) => {
  return await handleFetch(API_ROUTES.CHAT_CLEAR(chatId), "DELETE");
};

import axios from "axios";

const BASE_URL = "/api/v1";
// New call-related API methods
export const sendCallInvitation = async (chatId, callType) => {
  try {
    const response = await axios.post(`${BASE_URL}/calls/invite`, {
      chatId,
      callType,
      recipientId,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending call invitation:", error);
    throw error;
  }
};

export const respondToCall = async (callId, response) => {
  try {
    await axios.post(`${BASE_URL}/calls/${callId}/respond`, { response });
  } catch (error) {
    console.error("Error responding to call:", error);
    throw error;
  }
};

export const fetchPendingCallInvitations = async (chatId) => {
  try {
    const response = await axios.get(`${BASE_URL}/calls/pending`, {
      params: { chatId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pending call invitations:", error);
    throw error;
  }
};
