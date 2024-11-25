const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const API_ROUTES = {
    // Login-related routes
    REGISTER: `${API_BASE_URL}/register/`,
    LOGIN: `${API_BASE_URL}/login/`,
    LOGOUT: `${API_BASE_URL}/logout/`,
};
