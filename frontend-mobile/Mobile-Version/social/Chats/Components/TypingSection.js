import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TypingSection = ({ onSend, isDarkMode = true }) => {
  const [message, setMessage] = useState("");

  function getCurrentDateFields() {
    const now = new Date();

    // Helper function to pad single-digit numbers with a leading zero
    const pad = (num) => String(num).padStart(2, "0");

    return {
      year: now.getFullYear(), // Format: YYYY (e.g., 2024)
      month: now.getMonth() + 1, // Format: 1-12 (e.g., 12 for December)
      date: now.getDate(), // Format: 1-31 (Day of the month)
      day: now.getDay(), // Format: 0-6 (0 = Sunday, 6 = Saturday)
      hours: now.getHours(), // Format: 0-23 (24-hour clock)
      minutes: now.getMinutes(), // Format: 0-59
      seconds: now.getSeconds(), // Format: 0-59
      milliseconds: now.getMilliseconds(), // Format: 0-999
      isoString: now.toISOString(), // Format: ISO 8601 (e.g., "2024-12-03T14:45:30.123Z")
      time: now.getTime(), // Milliseconds since Unix epoch (e.g., 1701613530123)
      timezoneOffset: now.getTimezoneOffset(), // Format: Minutes (difference from UTC, e.g., -330 for IST)
      am_pm: now.getHours() >= 12 ? "PM" : "AM", // Format: "AM" or "PM" for 12-hour notation
      hoursMinutes: `${pad(now.getHours())}:${pad(now.getMinutes())}`, // Format: "HH:MM" (24-hour format)
      
    };
  }

  const handleSend = () => {
    if (message.trim()) {
      const chat = {
        message : message,
        timestamp : getCurrentDateFields(), 
      };
      onSend(chat);
      setMessage(""); // Clear the input field after sending
    }
  };

  return (
    <KeyboardAvoidingView style={[styles.container, isDarkMode && styles.darkModeBackground]}>
      {/* Left - Emoji Button */}
      <View
        style={{
          //backgroundColor: "yellow",
          flex: 1,
        }}
      >
        <TouchableOpacity style={[styles.iconButton]}>
          <MaterialCommunityIcons
            name="emoticon"
            size={25}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>

      {/* Middle - Message Input */}
      <View style={{ flex: 4, flexDirection: "row" }}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          placeholderTextColor={isDarkMode ? "#888" : "#999"}
          style={[styles.input, isDarkMode && styles.darkModeInput]}
          multiline={true}
          maxHeight={180} // Set a maximum height for the text input
          scrollEnabled={true} // Enable scrolling when maxHeight is exceeded
        />
      </View>

      {/* Right - File Attach and Camera Buttons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons
            name="paperclip"
            size={25}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons
            name="camera"
            size={25}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>

        {/* Send Button (appears only when there's a message) */}
        <TouchableOpacity
          style={[styles.iconButton, styles.sendButton]}
          onPress={handleSend}
        >
          <MaterialCommunityIcons
            name="send"
            size={28}
            color={isDarkMode ? "#34B7F1" : "#000"}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TypingSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#120d00",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderRadius:50,
  },
  darkModeBackground: {
    backgroundColor: "#333",
  },
  iconButton: {
    marginHorizontal: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    fontSize: 16,
    overflow:'scroll',
    flexWrap:'wrap',
  },
  darkModeInput: {
    backgroundColor: "#444",
    color: "#fff",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  sendButton: {
    marginLeft: 10,
  },
});
// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// const TypingSection = ({ onSend, isDarkMode = true }) => {
//   const [message, setMessage] = useState("");

//   const handleSend = () => {
//     if (message.trim()) {
//       onSend(message);
//       setMessage(""); // Clear the input field after sending
//     }
//   };

//   return (
//     <View style={[styles.container, isDarkMode && styles.darkModeBackground]}>
//       {/* Left - Emoji Button */}
//       <View style={{ flex: 1 }}>
//         <TouchableOpacity style={[styles.iconButton]}>
//           <MaterialCommunityIcons
//             name="emoticon"
//             size={25}
//             color={isDarkMode ? "#fff" : "#000"}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Middle - Message Input */}
//       <View style={{ flex: 4 }}>
//         <TextInput
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type a message"
//           placeholderTextColor={isDarkMode ? "#888" : "#999"}
//           style={[styles.input, isDarkMode && styles.darkModeInput]}
//           multiline={true}
//           maxHeight={100} // Set a maximum height for the text input
//           scrollEnabled={true} // Enable scrolling when maxHeight is exceeded
//         />
//       </View>

//       {/* Right - File Attach and Camera Buttons */}
//       <View style={styles.rightIcons}>
//         <TouchableOpacity style={styles.iconButton}>
//           <MaterialCommunityIcons
//             name="paperclip"
//             size={25}
//             color={isDarkMode ? "#fff" : "#000"}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <MaterialCommunityIcons
//             name="camera"
//             size={25}
//             color={isDarkMode ? "#fff" : "#000"}
//           />
//         </TouchableOpacity>

//         {/* Send Button (appears only when there's a message) */}
//         <TouchableOpacity
//           style={[styles.iconButton, styles.sendButton]}
//           onPress={handleSend}
//         >
//           <MaterialCommunityIcons
//             name="send"
//             size={28}
//             color={isDarkMode ? "#34B7F1" : "#000"}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default TypingSection;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#120d00",
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderTopWidth: 1,
//     borderTopColor: "#ddd",
//     borderRadius: 50,
//   },
//   darkModeBackground: {
//     backgroundColor: "#333",
//   },
//   iconButton: {
//     marginHorizontal: 8,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     fontSize: 16,
//     overflow: "scroll", // To enable scrolling when text exceeds the input area
//   },
//   darkModeInput: {
//     backgroundColor: "#444",
//     color: "#fff",
//   },
//   rightIcons: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   sendButton: {
//     marginLeft: 10,
//   },
// });
