import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MessageCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.messageCard}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.messageName}>{item.name}</Text>
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  messageName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1DA1F2",
  },
  messageText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 5,
  },
  messageTimestamp: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    alignSelf: "flex-end",
  },
});

export default MessageCard;
