
import AsyncStorage from "@react-native-async-storage/async-storage";

yourIp = "192.168.1.5" // Give your IP for identifying where backend is running to mobile
const BACKEND_URL = "http://"+yourIp+":8000"; 


export const API_ROUTES = {
  COMMENT: `${BACKEND_URL}/comments/`,
  FEED: `${BACKEND_URL}/feed`,
};



export const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (e) {
    console.error("Failed to fetch the token:", e);
    return null;
  }
};

export const getComment = async (postId) => {
    const token = await getTokenFromStorage();
  
    if (!token) throw new Error("Token is missing");
  
    const response = await fetch(`${API_ROUTES.COMMENT}post_comments/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) throw new Error(`Error: ${response.status}`);
  
    const res = await response.json();
    return res.results;
  };
  
  export const postComment = async (postId, profileId, content) => {
    const token = await getTokenFromStorage();
  
    if (!token) throw new Error("Token is missing");
  
    const response = await fetch(API_ROUTES.COMMENT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: postId,
        userprofile: profileId,
        content,
      }),
    });
  
    if (!response.ok) throw new Error(`Error: ${response.status}`);
  
    const res = await response.json();
    return res.results;
  };
  

  export const getAllFeed = async () => {
    const token = await getTokenFromStorage();
    const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
  
    if (!token) throw new Error("Token is missing");
  
    const response = await fetch(API_ROUTES.FEED, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) throw new Error(`Error: ${response.status}`);
  
    const res = await response.json();
  
    const postsWithComments = await Promise.all(
      res.map(async (p) => {
        const imageUrl = p.post.media
          ? `https://res.cloudinary.com/${cloudName}/${p.post.media}`
          : null;
  
        const avatarUrl = p.user.avatar || "default-avatar-url";
  
        let comments = [];
        try {
          comments = await getComment(p.post.id);
        } catch (err) {
          console.error(`Error fetching comments for post ID ${p.post.id}:`, err);
        }
  
        const formattedComments = comments.map((c) => ({
          comment: c.comment.content,
          createdAt: c.comment.created_at,
          socialUser: {
            avatar: c.user.avatar || "default-avatar-url",
            name: c.user.username,
          },
        }));
  
        return {
          postId: p.post.id,
          createdAt: p.post_stats.time_since_post,
          likesCount: p.post_stats.likes,
          caption: p.post.content,
          commentsCount: p.comments_count,
          comments: formattedComments,
          image: imageUrl,
          socialUser: {
            avatar: avatarUrl,
            name: p.user.username,
          },
          bio: p.user.bio,
        };
      })
    );
  
    return postsWithComments;
  };
  

