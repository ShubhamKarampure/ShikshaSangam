import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import PageTitleText from "../../Components/PageTitleText";
import ReplySection from "../../Components/ReplySection";
import PDFView from "../Components/PdfView";

export default function GroupChatScreen(props) {
  //console.log(receiver);
  file = {
    mimeType: "application/pdf",
    name: "prob-Discount in a Shop.pdf",
    size: 89756,
    uri: "https://res.cloudinary.com/dhp4wuv2x/image/upload/file:///data/user/0/host.exp.exponent/cache/DocumentPicker/3829eac1-032d-48b1-89d3-d2ad5c5b7e43.pdf",
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatArea}>
        <PDFView pdfUri={file.uri}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  chatArea: {
    flex: 1,
    backgroundColor: "white",
  },
});



