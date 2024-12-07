import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker"; // Import DocumentPicker
import Groq from "groq-sdk";
import { VITE_REACT_APP_GROQ_API_KEY } from "@env";

const groq = new Groq({
  apiKey: VITE_REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const TypingSection = ({ onSend, isDarkMode = true }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [inputColor, setInputColor] = useState("white"); // Default color

  // New function to handle AI bot response
  const handleAIBotResponse = async (prompt) => {
    setIsAIProcessing(true);

    // Modify the prompt to ask for a specific format
    const chatPrompt = `Return it as a JSON object with only one key "answer" containing the message. For example, {"answer": "your answer here"}. Only return the JSON object, in any case dont put any other wording apart from the answer expected in the start of your answer. Input: "${prompt}"`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: chatPrompt,
          },
        ],
        model: "llama3-8b-8192", // Ensure this model is available in your API
      });

      // Extract the AI response
      const aiResponse = chatCompletion.choices[0]?.message?.content || "{}";

      // Try parsing the response as JSON
      let decodedResponse;
      try {
        decodedResponse = JSON.parse(aiResponse);
      } catch (error) {
        console.error("Failed to parse AI response:", error);
        decodedResponse = {}; // fallback in case parsing fails
      }

      // Extract the rewritten message from the decoded JSON
      const answer = decodedResponse.answer || "No valid response";

      // Update the input value and set the response to the form control
      setInputValue(answer);
    } catch (error) {
      console.error("AI response error:", error);
    } finally {
      setInputColor("white");
      setIsAIProcessing(false);
    }
  };

  // Real-time input change handler
  const handleInputChange = (value) => {
    setInputValue(value);
    // Check for AI trigger in real-time when the input is in the format @writebot "message content"
    if (value.startsWith("@writebot")) {
      setInputColor("lightgreen");
    } else {
      setInputColor("white");
    }
    if (value.startsWith("@writebot ") && hasValidQuotes(value)) {
      const prompt = extractPrompt(value); // Extract prompt inside quotes
      if (prompt && !isAIProcessing) {
        handleAIBotResponse(prompt); // Trigger AI response with the prompt
      }
    }
  };

  // Function to check if the input has valid quotes around the prompt
  const hasValidQuotes = (input) => {
    const regex = /^@writebot\s+"(.+)"$/; // Added '(.+)' to ensure non-empty content within quotes
    return regex.test(input);
  };

  // Function to extract the prompt from the message inside the quotes
  const extractPrompt = (input) => {
    const regex = /^@writebot\s+"([^"]+)"$/;
    const match = input.match(regex);
    return match ? match[1].trim() : null; // Extract the content inside quotes
  };

  // Function to handle file selection
  const handleFilePicker = async () => {
    try {
      console.log("Opening document picker...");
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all file types
      });

      // Check for cancellation
      if (result.canceled) {
        console.log("User cancelled file selection.");
        return;
      }

      // Check for assets array in the result
      if (result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0]; // Get the first selected file
        console.log("File selected:", selectedFile);

        setSelectedFile(selectedFile); // Save the selected file (if needed)
      } else {
        console.error("Unexpected result structure:", result);
      }
    } catch (error) {
      console.error("Error in document picker:", error);
    }
  };

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
    if (inputValue.trim() || selectedImage || selectedFile) {
      //console.log("selectedFile = ", selectedFile);
      const chat = {
        content: inputValue,
        media: selectedImage, // Attach the image URI (if selected)
        file: selectedFile, // Attach the file details (if selected)
        timestamp: new Date().toISOString(), // Use ISO string for timestamp
      };
      onSend(chat);
      setInputValue(""); // Clear the input field after sending
      setSelectedImage(null); // Clear the selected image
      setSelectedFile(null); // Clear the selected file
    }
  };

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

      {/* Middle - inputValue Input */}
      <View style={{ flex: 4, flexDirection: "row" }}>
        <TextInput
          value={inputValue}
          //onChangeText={setInputValue}
          onChangeText={(value) => {
            handleInputChange(value);
          }}
          placeholder="Type a Message"
          placeholderTextColor={isDarkMode ? "#888" : "#999"}
          style={[
            styles.input,
            isDarkMode && styles.darkModeInput,
            { color: inputColor },
          ]}
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
      {selectedFile && (
        <View style={styles.previewContainer}>
          <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
            {selectedFile.name}
          </Text>
          <TouchableOpacity onPress={() => setSelectedFile(null)}>
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
        <TouchableOpacity style={styles.iconButton} onPress={handleFilePicker}>
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

        {/* Send Button (appears only when there's a inputValue or an image) */}
        {(inputValue.trim() || selectedImage) && (
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


// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   KeyboardAvoidingView,
//   Text,
// } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import * as ImagePicker from "expo-image-picker";
// import * as DocumentPicker from "expo-document-picker"; // Import DocumentPicker
// import Groq from "groq-sdk";
// import { VITE_REACT_APP_GROQ_API_KEY } from "@env";

// const groq = new Groq({
//   apiKey: VITE_REACT_APP_GROQ_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

// const TypingSection = ({ onSend, isDarkMode = true }) => {
//   const [inputValue, setInputValue] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null); // State for selected file
//   const [isAIProcessing, setIsAIProcessing] = useState(false);
//   const [inputColor, setInputColor] = useState("white"); // Default color

//   // Function to handle file selection
//   const handleFilePicker = async () => {
//     try {
//       console.log("Opening document picker...");
//       const result = await DocumentPicker.getDocumentAsync({
//         type: "*/*", // Allow all file types
//       });

//       // Check for cancellation
//       if (result.canceled) {
//         console.log("User cancelled file selection.");
//         return;
//       }

//       // Check for assets array in the result
//       if (result.assets && result.assets.length > 0) {
//         const selectedFile = result.assets[0]; // Get the first selected file
//         console.log("File selected:", selectedFile);

//         setSelectedFile(selectedFile); // Save the selected file (if needed)
//       } else {
//         console.error("Unexpected result structure:", result);
//       }
//     } catch (error) {
//       console.error("Error in document picker:", error);
//     }
//   };

//   const handleImagePicker = async () => {
//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       alert("Permission to access gallery is required!");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri); // Store the selected image URI
//     }
//   };

//   const handleSend = () => {
//     if (inputValue.trim() || selectedImage || selectedFile) {
//       console.log("selectedFile = ",selectedFile);
//       const chat = {
//         content: inputValue,
//         media: selectedImage, // Attach the image URI (if selected)
//         file: selectedFile, // Attach the file details (if selected)
//         timestamp: new Date().toISOString(), // Use ISO string for timestamp
//       };
//       onSend(chat);
//       setInputValue(""); // Clear the input field after sending
//       setSelectedImage(null); // Clear the selected image
//       setSelectedFile(null); // Clear the selected file
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={[styles.container, isDarkMode && styles.darkModeBackground]}
//     >
//       <View style={{ flex: 1 }}>
//         <TouchableOpacity style={[styles.iconButton]}>
//           <MaterialCommunityIcons
//             name="emoticon"
//             size={25}
//             color={isDarkMode ? "#fff" : "#000"}
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={{ flex: 4, flexDirection: "row" }}>
//         <TextInput
//           value={inputValue}
//           onChangeText={(value) => setInputValue(value)}
//           placeholder="Type a Message"
//           placeholderTextColor={isDarkMode ? "#888" : "#999"}
//           style={[
//             styles.input,
//             isDarkMode && styles.darkModeInput,
//             { color: inputColor },
//           ]}
//           multiline={true}
//           maxHeight={180}
//           scrollEnabled={true}
//         />
//       </View>

//       {selectedImage && (
//         <View style={styles.previewContainer}>
//           <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
//           <TouchableOpacity onPress={() => setSelectedImage(null)}>
//             <MaterialCommunityIcons
//               name="close-circle"
//               size={20}
//               color="#FF0000"
//             />
//           </TouchableOpacity>
//         </View>
//       )}

//       {selectedFile && (
//         <View style={styles.previewContainer}>
//           <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
//             {selectedFile.name}
//           </Text>
//           <TouchableOpacity onPress={() => setSelectedFile(null)}>
//             <MaterialCommunityIcons
//               name="close-circle"
//               size={20}
//               color="#FF0000"
//             />
//           </TouchableOpacity>
//         </View>
//       )}

//       <View style={styles.rightIcons}>
//         <TouchableOpacity
//           style={styles.iconButton}
//           onPress={handleFilePicker} // Open file picker
//         >
//           <MaterialCommunityIcons
//             name="paperclip"
//             size={25}
//             color={isDarkMode ? "#fff" : "#000"}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.iconButton}
//           onPress={handleImagePicker} // Open image picker
//         >
//           <MaterialCommunityIcons
//             name="camera"
//             size={25}
//             color={isDarkMode ? "#fff" : "#000"}
//           />
//         </TouchableOpacity>
//         {(inputValue.trim() || selectedImage || selectedFile) && (
//           <TouchableOpacity
//             style={[styles.iconButton, styles.sendButton]}
//             onPress={handleSend}
//           >
//             <MaterialCommunityIcons
//               name="send"
//               size={28}
//               color={isDarkMode ? "#34B7F1" : "#000"}
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default TypingSection;

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
