import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import timePassed from "../../../Utility/timePassed";

const MessageCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.messageCard}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.mainHeader}>
        <Image
          source={{ uri: item.participants[0].avatar_image }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={[styles.username, styles.darkModeText]}>
            {item.participants[0].full_name}
          </Text>
        </View>
        <Text style={styles.timeStamp}>
          {timePassed(item.last_message.timestamp, new Date().toISOString())}
        </Text>
      </View>

      <Text style={styles.messageText}>{item.last_message.content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageCard: {
    backgroundColor: "#2a2a2a", // Slightly brighter for contrast
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderColor: "#1DA1F2", // Optional outline for the avatar
    borderWidth: 1,
  },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#444",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    flex: 1, // Ensures it takes available space
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  timeStamp: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-start", // Align to the top for a cleaner look
  },
  messageText: {
    fontSize: 14,
    color: "#cccccc",
    lineHeight: 20,
  },
  darkModeText: {
    color: "#e0e0e0",
  },
});

export default MessageCard;

