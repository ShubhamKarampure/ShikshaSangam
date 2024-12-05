// import React, {memo} from "react";
// import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// const ReplyButton = ({ comment, isDarkMode, onPress}) => {
//   return (
//     <View style={styles.mainContainer}>
//       <TouchableOpacity style={{flex:1}} onPress={onPress}>
//         <View style={styles.container}>
//           <View style={{ paddingTop: 5, justifyContent:'center', alignContent:'center' }}>
//             <MaterialCommunityIcons
//               name="reply-circle"
//               size={20}
//               color={isDarkMode ? "#fff" : "#000"}
//             />
//           </View>
//           <Text
//             style={[
//               styles.actionText,
//               isDarkMode ? styles.textDarkSecondary : styles.textLight,
//             ]}
//           >
//             Reply
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     //flex: 1,
//     //flexDirection: "row",
//     //alignItems: "center",
//     justifyContent:'center',
//     width:100,
//     //paddingHorizontal: 20,
//     backgroundColor: "pink",
//   },
//   container: {
//     //flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     //padding: 8,
//     backgroundColor: "blue",
//   },
//   actionText: {
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   textDarkSecondary: {
//     color: "#aaa",
//   },
//   textLight: {
//     color: "#000",
//   },
// });

// export default ReplyButton;


import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ReplyButton = ({ comment, isDarkMode, onPress, currentComment }) => {

  return (
    <Pressable
      style={
        currentComment === null
          ? styles.container
          : currentComment.comment.id === comment.comment.id
          ? styles.focusedContainer
          : styles.container
      }
      onPress={onPress}
      android_ripple={{ color: "#2b2b04" }}
    >
      <MaterialCommunityIcons
        name="reply-circle"
        size={20}
        color={isDarkMode ? "#fff" : "#000"}
      />
      <Text
        style={[
          styles.actionText,
          isDarkMode ? styles.textDarkSecondary : styles.textLight,
        ]}
      >
        Reply
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  focusedContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f381a",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "blue",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
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

export default ReplyButton;
