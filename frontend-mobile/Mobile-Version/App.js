import "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, Button, View } from "react-native";
import { StatusBar } from "expo-status-bar"; // helps us adjust the settings for seeing time battery etc
import SignUpScreen from "./signing/Screens/SignUpScreen";
import LoginScreen from "./signing/Screens/LoginScreen";
import { WelcomeScreen } from "./signing/Screens/WelcomeScreen";

import { GlobalProvider } from "./Context/GlobalProvider";

export default function App() {
  const [clickedLoggedIn, setClickedLoggedIn] = useState(false); // Track login state
  const [isSignUp, setIsSignUp] = useState(false); // Track signup state

  const returnFromSignUp = () => setIsSignUp(false);
  const returnFromLogin = () => setClickedLoggedIn(false);
  const setSignUpFromWelcome = () => setIsSignUp(true);
  const setClickedLoginInFromWelcome = () => setClickedLoggedIn(true);

  return (
    <GlobalProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        {clickedLoggedIn ? (
          // Render the main navigation if logged in
          // <NavigationSocial />
          <LoginScreen onBack={returnFromLogin} />
        ) : isSignUp ? (
          // Render the sign-up screen if isSignUp is true
          <SignUpScreen onBack={returnFromSignUp} />
        ) : (
          // Render the login screen if neither logged in nor signing up
          <WelcomeScreen
            onLogin={setClickedLoginInFromWelcome}
            onSignUp={setSignUpFromWelcome}
          />
        )}
      </SafeAreaView>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
