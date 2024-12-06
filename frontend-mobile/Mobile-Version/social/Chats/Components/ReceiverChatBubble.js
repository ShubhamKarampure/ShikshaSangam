import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import hoursMinutes from "../../../Utility/hoursMinutes";
import { processImageUrl, defaultAvatar } from "../../../Utility/urlUtils";

const ReceiverChatBubble = memo(({ chat, isDarkMode = true }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ maxWidth: "100%", backgroundColor: "", minWidth: "50%" }}>
      <Pressable
        style={[styles.container, isDarkMode && styles.darkModeBackground]}
        android_ripple={{ color: "#261d01" }}
      >
        <Image
          source={{
            uri:
              chat.avatar !== null
                ? processImageUrl(chat.avatar)
                : defaultAvatar(chat.sender),
          }}
          style={styles.avatar}
        />
        <View
          style={[styles.bubbleContainer, isDarkMode && styles.darkModeBubble]}
        >
          <Text style={[styles.username]}>{chat.sender}</Text>
          {chat.content !== null ? (
            <Text
              style={[styles.messageText, isDarkMode && styles.darkModeText]}
            >
              {chat.content}
            </Text>
          ) : null}

          {chat.media !== null ? (
            <Pressable onPress={() => setModalVisible(true)}>
              <Image
                source={{
                  uri: processImageUrl(chat.media),
                }}
                style={styles.postImage}
              />
            </Pressable>
          ) : null}

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
          <Image
            source={{
              uri: processImageUrl(chat.media),
            }}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
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
  postImage: {
    width: 250,
    height: 250,
    marginVertical: 10,
    borderRadius: 10,
  },
  bubbleContainer: {
    maxWidth: "75%", // Restrict bubble width
    backgroundColor: "#ffffff", // Light background for receiver
    padding: 10,
    borderRadius: 15,
    borderTopLeftRadius: 0, // WhatsApp style bubble (flat left edge)
    borderBottomRightRadius: 30,
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
    marginRight: 10,
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
