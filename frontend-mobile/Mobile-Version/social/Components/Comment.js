import React, {memo} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ReplyButton from "./ReplyButton";
import LikeCommentButton from "./LikeCommentButton";

// const Comment = ({ comment, isDarkMode, onReplyPress }) => {
//   return (
//     <View
//       style={[styles.commentContainer, isDarkMode && styles.darkModeBackground]}
//     >
//       <View style={styles.commentMainHeader}>
//         <Image
//           source={{ uri: comment.avatar }}
//           style={styles.avatar}
//         />
//         <View style={styles.commentHeaderText}>
//           <Text
//             style={[styles.commentUsername, isDarkMode && styles.darkModeText]}
//           >
//             {comment.author}
//           </Text>
//           <Text
//             style={[
//               styles.commentTimeStamp,
//               isDarkMode && styles.darkModeTextSecondary,
//             ]}
//           >
//             {comment.timestamp}
//           </Text>
//         </View>
//       </View>
//       <Text
//         style={[styles.commentText, isDarkMode && styles.darkModeTextSecondary]}
//       >
//         {comment.content}
//       </Text>
//       <View style={styles.actionContainer}>
//         <LikeCommentButton initialLikeCount={comment.likes} />
//         <ReplyButton
//           comment={comment}
//           isDarkMode={isDarkMode}
//           onPress={onReplyPress}
//         />
//       </View>
//     </View>
//   );
// };

const Comment = memo(({ comment, isDarkMode, onReplyPress }) => {
  return (
    <View
      style={[styles.commentContainer, isDarkMode && styles.darkModeBackground]}
    >
      <View style={styles.commentMainHeader}>
        <Image
          source={{ uri: comment.avatar }}
          style={styles.avatar}
        />
        <View style={styles.commentHeaderText}>
          <Text
            style={[styles.commentUsername, isDarkMode && styles.darkModeText]}
          >
            {comment.author}
          </Text>
          <Text
            style={[
              styles.commentTimeStamp,
              isDarkMode && styles.darkModeTextSecondary,
            ]}
          >
            {comment.timestamp}
          </Text>
        </View>
      </View>
      <Text
        style={[styles.commentText, isDarkMode && styles.darkModeTextSecondary]}
      >
        {comment.content}
      </Text>
      <View style={styles.actionContainer}>
        <LikeCommentButton initialLikeCount={comment.likes} />
        <ReplyButton
          comment={comment}
          isDarkMode={isDarkMode}
          onPress={onReplyPress}
        />
      </View>
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
    paddingBottom: 5,
    //borderBottomWidth:2,
  },
});
