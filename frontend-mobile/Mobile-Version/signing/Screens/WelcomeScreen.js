// import React, { useState } from "react";
// import { SafeAreaView, StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";
// import { StatusBar } from "expo-status-bar"; // helps us adjust the settings for seeing time battery etc

// export function WelcomeScreen(props) {
//   return (
//     <>
//       <StatusBar style="light" />
//       <SafeAreaView style={styles.Container}>
//         <View style={styles.subContainer}>
//           <Text style={styles.welcomeText}>Welcome to ShikshaSangam!</Text>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={props.onLogin}>
//               <Text style={styles.buttonText}>Login</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={props.onSignUp}>
//               <Text style={styles.buttonText}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#121212",
//   },
//   subContainer: {
//     backgroundColor: "#1c1c1c",
//     padding: 16,
//     borderRadius: 8,
//   },
//   welcomeText: {
//     fontSize: 20,
//     marginBottom: 20,
//     borderWidth: 2,
//     fontStyle: "italic",
//     padding: 8,
//     color: "#dae3e8",
//     backgroundColor: "#123e54",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//   },
// //   button: {
// //     marginHorizontal: 16,
// //     width: 100,
// //   },
//   button: {
//     backgroundColor: "#007bff",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: "center",
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Animated } from "react-native";

export function WelcomeScreen(props) {
  const welcomeOpacity = new Animated.Value(0);

  // Fade-in animation for welcome text
  React.useEffect(() => {
    Animated.timing(welcomeOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.background}>
        <SafeAreaView style={styles.Container}>
          <Animated.View
            style={[styles.subContainer, { opacity: welcomeOpacity }]}
          >
            <Text style={styles.welcomeText}>Welcome to ShikshaSangam</Text>
            <Text style={styles.tagline}>Learn. Connect. Grow.</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={props.onLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={props.onSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#121212", // Base color
  },
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    backgroundColor: "rgba(28, 28, 28, 0.9)", // Semi-transparent to blend with background
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 10,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFCC33",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: "italic",
    textAlign: "center",
    color: "#999",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
    shadowColor: "#007bff",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
