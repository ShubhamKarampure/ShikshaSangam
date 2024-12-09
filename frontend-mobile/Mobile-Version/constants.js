
//yourIp = "172.16.61.169"; // Give your IP for identifying where backend is running to mobile
 // Give your IP for identifying where backend is running to mobile

//import { YOUR_IP } from "@env";

YOUR_IP = "192.168.1.5";

const BACKEND_URL = "http://" + YOUR_IP + ":8000";

export const CHATSCREEN_POOLING = 10000;
export const MESSAGESCREEN_POOLING = 6000;

export default BACKEND_URL;

export const API_ROUTES = {
    CHAT_LIST: `${BACKEND_URL}/multimedia/chats/`, // List all chats
    CHAT_CREATE: `${BACKEND_URL}/multimedia/chats/create/`, // Create a new chat
    MESSAGE_LIST: (chatId) => `${BACKEND_URL}/multimedia/chats/${chatId}/messages/`, // List messages
    MESSAGE_CREATE: (chatId) => `${BACKEND_URL}/multimedia/chats/${chatId}/messages/create/`, // Send a message
    CHAT_CLEAR: (chatId) => `${BACKEND_URL}/multimedia/chats/${chatId}/clear/`, // Clear messages
    // User-related routes
    USERS: `${BACKEND_URL}/users/account/`, // Users listing, CRUD
    REGISTER: `${BACKEND_URL}/users/auth/register/`, // Register user
    LOGIN: `${BACKEND_URL}/users/auth/login/token`, // User login (JWT)
    REFRESH: `${BACKEND_URL}/users/auth/token/refresh`, // Token refresh
    LOGOUT: `${BACKEND_URL}/users/auth/signout/`, // User logout

    // College-related routes
    COLLEGE: `${BACKEND_URL}/users/colleges/`, // College listing, CRUD

    // Profile-related routes
    USERPROFILE: `${BACKEND_URL}/users/user-profile/`, // user Profile CRUD
    ALUMNIPROFILE: `${BACKEND_URL}/users/alumnus-profiles/`, // Alumnus Profile CRUD
    STUDENTPROFILE: `${BACKEND_URL}/users/student-profiles/`, // Student Profile CRUD
    COLLEGEADMINPROFILE: `${BACKEND_URL}/users/college-admin/`, // College Admin Profile CRUD
    COLLEGESTAFFPROFILE: `${BACKEND_URL}/users/college-staff-profiles/`, // College Staff Profile CRUD

    POSTS: `${BACKEND_URL}/social/posts/`,
    COLLEGE_POSTS: `${BACKEND_URL}/social/posts/college_posts/`,
    COMMENTS: `${BACKEND_URL}/social/comments/`,
    LIKES: `${BACKEND_URL}/social/likes/`,
    UNLIKES:`${BACKEND_URL}/social/likes/unlike/`,
    FOLLOWS: `${BACKEND_URL}/social/followers/`,
    FOLLOWERS: `${BACKEND_URL}/social/follows/followers/`,
    FOLLOWING: `${BACKEND_URL}/social/follows/following/`,
    USERS_TO_FOLLOW: `${BACKEND_URL}/social/followers/userstofollow/`,
    SHARES: `${BACKEND_URL}/social/shares/`,
    POLLS: `${BACKEND_URL}/social/polls/`,
    POLL_OPTIONS: `${BACKEND_URL}/social/polls/options/`,
    POLL_VOTES: `${BACKEND_URL}/social/polls/votes/`,

    CHAT_LIST: `${BACKEND_URL}/multimedia/chats/`, // List all chats for the user
    CHAT_CREATE: `${BACKEND_URL}/multimedia/chats/create/`, // Create a new chat
    MESSAGE_LIST: (chatId) => `${BACKEND_URL}/multimedia/chats/${chatId}/messages/`, // List messages for a specific chat
    MESSAGE_CREATE: (chatId) => `${BACKEND_URL}/multimedia/chats/${chatId}/messages/create/`, // Send a message or media in a chat
    CHAT_CLEAR: (chatId) => `${BACKEND_URL}/multimedia/chats/${chatId}/clear/`, // Clear all messages in a chat

    UPLOAD_CSV: `${BACKEND_URL}/users/upload-user-data/`, // Upload CSV file
    ALL_POSTS: `${BACKEND_URL}/social/posts/list_posts`,     ////////////////////////////////////////// check again
    FEED: `${BACKEND_URL}/social/posts/college_posts`, // Feed
    COMMENT: `${BACKEND_URL}/social/comments/`, // Comment
    REPLY: `${BACKEND_URL}/social/replies/`, // Reply
};
