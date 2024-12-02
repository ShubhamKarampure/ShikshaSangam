// import React from "react";
// import { View, Text, StyleSheet, FlatList, Modal, Pressable, SafeAreaView } from "react-native";
// import Comment from "../Components/Comment";

// export default function CommentSectionScreen({ navigation, route }) {
//   const item = route.params.item;
//   const isDarkMode = route.params.isDarkMode;
//   function onReplyPress(comment) {
//     // Handle reply button press for the specific comment
//     console.log("Reply to:", comment.author);
//   }
//   function modalCloseHandler(){
//     navigation.navigate('Home');
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Modal animationType="slide" onRequestClose={modalCloseHandler}>
//         <View
//           style={[
//             styles.commentSection,
//             isDarkMode && styles.darkModeBackground,
//           ]}
//         >
//           <Pressable
//             style={styles.commentSectionHeader}
//             onPress={modalCloseHandler}
//           >
//             <Text
//               style={[styles.commentHeader, isDarkMode && styles.darkModeText]}
//             >
//               Comments
//             </Text>
//           </Pressable>
          
//           <FlatList
//             data={item.comments}
//             keyExtractor={(comment) => comment.comment_id.toString()}
//             renderItem={({ item: comment }) => (
//               <Comment
//                 comment={comment}
//                 isDarkMode={isDarkMode}
//                 onReplyPress={onReplyPress.bind(this, comment)}
//               />
//             )}
//             initialNumToRender={10} // Render only 10 items initially
//             windowSize={5} // Load items within 5 windows of the screen
//             maxToRenderPerBatch={5} // Render up to 5 items per batch
//             getItemLayout={(data, index) => ({
//               length: 100, // Approximate height of each item
//               offset: 100 * index,
//               index,
//             })}
//             ItemSeparatorComponent={() => (
//               <View style={styles.separator}></View>
//             )}
//             contentContainerStyle={styles.listContent} // Ensure padding inside FlatList
//           />
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   commentSection: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 10,
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   commentSectionHeader: {
//     backgroundColor: "#0c2e2e",
//     borderWidth: 1,
//     borderColor: "#030d0d",
//     borderRadius: 50,
//     justifyContent:'center',
//     alignContent:'center',
//     paddingTop:6,
//   },
//   darkModeBackground: {
//     backgroundColor: "#1c1c1c",
//   },
//   commentHeader: {
//     fontSize: 16,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 10,
//     color: "#333",
//   },
//   darkModeText: {
//     color: "#e0e0e0",
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#cccccc",
//     marginVertical: 10,
//   },
//   listContent: {
//     paddingBottom: 20, // Adds spacing at the bottom
//   },
// });

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
} from "react-native";
import Comment from "../Components/Comment";

export default function CommentSectionScreen({ navigation, route, item, isDarkMode, onPress}) {
  const slideAnim = useRef(new Animated.Value(-1000)).current; // Initial position is off-screen
  // const item = route.params.item;
  // const isDarkMode = route.params.isDarkMode;

  function onReplyPress(comment) {
    // Handle reply button press for the specific comment
    console.log("Reply to:", comment.author);
  }

  function modalCloseHandler() {
    // Slide out before navigating back
    Animated.timing(slideAnim, {
      toValue: -1000, // Off-screen position
      duration: 300,
      useNativeDriver: true,
    }).start(onPress);
  }

  useEffect(() => {
    // Slide in animation when the modal is opened
    Animated.timing(slideAnim, {
      toValue: 0, // Slide in to on-screen position
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        animationType="none"
        transparent={true}
        onRequestClose={modalCloseHandler}
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
              data={item.comments}
              keyExtractor={(comment) => comment.comment_id.toString()}
              renderItem={({ item: comment }) => (
                <Comment
                  comment={comment}
                  isDarkMode={isDarkMode}
                  onReplyPress={onReplyPress.bind(this, comment)}
                />
              )}
              initialNumToRender={10} // Render only 10 items initially
              windowSize={5} // Load items within 5 windows of the screen
              maxToRenderPerBatch={5} // Render up to 5 items per batch
              getItemLayout={(data, index) => ({
                length: 100, // Approximate height of each item
                offset: 100 * index,
                index,
              })}
              ItemSeparatorComponent={() => (
                <View style={styles.separator}></View>
              )}
              contentContainerStyle={styles.listContent} // Ensure padding inside FlatList
            />
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    justifyContent: "flex-end", // Align modal to the bottom
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
    //flex:1,
    width:360,
    flexDirection:'row',
    backgroundColor: "#0c2e2e",
    borderWidth: 1,
    borderColor: "#030d0d",
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 6,
    overflow:'hidden',
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
    paddingBottom: 20, // Adds spacing at the bottom
  },
});
