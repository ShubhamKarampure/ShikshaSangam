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
import { getComment,postComment } from "../../api/feed";
import {useProfileContext} from "../../Context/ProfileContext"

export default function CommentSectionScreen({  // This component gets a post_id from route
  navigation,
  route,
  // item,
  // isDarkMode,
  // onPress,
  // isModalVisible
}) {
  // to get comments of a post   /social/comments/post_comments/{post_id}

  // get respective data from current logged in user
  const {profile} = useProfileContext()
  const sender_profile_id = profile.id;
  const sender_username = profile.full_name;
  const sender_avatar = profile.avatar_image; 
  //console.log(sender_profile_id);
  const item = route.params.item;  // post object
  const post_id = item.post.id;
  const isDarkMode = route.params.isDarkMode;

  const slideAnim = useRef(new Animated.Value(-1000)).current; // Initial position is off-screen

  //let currentComment = null;
  const [currentComment, setCurrentComment] = useState(null);  // irrelevant 

  const [commentList, setCommentList] = useState(null);

  const [isReplyPressed, setIsReplyPressed] = useState(false);

  const { addReply } = useReplyListContext();

  function onReplyPress(comment) {
    setIsReplyPressed((prev) => !prev);
    setCurrentComment(comment);
    console.log("Reply to:", comment.user.username);
  }

  
  function modalCloseHandler() {
    Animated.timing(slideAnim, {
      toValue: -1000, // Off-screen position
      duration: 500,
      useNativeDriver: true,
    }).start(() => navigation.goBack());
  }

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getComment(post_id); // Call the API to fetch comments
        setCommentList(comments.results); // Set the fetched comments to state
        // console.log('comment list = ',comments.results);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    fetchComments();
  }, [post_id]);

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

  

  const flatListRef = useRef(null); // Reference for FlatList



  const onSendHandlerForComment = async (chat) => {
    const tempId = sender_profile_id.toString() + new Date().toISOString(); // Temporary ID
    const newCommentItem = {
      comment: {
        id: tempId,
        content: chat.message,
        created_at: new Date().toISOString(),
        post: post_id,
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
  
    setCommentList((prevList) => [newCommentItem, ...prevList]);
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  
    // the code is working but the problem is that the profile_id, is dummy so it messes with backend, need profile global context
    try {             
      const commentVerified = await postComment(post_id, sender_profile_id, chat.message);

      console.log('CommentVerifed is ',commentVerified);

      
    } catch (error) {
      console.error("Error posting comment:", error.message);
      // Optionally remove the comment from UI if the API fails
      setCommentList((prevList) =>
        prevList.filter((comment) => comment.comment.id !== tempId)
      );
    }
  };
  

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
