const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const API_ROUTES = {
    // Login-related routes
    REGISTER: `${API_BASE_URL}/users/auth/register/`,
    LOGIN: `${API_BASE_URL}/users/auth/login/token`,
    REFRESH: `${API_BASE_URL}/users/auth/token/refresh`,
    LOGOUT: `${API_BASE_URL}/users/auth/logout/`,
    COLLEGE: `${API_BASE_URL}/users/colleges/`,
    ALUMNIPROFILE: `${API_BASE_URL}/users/alumnus-profiles/`,
    STUENTPROFILE: `${API_BASE_URL}/users/student-profiles/`,
    COLLEGEADMINPROFILE: `${API_BASE_URL}/users/college-admin/`,
    COLLEGESTAFFPROFILE: `${API_BASE_URL}/users/college-staff-profiles/`,
};
