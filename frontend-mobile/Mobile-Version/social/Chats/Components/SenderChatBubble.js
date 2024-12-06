import React, { memo } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import hoursMinutes from "../../../Utility/hoursMinutes";
import { processImageUrl } from "../../../Utility/urlUtils";


const SenderChatBubble = memo(({ chat, isDarkMode = true }) => {
  // const chat = {
  //   profile_id: 1,
  //   avatar: "https://via.placeholder.com/150/FF5733/FFFFFF",
  //   username: "John Doe",
  //   content:
  //     "React Native is an exciting framework for building mobile apps using JavaScript. It allows developers to use the same codebase for both Android and iOS.",
  //   timestamp: "03:53",
  // };

  return (
    <Pressable
      style={[styles.container, isDarkMode && styles.darkModeBackground]}
      android_ripple={{ color: "#261d01" }}
    >
      <View style={[styles.bubble, isDarkMode && styles.darkModeBubble]}>
        {chat.content !== null ? (
          <Text style={[styles.messageText, isDarkMode && styles.darkModeText]}>
            {chat.content}
          </Text>
        ) : (
          <></>
        )}
        {chat.media !== null ? (
          <Image
            source={{
              uri: processImageUrl(chat.media),
            }}
            style={styles.postImage}
          />
        ) : (
          <></>
        )}

        <Text
          style={[styles.timestamp, isDarkMode && styles.darkModeTimestamp]}
        >
          {hoursMinutes(chat.timestamp)}
        </Text>
      </View>
    </Pressable>
  );
});

export default SenderChatBubble;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align to the right
    marginVertical: 5,
    marginHorizontal: 7,
  },
  bubble: {
    maxWidth: "75%", // Restrict bubble width
    backgroundColor: "#DCF8C6", // WhatsApp-like green for sender
    padding: 10,
    //paddingRight:20,
    borderRadius: 15,
    borderTopRightRadius: 0, // WhatsApp style bubble
    borderBottomLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // Adds a subtle shadow for Android
  },
  postImage: {
    width: 250,
    height: 250,
    marginVertical: 10,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 14,
    color: "#000",
    paddingRight: 20,
  },
  timestamp: {
    fontSize: 10,
    color: "#666",
    textAlign: "right",
    marginTop: 5,
    //backgroundColor:'yellow',
  },
  darkModeBackground: {
    backgroundColor: "#121212",
  },
  darkModeBubble: {
    backgroundColor: "#2A2A2A", // A darker shade for dark mode
  },
  darkModeText: {
    color: "#E0E0E0",
  },
  darkModeTimestamp: {
    color: "#888",
  },
});
