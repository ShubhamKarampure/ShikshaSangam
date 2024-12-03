import React, { useRef, useEffect } from "react";
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

export default function CommentSectionScreen({
  navigation,
  route,
  // item,
  // isDarkMode,
  // onPress,
  // isModalVisible
}) {

  const item = route.params.item;
  const isDarkMode = route.params.isDarkMode;

  const slideAnim = useRef(new Animated.Value(-1000)).current; // Initial position is off-screen

  function onReplyPress(comment) {
    // Handle reply button press for the specific comment
    console.log("Reply to:", comment.author);
  }

  function modalCloseHandler() {
    Animated.timing(slideAnim, {
      toValue: -1000, // Off-screen position
      duration: 500,
      useNativeDriver:true,
    }).start(()=>navigation.goBack());
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
                  //onPress={() => navigation.goBack()}
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
                  data={item.comments}
                  keyExtractor={(comment) => comment.comment_id.toString()}
                  renderItem={({ item: comment }) => (
                    <Comment
                      comment={comment}
                      isDarkMode={isDarkMode}
                      onReplyPress={onReplyPress.bind(this, comment)}
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
                  contentContainerStyle={styles.listContent}
                />
                <View>
                  <CommentTypingSection />
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
    marginVertical: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});
