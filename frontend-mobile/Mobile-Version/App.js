import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, Button } from "react-native";
import NavigationSocial from "./social/NavigationSocial";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        // Render the main navigation if logged in
        <NavigationSocial />
      ) : (
        // Render a login screen or a placeholder if not logged in
        <SafeAreaView style={styles.loginContainer}>
          <Text style={styles.welcomeText}>Welcome to the ShiksaSangam!</Text>
          <Button title="Login" onPress={() => setIsLoggedIn(true)} />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the content takes the full height of the screen
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
});
