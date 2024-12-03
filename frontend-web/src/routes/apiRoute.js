import { Feed } from "@mui/icons-material";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const API_ROUTES = {
  // User-related routes
  USERS: `${API_BASE_URL}/users/account/`, // Users listing, CRUD
  REGISTER: `${API_BASE_URL}/users/auth/register/`, // Register user
  LOGIN: `${API_BASE_URL}/users/auth/login/token`, // User login (JWT)
  REFRESH: `${API_BASE_URL}/users/auth/token/refresh`, // Token refresh
  LOGOUT: `${API_BASE_URL}/users/auth/logout/`, // User logout
  
  // College-related routes
  COLLEGE: `${API_BASE_URL}/users/colleges/`, // College listing, CRUD
  
  // Profile-related routes
  USERPROFILE: `${API_BASE_URL}/users/user-profile/`, // Alumnus Profile CRUD
  ALUMNIPROFILE: `${API_BASE_URL}/users/alumnus-profiles/`, // Alumnus Profile CRUD
  STUDENTPROFILE: `${API_BASE_URL}/users/student-profiles/`, // Student Profile CRUD
  COLLEGEADMINPROFILE: `${API_BASE_URL}/users/college-admin/`, // College Admin Profile CRUD
  COLLEGESTAFFPROFILE: `${API_BASE_URL}/users/college-staff-profiles/`, // College Staff Profile CRUD

  POSTS: `${API_BASE_URL}/social/posts/`,
  COLLEGE_POSTS: `${API_BASE_URL}/social/posts/college_posts/`,
  COMMENTS: `${API_BASE_URL}/social/comments/`,
  LIKES: `${API_BASE_URL}/social/likes/`,
  FOLLOWS: `${API_BASE_URL}/social/followers/`,
  FOLLOWERS: `${API_BASE_URL}/social/follows/followers/`,
  FOLLOWING: `${API_BASE_URL}/social/follows/following/`,
  USERS_TO_FOLLOW: `${API_BASE_URL}/social/followers/userstofollow/`,
  SHARES: `${API_BASE_URL}/social/shares/`,
  POLLS: `${API_BASE_URL}/social/polls/`,
  POLL_OPTIONS: `${API_BASE_URL}/social/polls/options/`,
  POLL_VOTES: `${API_BASE_URL}/social/polls/votes/`,

  CHAT_LIST: `${API_BASE_URL}/multimedia/chats/`, // List all chats for the user
  CHAT_CREATE: `${API_BASE_URL}/multimedia/chats/create/`, // Create a new chat
  MESSAGE_LIST: (chatId) => `${API_BASE_URL}/multimedia/chats/${chatId}/messages/`, // List messages for a specific chat
  MESSAGE_CREATE: (chatId) => `${API_BASE_URL}/multimedia/chats/${chatId}/messages/create/`, // Send a message in a chat

  UPLOAD_CSV: `${API_BASE_URL}/users/upload-user-data/`, // Upload CSV file
  FEED: `${API_BASE_URL}/social/posts/college_posts`, // Feed
  COMMENT: `${API_BASE_URL}/social/comments/`, // Comment
}
