// import React from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import Comment from "./Comment";

// export default function CommentSectionCard({ item, isDarkMode }) {
//   function onReplyPress(comment) {
//     // Handle reply button press for the specific comment
//     console.log("Reply to:", comment.author);
//   }

//   return (
//     <View
//       style={[styles.commentSection, isDarkMode && styles.darkModeBackground]}
//     >
//       <Text style={[styles.commentHeader, isDarkMode && styles.darkModeText]}>
//         Comments
//       </Text>
//       <FlatList
//         data={item.comments}
//         keyExtractor={(comment) => comment.comment_id.toString()}
//         renderItem={({ item: comment }) => (
//           <Comment
//             comment={comment}
//             isDarkMode={isDarkMode}
//             onReplyPress={onReplyPress.bind(this, comment)}
//           />
//         )}
//         ItemSeparatorComponent={() => <View style={styles.separator}></View>}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   commentSection: {
//     flex: 1,
//     maxHeight: 1000,
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
// });
import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import Comment from "./Comment";

export default function CommentSectionCard({ item, isDarkMode }) {
  function onReplyPress(comment) {
    // Handle reply button press for the specific comment
    console.log("Reply to:", comment.author);
  }

  return (
    <ScrollView
      style={[styles.commentSection, isDarkMode && styles.darkModeBackground]}
    >
      <Text style={[styles.commentHeader, isDarkMode && styles.darkModeText]}>
        Comments
      </Text>
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
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  commentSection: {
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
});
