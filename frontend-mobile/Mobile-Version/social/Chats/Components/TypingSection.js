// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   KeyboardAvoidingView
// } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// const TypingSection = ({ onSend, isDarkMode = true }) => {
//   const [message, setMessage] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);

//   function getCurrentDateFields() {
//     const now = new Date();

//     // Helper function to pad single-digit numbers with a leading zero
//     const pad = (num) => String(num).padStart(2, "0");

//     return {
//       year: now.getFullYear(), // Format: YYYY (e.g., 2024)
//       month: now.getMonth() + 1, // Format: 1-12 (e.g., 12 for December)
//       date: now.getDate(), // Format: 1-31 (Day of the month)
//       day: now.getDay(), // Format: 0-6 (0 = Sunday, 6 = Saturday)
//       hours: now.getHours(), // Format: 0-23 (24-hour clock)
//       minutes: now.getMinutes(), // Format: 0-59
//       seconds: now.getSeconds(), // Format: 0-59
//       milliseconds: now.getMilliseconds(), // Format: 0-999
//       isoString: now.toISOString(), // Format: ISO 8601 (e.g., "2024-12-03T14:45:30.123Z")
//       time: now.getTime(), // Milliseconds since Unix epoch (e.g., 1701613530123)
//       timezoneOffset: now.getTimezoneOffset(), // Format: Minutes (difference from UTC, e.g., -330 for IST)
//       am_pm: now.getHours() >= 12 ? "PM" : "AM", // Format: "AM" or "PM" for 12-hour notation
//       hoursMinutes: `${pad(now.getHours())}:${pad(now.getMinutes())}`, // Format: "HH:MM" (24-hour format)
      
//     };
//   }

//   const handleSend = () => {
//     if (message.trim()) {
//       const chat = {
//         message : message,
//         timestamp : getCurrentDateFields(), 
//       };
//       onSend(chat);
//       setMessage(""); // Clear the input field after sending
//     }
//   };

//   const handleImagePicker = async () => {
//     // Request permissions for image picker
//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       alert("Permission to access gallery is required!");
//       return;
//     }

//     // Launch the image picker
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri); // Store the selected image URI
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={[styles.container, isDarkMode && styles.darkModeBackground]}>
//       {/* Left - Emoji Button */}
//       <View
//         style={{
//           //backgroundColor: "yellow",
//           flex: 1,
//         }}
//       >
//         <TouchableOpacity style={[styles.iconButton]}>
//           <MaterialCommunityIcons
//             name="emoticon"
//             size={25}
//             color={isDarkMode ? "#fff" : "#000"}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Middle - Message Input */}
//       <View style={{ flex: 4, flexDirection: "row" }}>
//         <TextInput
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type a message"
//           placeholderTextColor={isDarkMode ? "#888" : "#999"}
//           style={[styles.input, isDarkMode && styles.darkModeInput]}
//           multiline={true}
//           maxHeight={180} // Set a maximum height for the text input
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
//     </KeyboardAvoidingView>
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
//     borderRadius:50,
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
//     overflow:'scroll',
//     flexWrap:'wrap',
//   },
//   darkModeInput: {
//     backgroundColor: "#444",
//     color: "#fff",
//   },
//   rightIcons: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//   },
//   sendButton: {
//     marginLeft: 10,
//   },
// });



import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

const TypingSection = ({ onSend, isDarkMode = true }) => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePicker = async () => {
    // Request permissions for image picker
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Store the selected image URI
    }
  };

  const handleSend = () => {
    if (message.trim() || selectedImage) {
      console.log(selectedImage);
      const chat = {
        content: message,
        media: selectedImage, // Attach the image URI (if selected)
        timestamp: new Date().toISOString(), // Use ISO string for timestamp
      };
      onSend(chat);
      setMessage(""); // Clear the input field after sending
      setSelectedImage(null); // Clear the selected image
    }
  };
  //   const handleSend = () => {
  //     if (message.trim()) {
  //       const chat = {
  //         message : message,
  //         timestamp : getCurrentDateFields(),
  //       };
  //       onSend(chat);
  //       setMessage(""); // Clear the input field after sending
  //     }
  //   };

  return (
    <KeyboardAvoidingView
      style={[styles.container, isDarkMode && styles.darkModeBackground]}
    >
      {/* Left - Emoji Button */}
      <View style={{ flex: 1 }}>
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

      {/* Display selected image (if any) */}
      {selectedImage && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          <TouchableOpacity
            onPress={() => setSelectedImage(null)} // Clear the selected image
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color="#FF0000"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Right - File Attach and Camera Buttons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons
            name="paperclip"
            size={25}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleImagePicker} // Open image picker
        >
          <MaterialCommunityIcons
            name="camera"
            size={25}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>

        {/* Send Button (appears only when there's a message or an image) */}
        {(message.trim() || selectedImage) && (
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
        )}
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
    borderRadius: 50,
  },
  darkModeBackground: {
    backgroundColor: "#333",
  },
  iconButton: {
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    fontSize: 16,
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
  previewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  imagePreview: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 5,
  },
});
