// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
// } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Pdf from "react-native-pdf";

// const PDFView = ({ pdfFile }) => {
//   const { uri, name, size, mimeType } = pdfFile;

//   if (mimeType !== "application/pdf") {
//     Alert.alert("Unsupported File", "The selected file is not a valid PDF.");
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       {/* Metadata Section */}
//       <View style={styles.metadataContainer}>
//         <Text style={styles.metadataText}>Name: {name}</Text>
//         <Text style={styles.metadataText}>
//           Size: {(size / 1024).toFixed(2)} KB
//         </Text>
//       </View>

//       {/* PDF Viewer Section */}
//       <View style={styles.pdfContainer}>
//         <Pdf
//           source={{ uri }}
//           onLoadComplete={(numberOfPages) => {
//             console.log(`Loaded PDF with ${numberOfPages} pages`);
//           }}
//           onError={(error) => {
//             console.error("PDF Load Error:", error);
//             Alert.alert("Error", "Failed to load the PDF.");
//           }}
//           style={styles.pdf}
//         />
//       </View>

//       {/* Back Button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => Alert.alert("Go Back")}
//       >
//         <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
//         <Text style={styles.backButtonText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default PDFView;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#333", // Dark mode background
//   },
//   metadataContainer: {
//     padding: 10,
//     backgroundColor: "#444",
//     borderBottomWidth: 1,
//     borderBottomColor: "#555",
//   },
//   metadataText: {
//     color: "#fff",
//     fontSize: 14,
//     marginVertical: 2,
//   },
//   pdfContainer: {
//     flex: 1,
//     margin: 10,
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#fff",
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get("window").width - 20,
//     height: Dimensions.get("window").height - 150,
//   },
//   backButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//     backgroundColor: "#3498DB",
//     borderRadius: 5,
//     margin: 10,
//   },
//   backButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     marginLeft: 5,
//   },
// });

// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import * as Sharing from "expo-sharing";

// const PDFView = ({ pdfUri, isDarkMode = true }) => {
//   // Function to share or open the PDF file
//   const sharePDF = async () => {
//     try {
//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(pdfUri);
//       } else {
//         Alert.alert(
//           "Cannot Open File",
//           "Sharing is not available on this device."
//         );
//       }
//     } catch (error) {
//       console.error("Error sharing PDF:", error);
//       Alert.alert("Error", "An error occurred while trying to open the file.");
//     }
//   };

//   return (
//     <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
//       <View style={styles.iconAndText}>
//         <MaterialCommunityIcons
//           name="file-pdf-box"
//           size={30}
//           color={isDarkMode ? "#E74C3C" : "#C0392B"}
//         />
//         <Text style={[styles.text, isDarkMode && styles.darkModeText]}>
//           PDF File
//         </Text>
//       </View>
//       <TouchableOpacity style={styles.button} onPress={sharePDF}>
//         <Text style={styles.buttonText}>Open</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default PDFView;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#fff",
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   darkModeContainer: {
//     backgroundColor: "#444",
//   },
//   iconAndText: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   text: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: "#333",
//   },
//   darkModeText: {
//     color: "#ddd",
//   },
//   button: {
//     backgroundColor: "#3498DB",
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
// });
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const PDFView = ({ pdfUri, isDarkMode = true }) => {
  const openPDFExternally = async () => {
    try {
      if (!pdfUri) {
        Alert.alert("Error", "No PDF file found.");
        return;
      }

      // Check if the Sharing API is available
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(
          "Error",
          "Sharing is not available on this device. Please try another option."
        );
        return;
      }

      // Copy the file to a location accessible for sharing
      const cachePath = `${FileSystem.cacheDirectory}shared.pdf`;
      await FileSystem.copyAsync({
        from: pdfUri,
        to: cachePath,
      });

      // Open the "Open with" dialog using the Sharing API
      await Sharing.shareAsync(cachePath);
    } catch (error) {
      console.error("Error opening file:", error);
      Alert.alert("Error", "Failed to open the file. Please try again.");
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <View style={styles.iconAndText}>
        <MaterialCommunityIcons
          name="file-pdf-box"
          size={30}
          color={isDarkMode ? "#E74C3C" : "#C0392B"}
        />
        <Text style={[styles.text, isDarkMode && styles.darkModeText]}>
          PDF File
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={openPDFExternally}>
        <Text style={styles.buttonText}>Open</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PDFView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  darkModeContainer: {
    backgroundColor: "#444",
  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  darkModeText: {
    color: "#ddd",
  },
  button: {
    backgroundColor: "#3498DB",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
