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
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";

const PDFView = ({ pdfUri, isDarkMode = true }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [base64Pdf, setBase64Pdf] = useState(null);

  const downloadAndEncodePDF = async () => {
    if (!pdfUri) {
      Alert.alert("Error", "No PDF file found.");
      return null;
    }

    try {
      const fileName = pdfUri.split("/").pop(); // Extract the file name
      const cachePath = `${FileSystem.cacheDirectory}${fileName}`;

      // Download the file to cache
      const { uri: downloadedUri } = await FileSystem.downloadAsync(
        pdfUri,
        cachePath
      );
      console.log("Downloaded PDF URI:", downloadedUri);

      // Read the file and encode it to base64
      const base64Encoded = await FileSystem.readAsStringAsync(downloadedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Check if base64Encoded data is empty
      if (!base64Encoded || base64Encoded.length === 0) {
        console.error("Base64 encoding failed or file is empty.");
        return null;
      }

      console.log("Base64 Encoded PDF:", base64Encoded); // Debugging log
      return `data:application/pdf;base64,${base64Encoded}`;
    } catch (error) {
      console.error("Error downloading or encoding the file:", error);
      Alert.alert("Error", "Failed to process the PDF file.");
      return null;
    }
  };

  const viewPDF = async () => {
    try {
      const encodedPdf = await downloadAndEncodePDF();
      if (!encodedPdf) {
        console.error("Encoded PDF is empty.");
        return;
      }
      setBase64Pdf(encodedPdf);
      setModalVisible(true);
    } catch (error) {
      console.error("Error viewing PDF:", error);
      Alert.alert("Error", "Failed to open the PDF. Please try again.");
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={viewPDF}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for PDF Viewer */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          {base64Pdf ? (
            <WebView
              source={{ uri: base64Pdf }}
              style={styles.webview}
              originWhitelist={["*"]}
            />
          ) : (
            <Text style={styles.errorText}>Failed to load PDF.</Text>
          )}
        </View>
      </Modal>
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
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#3498DB",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#E74C3C",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  webview: {
    flex: 1,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});
