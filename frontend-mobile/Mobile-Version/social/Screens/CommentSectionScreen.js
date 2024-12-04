import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Comment from "../Components/Comment";
import CommentTypingSection from "../Components/CommentTypingSection";
import timePassed from "../../Utility/timePassed";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useReplyListContext } from "../../Context/ReplyListContext";

export default function CommentSectionScreen({  // This component gets a post_id from route
  navigation,
  route,
  // item,
  // isDarkMode,
  // onPress,
  // isModalVisible
}) {
  // to get comments of a post   /social/comments/post_comments/{post_id}

  const fromBackendComments = [
    {
      comment: {
        id: 2,
        content: "first comment on post 2 from profile 1",
        created_at: "2024-12-02T19:31:54.271624Z",
        post: 2,
        userprofile: 1,
      },
      user: {
        username: "college_admin",
        avatar: null,
        profile_id: 1,
        role: "college_admin",
      },
      likes_count: 0,
      replies_count: 2,
    },
    {
      comment: {
        id: 3,
        content: "Excited",
        created_at: "2024-12-03T14:02:26.358973Z",
        post: 2,
        userprofile: 3,
      },
      user: {
        username: "alumni_demo",
        avatar:
          "http://res.cloudinary.com/dhp4wuv2x/image/upload/v1733055942/shikshasangam/avatar/ap1pqjspdbeeyj3zls9e.jpg",
        profile_id: 3,
        role: "alumni",
      },
      likes_count: 0,
      replies_count: 0,
    },
    {
      comment: {
        id: 8,
        content: "Hello",
        created_at: "2024-12-03T15:06:42.733001Z",
        post: 2,
        userprofile: 2,
      },
      user: {
        username: "student_demo",
        avatar:
          "http://res.cloudinary.com/dhp4wuv2x/image/upload/v1733055854/shikshasangam/avatar/ahbs1gionghsf2g6aqxa.jpg",
        profile_id: 2,
        role: "student",
      },
      likes_count: 0,
      replies_count: 0,
    },
    {
      comment: {
        id: 11,
        content: "first comment on post 2 from profile 1",
        created_at: "2024-12-04T12:09:06.704830Z",
        post: 2,
        userprofile: 1,
      },
      user: {
        username: "college_admin",
        avatar: null,
        profile_id: 1,
        role: "college_admin",
      },
      likes_count: 0,
      replies_count: 0,
    },
    {
      comment: {
        id: 12,
        content: "first comment on post 2 from profile 1",
        created_at: "2024-12-04T12:23:56.737743Z",
        post: 2,
        userprofile: 1,
      },
      user: {
        username: "college_admin",
        avatar: null,
        profile_id: 1,
        role: "college_admin",
      },
      likes_count: 0,
      replies_count: 0,
    },
  ];
  // get respective data from current logged in user
  const sender_profile_id = 1;
  const sender_username = "John Doe";
  const sender_avatar = "https://via.placeholder.com/150"; 
  const sender_role = "college_admin";

  const item = route.params.item;  // post object
  const post_id = item.post.id;
  const isDarkMode = route.params.isDarkMode;

  const slideAnim = useRef(new Animated.Value(-1000)).current; // Initial position is off-screen

  //let currentComment = null;
  const [currentComment, setCurrentComment] = useState(null);

  const [isReplyPressed, setIsReplyPressed] = useState(false);

  const { addReply } = useReplyListContext();

  function onReplyPress(comment) {
    setIsReplyPressed((prev) => !prev);
    setCurrentComment(comment);
    console.log("Reply to:", comment.user.username);
  }

  // function onSendHandlerForReply(chat) {
  //   if(currentComment!==null){
  //     const replyItem = {
  //       reply_id: 100, // Generate unique IDs dynamically in a real-world scenario
  //       profile_id: sender_profile_id,
  //       username: sender_username,
  //       avatar: sender_avatar,
  //       content: chat.message,
  //       timestamp: timePassed(
  //         chat.timestamp.isoString,
  //         chat.timestamp.isoString
  //       ),
  //       isoString: chat.timestamp.isoString,
  //       likes: 0,
  //     };

  //     // Find the comment to which the reply belongs
  //     const replyToComment = item.comments.find(
  //       (c) => c.comment_id === currentComment.comment_id
  //     );

  //     if (replyToComment) {
  //       // Ensure `replies` array exists
  //       if (!replyToComment.replies) {
  //         replyToComment.replies = [];
  //       }

  //       // Append the reply
  //       replyToComment.replies.push(replyItem);

  //       // Update the parent `item.comments` (if necessary for re-render)
  //       item.comments = item.comments.map((c) =>
  //         c.comment_id === currentComment.comment_id ? replyToComment : c
  //       );
  //     }
  //   }
  //   else{
  //     console.log('No current comment to Reply to');
  //   }
  // }

  function modalCloseHandler() {
    Animated.timing(slideAnim, {
      toValue: -1000, // Off-screen position
      duration: 500,
      useNativeDriver: true,
    }).start(() => navigation.goBack());
  }

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide in to on-screen position
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [commentList, setCommentList] = useState(fromBackendComments);

  const flatListRef = useRef(null); // Reference for FlatList

  function onSendHandlerForComment(chat) {  // for posting comment we need post_id, user
    setCommentList((prevList) => {
      let comment_id = sender_profile_id.toString()+new Date().toISOString(); // for flatList key
      // const commentItem = {
      //   comment_id: comment_id,
      //   profile_id: sender_profile_id,
      //   username: sender_username,
      //   avatar: sender_avatar,
      //   content: chat.message,
      //   timestamp: timePassed(
      //     chat.timestamp.isoString,
      //     chat.timestamp.isoString
      //   ),
      //   isoString: chat.timestamp.isoString,
      //   likes: 0,
      // };
      const commentItem = {
        comment: {
          id: comment_id,
          content: chat.message,
          created_at: new Date().toISOString(),
          post: 1000,                       // insert actual post ID here
          userprofile: sender_profile_id,
        },
        user: {
          username: sender_username,
          avatar: sender_avatar,
          profile_id: sender_profile_id,
          role: "college_admin",
        },
        likes_count: 0,
        replies_count: 0,
      };
      return [commentItem, ...prevList];
    });
    // Scroll to the top of the list
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        animationType="none"
        transparent={true}
        //visible={isModalVisible}
        //onRequestClose={modalCloseHandler}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.animatedContainer}
          >
            <Animated.View
              style={[
                styles.animatedContainer,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View
                style={[
                  styles.commentSection,
                  isDarkMode && styles.darkModeBackground,
                ]}
              >
                <Pressable
                  style={styles.commentSectionHeader}
                  onPress={modalCloseHandler}
                  android_ripple={{
                    color: "#1f3636",
                    radius: styles.commentSectionHeader.borderRadius,
                  }}
                >
                  <Text
                    style={[
                      styles.commentHeader,
                      isDarkMode && styles.darkModeText,
                    ]}
                  >
                    Comments
                  </Text>
                </Pressable>

                <FlatList
                  data={commentList}
                  keyExtractor={(comment) => comment.comment.id.toString()}
                  renderItem={({ item }) => (  // this item is a comment object
                    <Comment
                      comment={item}
                      isDarkMode={isDarkMode}
                      onReplyPress={onReplyPress.bind(this, item)}
                    />
                  )}
                  initialNumToRender={10}
                  windowSize={5}
                  maxToRenderPerBatch={5}
                  getItemLayout={(data, index) => ({
                    length: 100,
                    offset: 100 * index,
                    index,
                  })}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator}></View>
                  )}
                  ref={flatListRef} // Attach the reference
                  contentContainerStyle={styles.listContent}
                />
                <View>
                  <CommentTypingSection
                    onSend={
                      isReplyPressed
                        ? onSendHandlerForReply
                        : onSendHandlerForComment
                    }
                    placeholder={
                      isReplyPressed ? "Type a Reply" : "Type a comment"
                    }
                  />
                </View>
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  commentSection: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  commentSectionHeader: {
    width: 360,
    flexDirection: "row",
    backgroundColor: "#0c2e2e",
    borderWidth: 1,
    borderColor: "#030d0d",
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 6,
    //marginBottom: 10,
    overflow: "hidden",
  },
  darkModeBackground: {
    backgroundColor: "#1c1c1c",
  },
  commentHeader: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  darkModeText: {
    color: "#e0e0e0",
  },
  separator: {
    height: 1,
    backgroundColor: "#cccccc",
    marginVertical: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
});
