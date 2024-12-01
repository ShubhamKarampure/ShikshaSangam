import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "../utils/get-token";

// Function to handle fetch requests
const handleFetch = async (url, method, body = null) => {
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

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

export const fetchChats = async (chatId = null) => {
  // If chatId is provided, include it as a query parameter in the API request
  const url = chatId ? `${API_ROUTES.CHAT_LIST}?chat_id=${chatId}` : API_ROUTES.CHAT_LIST;
  
  return await handleFetch(url, "GET");
};

// 2. **Create Chat**
export const createChat = async (otherUserId) => {
  const body = { other_user_id: otherUserId };
  return await handleFetch(API_ROUTES.CHAT_CREATE, "POST", body);
};

// 3. **Fetch Messages for a Specific Chat**
export const fetchMessages = async (chatId) => {
  return await handleFetch(API_ROUTES.MESSAGE_LIST(chatId), "GET");
};

// 4. **Send Message in a Specific Chat**
export const sendMessage = async (chatId, messageContent) => {
  const body = { chat: chatId, content: messageContent }; // Send both 'chat' and 'content'
  console.log('Sending message to chatId:', chatId);

  return await handleFetch(API_ROUTES.MESSAGE_CREATE(chatId), "POST", body);
};


