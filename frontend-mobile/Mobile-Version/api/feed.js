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

  const response = await fetch(`${API_ROUTES.COMMENT}post_comments/${postId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const res = await response.json();
  return res.results.map((c) => ({
    comment: c.comment.content,
    createdAt: c.comment.created_at,
    socialUser: {
      avatar:
        c.user.avatar ||
        "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: c.user.username,
    },
    commentId: c.comment.id,
    children: [],
  }));
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

  const response = await fetch(`${API_ROUTES.COMMENT}`, {
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
  return res.results;
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
  return res.results.map((r) => ({
    replyId: r.reply.id,
    comment: r.reply.content,
    createdAt: r.reply.created_at,
    socialUser: {
      avatar: r.user.avatar,
      name: r.user.username,
    },
    likesCount: r.likes_count,
  }));
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
  // const cloudName = CLOUDINARY_CLOUD_NAME;
  // const postsArray = []; // Initialize the array to store posts with comments

  //console.log(res);
  //console.log('Seperator');

  // Map posts and fetch associated comments
  // const postsWithComments = await Promise.all(
  //   res.results.map(async (p) => {
  //     const imageUrl = p.post.media
  //       ? `https://res.cloudinary.com/${cloudName}/${p.post.media}`
  //       : null;

  //     const avatarUrl = p.user.avatar
  //       ? p.user.avatar
  //       : "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Default avatar URL

  //     // let comments = [];
  //     // try {
  //     //   comments = await getComment(p.post.id);
  //     // } catch (err) {
  //     //   console.error(`Error fetching comments for post ID ${p.post.id}:`, err);
  //     // }

      

      
  //   })
  // );

  // Add all posts with comments to the array
  //postsArray.push(...postsWithComments);

  // Return the final array
  //return postsArray;
  return res;
};

