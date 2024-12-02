import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "@/utils/get-token";

export const getAllFeed = async () => {
  const token = getTokenFromCookie(); // Retrieve token from cookie
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

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
  } else {
    console.log("Got all posts");
  }

  const res = await response.json();
  const postsArray = [];

  res.forEach((p) => {
    // Check if media or avatar is a CloudinaryResource or a simple string
    const imageUrl = p.post.media
?`https://res.cloudinary.com/${cloudName}/${p.post.media}`:null 

    const avatarUrl = p.user.avatar
      ? p.user.avatar
      : "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Fallback default avatar URL

    const postObj = {
      createdAt: p.post_stats.time_since_post,
      likesCount: p.post_stats.likes,
      caption: p.post.content,
      commentsCount: p.comments_count,
      image: imageUrl,
      socialUser: {
        avatar: avatarUrl,
        name: p.user.username,
      },
    };

    postsArray.push(postObj);
  });

  return postsArray;
};
