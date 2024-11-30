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

  // social-related routes
  POSTS: `${API_BASE_URL}/posts/`,
  COLLEGE_POSTS: `${API_BASE_URL}/posts/college_posts/`,
  COMMENTS: `${API_BASE_URL}/comments/`,
  LIKES: `${API_BASE_URL}/likes/`,
  FOLLOWS: `${API_BASE_URL}/follows/`,
  FOLLOWERS: `${API_BASE_URL}/follows/followers/`,
  FOLLOWING: `${API_BASE_URL}/follows/following/`,
  USERS_TO_FOLLOW: `${API_BASE_URL}/follows/userstofollow/`,
  SHARES: `${API_BASE_URL}/shares/`,
  POLLS: `${API_BASE_URL}/polls/`,
  POLL_OPTIONS: `${API_BASE_URL}/polloptions/`,
  POLL_VOTES: `${API_BASE_URL}/pollvotes/`,
};
