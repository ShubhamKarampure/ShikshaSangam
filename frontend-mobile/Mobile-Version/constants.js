
yourIp = "192.168.1.5" // Give your IP for identifying where backend is running to mobile
const BACKEND_URL = "http://" + yourIp + ":8000";

export const API_ROUTES = {
  CHAT_LIST: `${BACKEND_URL}/multimedia/chats/`, // List all chats
  CHAT_CREATE: `${BACKEND_URL}/multimedia/chats/create/`, // Create a new chat
  MESSAGE_LIST: (chatId) => `${BACKEND_URL}/multimedia/chats/${chatId}/messages/`, // List messages
  MESSAGE_CREATE: (chatId) => `${BACKEND_URL}/multimedia/chats/${chatId}/messages/create/`, // Send a message
  CHAT_CLEAR: (chatId) => `${BACKEND_URL}/multimedia/chats/${chatId}/clear/`, // Clear messages
};

 export default BACKEND_URL