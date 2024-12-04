import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";

const ViewRepliesButton = ({ comment, isDarkMode, onPress }) => {
  // Only render if replyCount > 0
  if (!comment.replyCount || comment.replyCount === 0) {
    return <></>;
  }

  // Determine button text based on reply count
  const replyText =
    comment.replyCount === 1
      ? "View 1 reply"
      : `View ${comment.replyCount} replies`;

  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      android_ripple={{ color: "#2b2b04" }}
    >
      <Text
        style={[
          styles.buttonText,
          isDarkMode ? styles.textDark : styles.textLight,
        ]}
      >
        {replyText}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    //marginTop: 8,
    //paddingTop: 8,
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignSelf: "center",
    width:150,
    borderRadius:10,
    overflow:'hidden',
    //backgroundColor:'gray'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "800",
  },
  textDark: {
    color: "#aaa",
  },
  textLight: {
    color: "#000",
  },
});

export default ViewRepliesButton;
