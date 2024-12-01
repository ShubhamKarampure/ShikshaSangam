import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ReplyButton = ({ comment, isDarkMode, onPress}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={{flex:1}} onPress={onPress}>
        <View style={styles.container}>
          <View style={{ paddingTop: 5, justifyContent:'center', alignContent:'center' }}>
            <MaterialCommunityIcons
              name="reply-circle"
              size={20}
              color={isDarkMode ? "#fff" : "#000"}
            />
          </View>
          <Text
            style={[
              styles.actionText,
              isDarkMode ? styles.textDarkSecondary : styles.textLight,
            ]}
          >
            Reply
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    //flexDirection: "row",
    //alignItems: "center",
    width:100,
    //paddingHorizontal: 20,
    //backgroundColor: "yellow",
  },
  container: {
    //flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    //padding: 8,
    //backgroundColor: "blue",
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
// import React from "react";
// import { Pressable, Text, StyleSheet, View } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// const ReplyButton = ({ item, isDarkMode, onPress }) => {
//   return (
//     <View
//       style={({ pressed }) => [
//         styles.container,
//         pressed && styles.pressed, // Add style feedback when pressed
//       ]}
//     >
//       <Pressable style={styles.content} onPress={onPress}>
//         <View>
//           <MaterialCommunityIcons
//             name="comment-text-outline"
//             size={32}
//             color={isDarkMode ? "#fff" : "#000"}
//           />
//           <Text
//             style={[
//               styles.actionText,
//               isDarkMode ? styles.textDarkSecondary : styles.textLight,
//             ]}
//           >
//             Reply
//           </Text>
//         </View>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     //flexDirection: "row",
//     alignItems: "center",
//     padding: 8,
//     borderRadius: 8, // To give it a rounded edge
//   },
//   pressed: {
//     backgroundColor: "rgba(0, 0, 0, 0.1)", // Visual feedback when pressed
//   },
//   content: {
//     flexDirection: "row",
//     alignItems: "center",
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
