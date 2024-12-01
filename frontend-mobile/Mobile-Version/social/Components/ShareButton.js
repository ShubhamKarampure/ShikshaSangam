import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ShareButton = ({ isDarkMode, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons
        name="share-outline"
        size={32}
        color={isDarkMode ? "#fff" : "#000"}
      />
      <Text
        style={[
          styles.actionText,
          isDarkMode ? styles.textDarkSecondary : styles.textLight,
        ]}
      >
        Share
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //padding: 8,
    //backgroundColor:'green',
  },
  actionText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  textDarkSecondary: {
    color: "#aaa",
  },
  textLight: {
    color: "#000",
  },
});

export default ShareButton;
