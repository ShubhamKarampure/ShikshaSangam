import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ROUTES } from '../constants';
// Helper Function to Retrieve Token
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
/*
[{"created_at": "2024-12-02T22:47:49.856083Z", "(chat id ) id": 41, "last_message": {"content": "MEET_INVITATION#acmn-nq6i-02e3", "id": 104, "sender": "Shubham Karampure", "timestamp": "2024-12-04T18:57:42.749101Z"}, "participants": [[Object]], "updated_at": "2024-12-04T18:57:42.811120Z"}]
*/
// Fetch Wrapper Function
const handleFetch = async (url, method, body = null, additionalParams = {}) => {
  try {
    const token = await getAccessToken();

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    // Add query parameters if provided
    const fullUrl = new URL(url);
    Object.entries(additionalParams).forEach(([key, value]) => {
      fullUrl.searchParams.append(key, value);
    });

    const response = await fetch(fullUrl.toString(), options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in API request: ${error.message}`);
    throw error;
  }
};

// API Methods

// Fetch all chats or a specific chat
export const fetchChats = async (chatId = null) => {
  const params = chatId ? { chat_id: chatId } : {};
  return await handleFetch(API_ROUTES.CHAT_LIST, "GET", null, params);
};

// Create a new chat
export const createChat = async (otherUserId) => {
  const body = { other_user_id: otherUserId };
  return await handleFetch(API_ROUTES.CHAT_CREATE, "POST", body);
};

// Fetch messages from a specific chat
export const fetchMessages = async (chatId, options = {}) => {
  const { after_timestamp = null, limit = 50 } = options;
  const params = {
    ...(after_timestamp && { after_timestamp }),
    limit,
  };
  return await handleFetch(API_ROUTES.MESSAGE_LIST(chatId), "GET", null, params);
};

// Send a message to a specific chat
export const sendMessage = async (chatId, messageContent) => {
  const body = {
    chat: chatId,
    content: messageContent,
  };
  return await handleFetch(API_ROUTES.MESSAGE_CREATE(chatId), "POST", body);
};

// Send a Image to a specific chat  
export const sendMedia = async (chatId, content, image) => {
  const formData = new FormData();
  formData.append("chat", chatId);
  if(content!==null && content!==""){
    formData.append("content", content);
  }
  if (image) {  
    try {
      const response = await fetch(image);
      //console.log("response = ",response);
      const blob = await response.blob();
      //console.log("blob = ",blob);

      const imageName = image.split("/").pop(); // Extract file name
      const fileType = blob.type || "image/jpeg"; // Get MIME type, default to 'image/jpeg'

      formData.append("media", {
        uri: image,
        type: fileType,
        name: imageName || "image.jpg",
      });
      //console.log("sendMedia file = ", image);
      //console.log("form = ",formData);
    } catch (error) {
      console.error("Error fetching file:", error);
      alert("Failed to send the image. Please try again.");
      return;
    }
  }
  const token = await getAccessToken();
  if (!token) {
    throw new Error("Authentication token is missing.");
  }
  console.log("formData = ",formData);

  // const response = await handleFetch(API_ROUTES.MESSAGE_CREATE(chatId), {
  //   method: "POST",
  //   headers,
  //   body: formData,
  // });
  const response = await fetch(API_ROUTES.MESSAGE_CREATE(chatId), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, 
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};


// Send a file to a specific chat  
export const sendFile = async (chatId, content, file) => {
  const formData = new FormData();
  formData.append("chat", chatId);
  if(content!==null && content!==""){
    formData.append("content", content);
  }
  if (file) {  // if file exists
    formData.append("media",file); // gauranteed to be 1 file
  }
  else{
    console.log("ERROR: NO FILE FOUND");
    return;
  }

  const token = await getAccessToken();
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  console.log("formData = ",formData);

  const response = await fetch(API_ROUTES.MESSAGE_CREATE(chatId), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, 
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};



// Clear all messages in a chat
export const clearChat = async (chatId) => {
  return await handleFetch(API_ROUTES.CHAT_CLEAR(chatId), "DELETE");
};

