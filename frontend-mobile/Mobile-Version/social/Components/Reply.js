import React, { memo, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import ReplyButton from "./ReplyButton";
import LikeCommentButton from "./LikeCommentButton";
import timePassed from "../../Utility/timePassed";

export default function Reply({isDarkMode=true, reply}) {

  // const reply = {
  //   reply_id: 1,
  //   profile_id: 2,
  //   username: "Jane Smith",
  //   avatar: "https://via.placeholder.com/150",
  //   content: "This is a Reply from Jane Smith, how are you doing john Doe ? It has been a while",
  //   timestamp: "30 minutes ago",
  //   likes: 2,
  //   isoString: "2024-12-03T23:59:20.885287Z",
  // };

  return (
    <Pressable
      style={[styles.replyContainer, isDarkMode && styles.darkModeBackground]}
      android_ripple={{ color: "#261d01" }}
    >
      <View style={styles.replyMainHeader}>
        <Image source={{ uri: reply.avatar }} style={styles.avatar} />
        <View style={styles.replyHeaderText}>
          <Text
            style={[styles.replyUsername, isDarkMode && styles.darkModeText]}
          >
            {reply.username}
          </Text>
          <Text
            style={[
              styles.replyTimeStamp,
              isDarkMode && styles.darkModeTextSecondary,
            ]}
          >
            {timePassed(reply.isoString, new Date().toISOString())}
          </Text>
        </View>
      </View>
      <Text
        style={[styles.replyText, isDarkMode && styles.darkModeTextSecondary]}
      >
        {reply.content}
      </Text>
      <View style={styles.actionContainer}>
        <LikeCommentButton initialLikeCount={reply.likes} />
        {/* <ReplyButton
          isDarkMode={isDarkMode}
          //onPress={onReplyPress}  // change
        /> */}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  darkModeBackground: {
    backgroundColor: "#1c1c1c",
  },
  replyHeader: {
    color: "#333",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 8,
  },
  darkModeText: {
    color: "#e0e0e0",
  },
  replyContainer: {
    marginVertical:5,
    padding: 10,
    marginLeft:60,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderTopLeftRadius:25,
    borderBottomLeftRadius:25,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  replyMainHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  replyHeaderText: {
    flex: 1,
  },
  replyUsername: {
    fontSize: 14,
    fontWeight: "bold",
  },
  replyTimeStamp: {
    fontSize: 12,
    color: "#999",
  },
  darkModeTextSecondary: {
    color: "#aaa",
  },
  replyText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 8,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    //marginTop: 5,
    justifyContent: "space-between",
    //paddingBottom: 5,
    //borderBottomWidth:2,
    //backgroundColor:"yellow",
  },
});
