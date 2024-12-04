import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// const AuthContext = createContext();

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuthContext must be used within an AuthProvider');
//   }
//   return context;
// };

// const authSessionKey = '_SS_AUTH_KEY_';

// export const AuthProvider = ({ children }) => {
//   // const navigation = useNavigation();

//   // Retrieve session from AsyncStorage
//   const getSession = async () => {
//     try {
//       const sessionData = await AsyncStorage.getItem(authSessionKey);
//       return sessionData ? JSON.parse(sessionData) : null;
//     } catch (error) {
//       console.error('Error retrieving session:', error);
//       return null;
//     }
//   };

//   const [user, setUser] = useState(null);

//   // Load session on initialization
//   useEffect(() => {
//     const initializeSession = async () => {
//       const session = await getSession();
//       setUser(session);
//     };
//     initializeSession();
//   }, []);

//   // Save session
//   const saveSession = async (sessionData) => {
//     try {
//       await AsyncStorage.setItem('access_token', sessionData.access);
//       await AsyncStorage.setItem('refresh_token', sessionData.refresh);
//       await AsyncStorage.setItem(authSessionKey, JSON.stringify(sessionData.user));
//       setUser(sessionData.user);
      
//     } catch (error) {
//       console.error('Error saving session:', error);
//     }
//   };

//   // Remove session
//   const removeSession = async () => {
//     try {
//       await AsyncStorage.removeItem(authSessionKey);
//       await AsyncStorage.removeItem('access_token');
//       await AsyncStorage.removeItem('refresh_token');
//       setUser(null);
      
//     } catch (error) {
//       console.error('Error removing session:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated: !!user, saveSession, removeSession }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
const authSessionKey = '_SS_AUTH_KEY_';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem(authSessionKey);
      if (sessionData) {
        console.log('Session data retrieved:', JSON.parse(sessionData));// Log session data
        console.log(sessionData.access);
        
        return JSON.parse(sessionData);
      } else {
        console.log('No session found');
        return null;
      }
    } catch (error) {
      console.error("Error retrieving session:", error);
      return null;
    }
  };

  useEffect(() => {
    const initializeSession = async () => {
      const session = await getSession();
      setUser(session);
    };
    initializeSession();
  }, []);

  const saveSession = async (sessionData) => {
    try {
      console.log("Logging user details:", sessionData.user); // Log user details (username, email, etc.)
      console.log("Access Token:", sessionData.access);
      // console.log("Refresh Token:", sessionData.refresh);
      await AsyncStorage.setItem("access_token", sessionData.access);
      await AsyncStorage.setItem("refresh_token", sessionData.refresh);
      await AsyncStorage.setItem(authSessionKey, JSON.stringify(sessionData.user));
      setUser(sessionData.user);
      console.log("session created succesfully");
      
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  const removeSession = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      console.error("Error removing session:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, saveSession, removeSession }}>
      {children}
    </AuthContext.Provider>
  );
};
