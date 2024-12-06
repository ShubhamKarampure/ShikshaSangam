import React, { memo } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import hoursMinutes from "../../../Utility/hoursMinutes";

const ReceiverChatBubble = memo(({ chat, isDarkMode = true }) => {
  // const chat = {
  //   profile_id : 2,
  //   avatar: "https://via.placeholder.com/150/FF5733/FFFFFF",
  //   username: "Alice Johnson",
  //   content:
  //     "JavaScript is the backbone of web development and is increasingly used in mobile app development. Here are some tips to master JavaScript for mobile app development.",
  //   timestamp: "03:59",
  // };

  return (
    <View style={{maxWidth:'100%', backgroundColor:'', minWidth:'50%'}}>
      <Pressable
        style={[styles.container, isDarkMode && styles.darkModeBackground]}
        android_ripple={{ color: "#261d01" }}
      >
        <Image source={{ uri: chat.avatar }} style={styles.avatar} />
        <View
          style={[styles.bubbleContainer, isDarkMode && styles.darkModeBubble]}
        >
          <Text style={[styles.username]}>
            {chat.sender}
          </Text>
          <Text style={[styles.messageText, isDarkMode && styles.darkModeText]}>
            {chat.content}
          </Text>
          <Text
            style={[styles.timestamp, isDarkMode && styles.darkModeTimestamp]}
          >
            {hoursMinutes(chat.timestamp)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
});

export default ReceiverChatBubble;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
    marginHorizontal: 7,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  bubbleContainer: {
    maxWidth: "75%", // Restrict bubble width
    backgroundColor: "#ffffff", // Light background for receiver
    padding: 10,
    borderRadius: 15,
    borderTopLeftRadius: 0, // WhatsApp style bubble (flat left edge)
    //borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // Adds subtle shadow for Android
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e34f05", // "#333",
  },
  messageText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  timestamp: {
    fontSize: 10,
    color: "#666",
    textAlign: "right",
    marginTop: 5,
    marginRight:10,
  },
  darkModeBackground: {
    backgroundColor: "#121212",
  },
  darkModeBubble: {
    backgroundColor: "#2A2A2A", // Darker bubble for dark mode
  },
  darkModeText: {
    color: "#E0E0E0", // Light text in dark mode
  },
  darkModeTimestamp: {
    color: "#888",
  },
});
