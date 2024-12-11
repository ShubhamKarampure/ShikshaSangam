// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Alert,
// } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import * as FileSystem from "expo-file-system";
// import { WebView } from "react-native-webview";

// const PDFView = ({ pdfUri, isDarkMode = true }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [localPdfUri, setLocalPdfUri] = useState(null);

//   const downloadPDF = async () => {
//     if (!pdfUri) {
//       Alert.alert("Error", "No PDF file found.");
//       return null;
//     }

//     const fileName = pdfUri.split("/").pop(); // Extract the file name
//     const cachePath = `${FileSystem.cacheDirectory}${fileName}`;
//     console.log("inside download pdf cachedpath =", cachePath);

//     try {
//       // Download the file to cache
//       const { uri: downloadedUri } = await FileSystem.downloadAsync(
//         pdfUri,
//         cachePath
//       );
//       console.log("downloadedUri =", downloadedUri);
//       return downloadedUri;
//     } catch (error) {
//       console.error("Error downloading file:", error);
//       Alert.alert("Error", "Failed to download the file.");
//       return null;
//     }
//   };

//   const viewPDF = async () => {
//     try {
//       const downloadedUri = await downloadPDF();
//       if (!downloadedUri) {
//         console.log("PDF is not downloaded.");
//         return;
//       }
//       setLocalPdfUri(downloadedUri);
//       setModalVisible(true);
//     } catch (error) {
//       console.error("Error viewing PDF:", error);
//       Alert.alert("Error", "Failed to open the PDF. Please try again.");
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
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={viewPDF}>
//           <Text style={styles.buttonText}>View</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Modal for PDF Viewer */}
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => setModalVisible(false)}
//           >
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//           {localPdfUri && (
//             <WebView
//               source={{ uri: localPdfUri }}
//               style={styles.webview}
//               originWhitelist={["*"]}
//             />
//           )}
//         </View>
//       </Modal>
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
//   buttonContainer: {
//     flexDirection: "row",
//   },
//   button: {
//     backgroundColor: "#3498DB",
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   closeButton: {
//     padding: 10,
//     backgroundColor: "#E74C3C",
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   webview: {
//     flex: 1,
//   },
// });


import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const PDFView = ({ uri, isDarkMode = true }) => {
  const [downloading, setDownloading] = useState(false);

  const downloadAndSharePDF = async () => {
    if (!uri) {
      Alert.alert("Error", "No PDF file URI provided.");
      return;
    }

    setDownloading(true);

    try {
      const fileName = uri.split("/").pop();
      const cachePath = `${FileSystem.cacheDirectory}${fileName}`;

      // Download the PDF to the cache directory
      const { uri: downloadedUri } = await FileSystem.downloadAsync(
        uri,
        cachePath
      );
      console.log("Downloaded PDF URI:", downloadedUri);

      // Check if sharing is available
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(downloadedUri);
      } else {
        Alert.alert(
          "Sharing Not Available",
          "Your device does not support file sharing."
        );
      }
    } catch (error) {
      console.error("Error opening the PDF:", error);
      Alert.alert("Error", "Failed to open the PDF.");
    } finally {
      setDownloading(false);
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
          PDF Document
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={downloadAndSharePDF}
        disabled={downloading}
      >
        <Text style={styles.buttonText}>
          {downloading ? "Downloading..." : "View"}
        </Text>
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
    //justifyContent: "flex-end",
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




// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Alert,
// } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import * as FileSystem from "expo-file-system";
// import { WebView } from "react-native-webview";

// const PDFView = ({ uri, isDarkMode = true }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [base64Pdf, setBase64Pdf] = useState(null);

//   const downloadAndEncodePDF = async () => {
//     if (!uri) {
//       Alert.alert("Error", "No PDF file URI provided.");
//       return null;
//     }

//     try {
//       const fileName = uri.split("/").pop(); // Extract file name
//       const cachePath = `${FileSystem.cacheDirectory}${fileName}`;

//       // Download PDF to cache
//       const { uri: downloadedUri } = await FileSystem.downloadAsync(
//         uri,
//         cachePath
//       );
//       console.log("Downloaded PDF URI:", downloadedUri);

//       // Encode to base64
//       const base64Encoded = await FileSystem.readAsStringAsync(downloadedUri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       if (!base64Encoded || base64Encoded.length === 0) {
//         console.error("Base64 encoding failed or file is empty.");
//         return null;
//       }

//       return `data:application/pdf;base64,${base64Encoded}`;
//     } catch (error) {
//       console.error("Error processing the PDF:", error);
//       Alert.alert("Error", "Failed to process the PDF.");
//       return null;
//     }
//   };

//   const viewPDF = async () => {
//     try {
//       const encodedPdf = await downloadAndEncodePDF();
//       if (encodedPdf) {
//         setBase64Pdf(encodedPdf);
//         setModalVisible(true);
//       }
//     } catch (error) {
//       console.error("Error viewing PDF:", error);
//       Alert.alert("Error", "Failed to open the PDF.");
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
//           PDF Document
//         </Text>
//       </View>
//       <TouchableOpacity style={styles.button} onPress={viewPDF}>
//         <Text style={styles.buttonText}>View</Text>
//       </TouchableOpacity>

//       {/* PDF Modal */}
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => setModalVisible(false)}
//           >
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//           {base64Pdf ? (
//             <WebView
//               source={{ uri: base64Pdf }}
//               style={styles.webview}
//               originWhitelist={["*"]}
//               javaScriptEnabled
//               scalesPageToFit
//             />
//           ) : (
//             <Text style={styles.errorText}>Failed to load PDF.</Text>
//           )}
//         </View>
//       </Modal>
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
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   closeButton: {
//     padding: 10,
//     backgroundColor: "#E74C3C",
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   webview: {
//     flex: 1,
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     fontSize: 16,
//     marginTop: 20,
//   },
// });
