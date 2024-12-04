import React from "react";
import { View, Text, Image, StyleSheet} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function ChatScreenHeader({ route }) {
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri:
              route.params.receiver.avatar !== null
                ? route.params.receiver.avatar
                : "https://via.placeholder.com/150",
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.username}>{route.params.receiver.username}</Text>
          <Text style={styles.status}>Online</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212", // Dark theme background
    padding: 5,
    borderBottomWidth: 1,
    paddingHorizontal:30,
    borderRadius:40,
    borderBottomColor: "#1f1f1f", // Subtle separator
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e0e0e0", // Light gray text
  },
  status: {
    fontSize: 12,
    color: "#a0a0a0", // Subdued gray text for status
  },
});
