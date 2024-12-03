import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SignUpScreen(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  return (
    <>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.signUpContainer}>
            <Text style={styles.header}>Sign Up</Text>
            <TouchableOpacity>
              <Text style={styles.subHeader}>
                Already have an account?{" "}
                <Text style={styles.linkText}>Sign in here</Text>
              </Text>
            </TouchableOpacity>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressCircle, styles.activeStep]}>
                <Text style={styles.progressText}>1</Text>
              </View>
              <View style={styles.progressLine} />
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>2</Text>
              </View>
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>General</Text>
              <Text style={styles.progressLabel}>Specific</Text>
            </View>

            {/* Form Fields */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#888"
              />
               <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#888"
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter new password"
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#888"
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
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm password"
                  secureTextEntry={!showConfirmPassword}
                  placeholderTextColor="#888"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.iconContainer}
                >
                  <Icon
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Next Button and Back */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={props.onBack}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
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
  signUpContainer: {
    backgroundColor: "#2d2e2e",
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    color: "#bbb",
    textAlign: "center",
    marginBottom: 20,
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  progressCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    borderColor: "#007bff",
    backgroundColor: "#007bff",
  },
  progressText: {
    color: "#fff",
    fontWeight: "bold",
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: "#888",
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 60,
  },
  progressLabel: {
    color: "#bbb",
    fontSize: 12,
  },
  inputContainer: {
    marginTop: 20,
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
    marginBottom: 15,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
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
