import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ROUTES } from "../constants";
import { CLOUDINARY_CLOUD_NAME } from '../Utility/urlUtils';

let cachedToken = null;

// Function to get token with caching
export const getToken = async () => {
  if (cachedToken) {
    return cachedToken;
  }
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      console.error("Access token is missing");
    }
    cachedToken = token; // Cache the token
    return token;
  } catch (error) {
    console.error("Error retrieving token from AsyncStorage:", error);
    return null;
  }
};

// Function to clear the cached token (e.g., during logout)
export const clearCachedToken = () => {
  cachedToken = null;
};

// Function to get comments for a post
export const getComment = async (postId) => {
  const token = await getToken(); // Call getToken directly
  if (!token) {
    throw new Error("Token is missing");
  }

  const response = await fetch(`${API_ROUTES.COMMENTS}post_comments/${postId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response);
  

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const res = await response.json();
  // return res.results.map((c) => ({
  //   comment: c.comment.content,
  //   createdAt: c.comment.created_at,
  //   socialUser: {
  //     avatar:
  //       c.user.avatar ||
  //       "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     name: c.user.username,
  //   },
  //   commentId: c.comment.id,
  //   children: [],
  // }));
  return res;
};

// Function to post a comment
export const postComment = async (postId, profile_id, data) => {
  const token = await getToken(); // Call getToken directly
  if (!token) {
    throw new Error("Token is missing");
  }

  const comment = {
    post: postId,
    userprofile: profile_id,
    content: data,
  };

  const response = await fetch(`${API_ROUTES.COMMENTS}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const res = await response.json();
  return res;
};

// Function to post a reply to a comment
export const postReply = async (profile_id, commentId, data) => {
  const token = await getToken(); // Call getToken directly
  if (!token) {
    throw new Error("Token is missing");
  }

  const reply = {
    content: data,
    comment: commentId,
    userprofile: profile_id,
  };

  const response = await fetch(`${API_ROUTES.REPLY}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reply),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  console.log("Reply posted successfully");
};

// Function to get replies for a comment
export const getReply = async (commentId) => {
  const token = await getToken(); // Call getToken directly
  if (!token) {
    throw new Error("Token is missing");
  }

  const response = await fetch(`${API_ROUTES.REPLY}comment_replies/${commentId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const res = await response.json();
  return res;
  // return res.results.map((r) => ({
  //   replyId: r.reply.id,
  //   comment: r.reply.content,
  //   createdAt: r.reply.created_at,
  //   socialUser: {
  //     avatar: r.user.avatar,
  //     name: r.user.username,
  //   },
  //   likesCount: r.likes_count,
  // }));
};

// Function to get all feed posts
export const getAllFeed = async () => {
  const token = await getToken(); // Call getToken directly
  if (!token) {
    throw new Error("Token is missing");
  }

  const response = await fetch(API_ROUTES.FEED, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const res = await response.json();
  
  return res;
};

export const postlike = async (profile_id, post_id) => {
  try {
    const token = await getToken(); // Retrieve token
    if (!token) {
      throw new Error("Token is missing");
    }

    // Prepare the request payload
    const requestData = {
      userprofile: profile_id,
      content_type: 20, // Hardcoded for posts
      object_id: post_id,
    };

    // Make the API call
    const response = await fetch(`${API_ROUTES.LIKES}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    
console.log("Payload being sent for like:", requestData);
console.log("Token being sent:", token);


    // Parse and return the response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    const responseData = await response.json();
    return responseData; // Return the response data
  } catch (error) {
    console.error("Error in postlike:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};



export const postunlike = async (post_id) => {
  try {
    const token = await getToken(); // Retrieve token
    if (!token) {
      throw new Error("Token is missing");
    }

    // Prepare the request payload
    const requestData = {
      content_type: 20, // Fixed value for posts
      object_id: post_id, // Post ID
    };

    // Make the API call
    // const response = await fetch(`${API_ROUTES.UNLIKES}`, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(requestData),
    // });
    const response = await fetch(`${API_ROUTES.UNLIKES}?object_id=${post_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    

    // Parse and return the response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    const responseData = await response.json();
    return responseData; // Return the response data
  } catch (error) {
    console.error("Error in postunlike:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

