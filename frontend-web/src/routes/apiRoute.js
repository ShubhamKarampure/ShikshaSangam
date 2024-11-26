const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const API_ROUTES = {
    // Login-related routes
    REGISTER: `${API_BASE_URL}/users/auth/registration/`,
    LOGIN: `${API_BASE_URL}/users/auth/login/`,
    LOGOUT: `${API_BASE_URL}/users/logout/`,
};
