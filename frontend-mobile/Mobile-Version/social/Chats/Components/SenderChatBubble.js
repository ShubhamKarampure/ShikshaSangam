import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import hoursMinutes from "../../../Utility/hoursMinutes";
import { processImageUrl } from "../../../Utility/urlUtils";

const SenderChatBubble = memo(({ chat, isDarkMode = true }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        style={[styles.container, isDarkMode && styles.darkModeBackground]}
        android_ripple={{ color: "#261d01" }}
      >
        <View style={[styles.bubble, isDarkMode && styles.darkModeBubble]}>
          {chat.content !== null ? (
            <Text
              style={[styles.messageText, isDarkMode && styles.darkModeText]}
            >
              {chat.content}
            </Text>
          ) : (
            <></>
          )}

          {chat.media !== null ? (
            <Pressable onPress={() => setModalVisible(true)}>
              <Image
                source={{
                  uri: processImageUrl(chat.media, "SenderChatBubble media"),
                }}
                style={styles.postImage}
              />
            </Pressable>
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

      {/* Full-Screen Image Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <MaterialCommunityIcons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          {chat.media !== null ? (
            <Image
              source={{
                uri: processImageUrl(chat.media, "SenderChatBubble modal"),
              }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          ) : (
            <></>
          )}
        </View>
      </Modal>
    </>
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
    width: 220,
    height: 220,
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
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%",
    height: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
});
