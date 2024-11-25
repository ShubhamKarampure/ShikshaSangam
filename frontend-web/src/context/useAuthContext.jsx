import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie, deleteCookie, hasCookie } from 'cookies-next';

const AuthContext = createContext(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

const authSessionKey = '_SS_AUTH_KEY_';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Retrieve session from cookies
  const getSession = () => {
    const cookieData = getCookie(authSessionKey);
    return cookieData ? JSON.parse(cookieData) : null;
  };

  const [user, setUser] = useState(getSession());

  // Save session
  const saveSession = (sessionData) => {
    setCookie(authSessionKey, JSON.stringify(sessionData));
    setUser(sessionData.user);
  };

  // Remove session
  const removeSession = () => {
    deleteCookie(authSessionKey);
    setUser(null);
    navigate('/auth/sign-in');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: hasCookie(authSessionKey), saveSession, removeSession }}>
      {children}
    </AuthContext.Provider>
  );
};
