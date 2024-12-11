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

// 1. **Fetch Posts**
export const fetchPosts = async () => {
  return await handleFetch(API_ROUTES.POSTS, "GET");
};

// 2. **Fetch College Posts (for the current user's college)**
export const fetchCollegePosts = async () => {
  return await handleFetch(API_ROUTES.COLLEGE_POSTS, "GET");
};

// 3. **Create a Post**
export const createPost = async (postData) => {
  const token=getTokenFromCookie()
  if(!token){
    console.log();   
  }
  const response = await fetch(`${API_ROUTES.POSTS}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: postData, // FormData instance
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user post');
  }

  return response.json();
};

// 4. **Fetch Comments**
export const fetchComments = async () => {
  return await handleFetch(API_ROUTES.COMMENTS, "GET");
};

// 5. **Create a Comment**
export const createComment = async (commentData) => {
  return await handleFetch(API_ROUTES.COMMENTS, "POST", commentData);
};

// 6. **Fetch Likes**
export const fetchLikes = async () => {
  return await handleFetch(API_ROUTES.LIKES, "GET");
};

// 7. **Follow User**
export const followUser = async (followData) => {
  return await handleFetch(API_ROUTES.FOLLOWS, "POST", followData);
};

// 8. **Get Followers**
export const fetchFollowers = async () => {
  return await handleFetch(API_ROUTES.FOLLOWERS, "GET");
};

// 9. **Get Following**
export const fetchFollowing = async () => {
  return await handleFetch(API_ROUTES.FOLLOWING, "GET");
};

// 10. **Get Users to Follow (who are not followed yet)**
export const fetchUsersToFollow = async () => {
  return await handleFetch(API_ROUTES.USERS_TO_FOLLOW, "GET");
};

// 11. **Create a Share**
export const createShare = async (shareData) => {
  return await handleFetch(API_ROUTES.SHARES, "POST", shareData);
};

// 12. **Fetch Polls**
export const fetchPolls = async () => {
  return await handleFetch(API_ROUTES.POLLS, "GET");
};

// 13. **Create a Poll**
export const createPoll = async (pollData) => {
  return await handleFetch(API_ROUTES.POLLS, "POST", pollData);
};

// 14. **Fetch Poll Options**
export const fetchPollOptions = async () => {
  return await handleFetch(API_ROUTES.POLL_OPTIONS, "GET");
};

// 15. **Create Poll Option**
export const createPollOption = async (pollOptionData) => {
  return await handleFetch(API_ROUTES.POLL_OPTIONS, "POST", pollOptionData);
};

// 16. **Fetch Poll Votes**
export const fetchPollVotes = async () => {
  return await handleFetch(API_ROUTES.POLL_VOTES, "GET");
};

// 17. **Create Poll Vote**
export const createPollVote = async (pollVoteData) => {
  return await handleFetch(API_ROUTES.POLL_VOTES, "POST", pollVoteData);
};




