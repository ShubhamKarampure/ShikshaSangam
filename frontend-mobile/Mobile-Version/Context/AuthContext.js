import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

  // Retrieve session from AsyncStorage
  const getSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem(authSessionKey);
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      console.error('Error retrieving session:', error);
      return null;
    }
  };

  const [user, setUser] = useState(null);

  // Load session on app start
  React.useEffect(() => {
    const initializeSession = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user);
      }
    };
    initializeSession();
  }, []);

  // Save session to AsyncStorage
  const saveSession = async (sessionData) => {
    try {
      await AsyncStorage.setItem('access_token', sessionData.access);
      await AsyncStorage.setItem('refresh_token', sessionData.refresh);
      await AsyncStorage.setItem(authSessionKey, JSON.stringify(sessionData.user));
      setUser(sessionData.user);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  // Remove session from AsyncStorage
  const removeSession = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      await AsyncStorage.removeItem(authSessionKey);
      setUser(null);
      navigation.navigate('Settings'); 
    } catch (error) {
      console.error('Error removing session:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        saveSession,
        removeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
