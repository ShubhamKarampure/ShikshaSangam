import React from "react";
import { View, Text, Image, StyleSheet} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function ChatScreenHeader({ route }) {
  const chat = route.params.receiver;
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri:
              chat.participants[0].avatar_image !== null
                ? chat.participants[0].avatar_image
                : `https://ui-avatars.com/api/?name=${chat.participants[0].full_name}&background=0D8ABC&color=fff`,
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.username}>{chat.participants[0].full_name}</Text>
          <Text style={styles.status}>{chat.participants[0].status}</Text>
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
