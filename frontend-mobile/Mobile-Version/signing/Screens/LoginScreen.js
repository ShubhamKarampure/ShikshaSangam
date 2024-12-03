import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NavigationSocial from "../../social/NavigationSocial";
import signin from "../../api/auth";
import {AuthProvider, useAuthContext} from "../../Context/useAuthContext";


export default function LoginScreen(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const {saveSession} = useAuthContext();

  const handleSignIn = async () => {
    try {
      const data = {
        username: usernameOrEmail, // or email
       password: password,
      };
      const response = await signin(data);
      console.log("Login Response:", response);

      // Save tokens or user info as needed
      // Example: AsyncStorage.setItem("accessToken", response.access);
      await saveSession({
        user: response.user,
        access: response.access,
        refresh: response.refresh,
      })

      setIsSignedIn(true); // Navigate to next screen
      
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert(
        "Login Failed",
        error.response?.data?.detail || "Something went wrong."
      );
    }
  };

  return isSignedIn ? (
    // <AuthProvider>
    <NavigationSocial />
    // </AuthProvider>
  ) : (
    <>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.loginContainer}>
            <Text style={styles.header}>Login</Text>

            <TouchableOpacity>
              <Text style={styles.subHeader}>
                Don’t have an account?{" "}
                <Text style={styles.linkText}>Sign up here</Text>
              </Text>
            </TouchableOpacity>

            {/* Form Fields */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your username or email"
                placeholderTextColor="#888"
                value={usernameOrEmail}
                onChangeText={setUsernameOrEmail}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.iconContainer}
                >
                  <Icon
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Button Container */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={props.onBack}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  loginContainer: {
    backgroundColor: "#2d2e2e",
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 14,
    color: "#bbb",
    textAlign: "center",
    marginBottom: 30,
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
    padding: 10,
    fontSize: 14,
  },
  iconContainer: {
    padding: 10,
  },
  forgotPassword: {
    color: "#007bff",
    textAlign: "right",
    textDecorationLine: "underline",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
