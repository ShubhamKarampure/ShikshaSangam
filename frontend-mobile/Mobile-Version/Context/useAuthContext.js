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
      console.log("Retrieved session data:", sessionData); // Log session
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      console.error("Error retrieving session:", error);
      return null;
    }
  };
  

  // useEffect(() => {
  //   const initializeSession = async () => {
  //     const session = await getSession();
  //     setUser(session);
  //   };
  //   initializeSession();
  // }, []);
  useEffect(() => {
    const initializeSession = async () => {
      const session = await getSession();
      setUser(session?.user || null); // Set null if no session is found
    };
    initializeSession();
  }, []);
  

  const saveSession = async (sessionData) => {
    try {
      console.log("Saving session for user:", sessionData.user); // Log the user data
  
      // Clear any existing session before saving
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', authSessionKey]);
  
      // Save new session data
      await AsyncStorage.setItem('access_token', sessionData.access);
      await AsyncStorage.setItem('refresh_token', sessionData.refresh);
      await AsyncStorage.setItem(authSessionKey, JSON.stringify(sessionData));
      
      setUser(sessionData.user);
      // console.log("Session saved successfully.");
       // Log the saved tokens
    const savedAccessToken = await AsyncStorage.getItem('access_token');
    const savedRefreshToken = await AsyncStorage.getItem('refresh_token');
    console.log("After Login - Access Token:", savedAccessToken);
    console.log("After Login - Refresh Token:", savedRefreshToken);
    console.log("Session saved successfully.");
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };
  
  const removeSession = async () => {
    try {
      console.log('Removing session...');
      await AsyncStorage.removeItem(authSessionKey);
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      setUser(null); // Clear user state
      console.log('Session removed successfully.');
    } catch (error) {
      console.error('Error removing session:', error);
    }
  };

  // const logTokensBeforeLogin = async () => {
  //   const accessToken = await AsyncStorage.getItem('access_token');
  //   const refreshToken = await AsyncStorage.getItem('refresh_token');
  //   const session = await AsyncStorage.getItem('_SS_AUTH_KEY_');
  
  //   console.log("Before Login - Access Token:", accessToken);
  //   console.log("Before Login - Refresh Token:", refreshToken);
  //   console.log("Before Login - Session:", session);
  // };
  const clearTokensOnAppStart = async () => {
    try {
      await AsyncStorage.multiRemove(["access_token", "refresh_token", "_SS_AUTH_KEY_"]);
      console.log("Tokens cleared on app start");
    } catch (error) {
      console.error("Error clearing tokens on app start:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, saveSession, removeSession,clearTokensOnAppStart }}>
      {children}
    </AuthContext.Provider>
  );
};
