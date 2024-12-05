import { API_ROUTES } from "../routes/apiRoute";
import { getTokenFromCookie } from "@/utils/get-token";

export const getComment = async (postId) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

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
  } else {
    console.log("Got all comments");
  }
  const res = await response.json();

  const formattedComments = res.results.map((c) => ({
    comment: c.comment.content,
    createdAt: c.comment.created_at,
    socialUser: {
      avatar:
        c.user.avatar ||
        "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: c.user.username,
    },
    likesCount: c.likes_count,
    commentId: c.comment.id,
    children: [],
    is_liked: c.is_liked,
  }));
  return formattedComments;
};

export const postComment = async (postId, profile_id, data) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const comment = {
    post: postId,
    userprofile: profile_id,
    content: data,
  };
  console.log(comment);

  if (!token) {
    throw new Error("Token is missing");
  }
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
  } else {
    console.log("Got all comments");
  }
  const res = await response.json();

  return res.results;
};

export const postReply = async (profile_id, commentId, data) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie

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
    console.log("Error in posting reply");
    throw new Error(`Error: ${response.status}`);
  } else {
    console.log("reply posted succesfully");
  }
};

export const getReply = async (commentId) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie
  if (!token) {
    throw new Error("Token is missing");
  }
  const response = await fetch(
    `${API_ROUTES.REPLY}comment_replies/${commentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  } else {
    console.log("Got all replies");
  }
  const res = await response.json();
  console.log(res.results);

  const replies = res.results.forEach((reply) => {
    console.log(reply);
  });
  const formattedreplies = res.results.map((r) => ({
    replyId: r.reply.id, // Reply ID
    comment: r.reply.content, // Reply content
    createdAt: r.reply.created_at, // Creation date
    socialUser: {
      avatar: r.user.avatar, // User's avatar URL
      name: r.user.username, // Username
    },
    likesCount: r.likes_count, // Likes count
    is_liked: r.is_liked, // Whether the user has liked the reply
  }));
  return formattedreplies;
};

export const getAllFeed = async (limit = 3, offset = 0) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!token) {
    throw new Error("Token is missing");
  }

  const response = await fetch(
    `${API_ROUTES.FEED}?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  } else {
    console.log("Got all posts");
  }

  const res = await response.json();
  const postsArray = [];
  // console.log(res);

  const postsWithComments = await Promise.all(
    res.results.map(async (p) => {
      const imageUrl = p.post.media
        ? `https://res.cloudinary.com/${cloudName}/${p.post.media}`
        : null;

      const avatarUrl = p.user.avatar
        ? p.user.avatar
        : "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Fallback default avatar URL

      let comments = [];
      // try {
      //   comments = await getComment(p.post.id);
      // } catch (err) {
      //   console.error(`Error fetching comments for post ID ${p.post.id}:`, err);
      // }

      return {
        postId: p.post.id,
        createdAt: p.post_stats.time_since_post,
        likesCount: p.post_stats.likes,
        caption: p.post.content,
        commentsCount: p.comments_count,
        comments: comments,
        image: imageUrl,
        socialUser: {
          avatar: avatarUrl,
          name: p.user.username,
        },
        bio: p.user.bio,
        is_liked: p.is_liked,
      };
    })
  );
  console.log(postsArray);

  postsArray.push(...postsWithComments);
  return postsArray;
};

export const likeContent = async (postId,userprofile,content_type) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie
  const body = {
    userprofile,
    content_type,
    object_id: postId,
  };
  if (!token) {
    throw new Error("Token is missing");
  }
  
  const response = await fetch(`${API_ROUTES.LIKES}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  } else {
    console.log("Post liked");
  }
};

export const unlikeContent = async (postId,content_type) => {
  const token = getTokenFromCookie(); // Retrieve token from cookie
  const body = {
    content_type,
    object_id: postId,
  };
  if (!token) {
    throw new Error("Token is missing");
  }

  const response = await fetch(`${API_ROUTES.UNLIKE}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  } else {
    console.log("Post unliked");
  }
};
