import React, {memo, useState} from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import ReplyButton from "./ReplyButton";
import LikeCommentButton from "./LikeCommentButton";
import ViewRepliesButton from "./ViewRepliesButton";
import ReplySection from "./ReplySection";
import timePassed from "../../Utility/timePassed";
import { processImageUrl } from "../../Utility/urlUtils";

const Comment = memo(({ comment, isDarkMode, onReplyPress, currentComment }) => { // currently disable the onReplyPress
  
  // const comment = {
  //   comment: {
  //     id: 3,
  //     content: "When Life Gives you lemons, throw it away and do react native",
  //     created_at: "2024-12-03T14:02:26.358973Z",
  //     post: 2,
  //     userprofile: 3,
  //   },
  //   user: {
  //     username: "alumni_demo",
  //     avatar:
  //       "http://res.cloudinary.com/dhp4wuv2x/image/upload/v1733055942/shikshasangam/avatar/ap1pqjspdbeeyj3zls9e.jpg",
  //     profile_id: 3,
  //     role: "alumni",
  //   },
  //   likes_count: 1,
  //   replies_count: 2,
  // };

  const [isReplySectionOpen, setIsReplySectionOpen] = useState(false);

  function handleViewReplies() {
    setIsReplySectionOpen(prev=>!prev);
  }

  return (
    <View>
      <Pressable
        style={[
          styles.commentContainer,
          isDarkMode && styles.darkModeBackground,
        ]}
        android_ripple={{ color: "#261d01" }}
      >
        <View style={styles.commentMainHeader}>
          <Image
            source={{
              uri:
                comment.user.avatar !== null
                  ? processImageUrl(comment.user.avatar)
                  : "https://via.placeholder.com/150/FF5733/FFFFFF",
            }}
            style={styles.avatar}
          />
          <View style={styles.commentHeaderText}>
            <Text
              style={[
                styles.commentUsername,
                isDarkMode && styles.darkModeText,
              ]}
            >
              {comment.user.username}
            </Text>
            <Text
              style={[
                styles.commentTimeStamp,
                isDarkMode && styles.darkModeTextSecondary,
              ]}
            >
              {timePassed(comment.comment.created_at, new Date().toISOString())}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.commentText,
            isDarkMode && styles.darkModeTextSecondary,
          ]}
        >
          {comment.comment.content}
        </Text>
        <View style={styles.actionContainer}>
          <LikeCommentButton initialLikeCount={comment.likes_count} />
          <ReplyButton
            comment={comment}
            isDarkMode={isDarkMode}
            onPress={onReplyPress}
            currentComment={currentComment}
          />
        </View>
        <View style={{ paddingHorizontal: 8 }}>
          <ViewRepliesButton
            comment={comment}
            isDarkMode={isDarkMode}
            onPress={handleViewReplies}
          />
        </View>
      </Pressable>
      {isReplySectionOpen ? (
        <ReplySection comment_id={comment.comment.id} isDarkMode={isDarkMode} />
      ) : (
        <></>
      )}
    </View>
  );
});

export default Comment;


const styles = StyleSheet.create({
  darkModeBackground: {
    backgroundColor: "#1c1c1c",
  },
  commentHeader: {
    color: "#333",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 8,
  },
  darkModeText: {
    color: "#e0e0e0",
  },
  commentContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth:2,
  },
  commentMainHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  commentHeaderText: {
    flex: 1,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: "bold",
  },
  commentTimeStamp: {
    fontSize: 12,
    color: "#999",
  },
  darkModeTextSecondary: {
    color: "#aaa",
  },
  commentText: {
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
