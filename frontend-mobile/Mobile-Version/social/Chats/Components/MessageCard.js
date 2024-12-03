// import React from "react";
// import { TouchableOpacity, Text, StyleSheet, Image, View,  } from "react-native";

// const MessageCard = ({ item, onPress }) => {
//   return (
//     <TouchableOpacity
//       style={styles.messageCard}
//       activeOpacity={0.7}
//       onPress={onPress}
//     >
//       <View style={styles.mainHeader}>
//         <Image source={{ uri: item.avatar }} style={styles.avatar} />
//         <View style={styles.headerText}>
//           <Text
//             style={[styles.username, styles.darkModeText]}
//           >
//             {item.username}
//           </Text>
//         </View>
//       </View>

//       <Text style={styles.messageText}>{item.message}</Text>
//       <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   messageCard: {
//     backgroundColor: "#1e1e1e",
//     borderRadius: 8,
//     padding: 15,
//     marginBottom: 15,
//   },
//   messageName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1DA1F2",
//   },
//   messageText: {
//     fontSize: 14,
//     color: "#aaa",
//     marginTop: 5,
//   },
//   messageTimestamp: {
//     fontSize: 12,
//     color: "#666",
//     marginTop: 5,
//     alignSelf: "flex-end",
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   mainHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingBottom: 4,
//     //marginBottom: 8,
//     borderBottomWidth:2,
//   },
//   headerText: {
//     flex: 1,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   timeStamp: {
//     fontSize: 12,
//     color: "#999",
//   },
//   darkModeTextSecondary: {
//     color: "#aaa",
//   },
//   commentText: {
//     fontSize: 14,
//     color: "#333",
//     marginVertical: 8,
//   },
//   darkModeText: {
//     color: "#e0e0e0",
//   },
// });

// export default MessageCard;

import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";

const MessageCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.messageCard}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.mainHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={[styles.username, styles.darkModeText]}>
            {item.username}
          </Text>
        </View>
        <Text style={styles.timeStamp}>{item.timestamp}</Text>
      </View>

      <Text style={styles.messageText}>{item.message}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageCard: {
    backgroundColor: "#2a2a2a", // Slightly brighter for contrast
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderColor: "#1DA1F2", // Optional outline for the avatar
    borderWidth: 1,
  },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#444",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    flex: 1, // Ensures it takes available space
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  timeStamp: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-start", // Align to the top for a cleaner look
  },
  messageText: {
    fontSize: 14,
    color: "#cccccc",
    lineHeight: 20,
  },
  darkModeText: {
    color: "#e0e0e0",
  },
});

export default MessageCard;

