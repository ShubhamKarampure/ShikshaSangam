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
};
