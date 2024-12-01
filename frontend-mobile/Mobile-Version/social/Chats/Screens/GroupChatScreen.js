import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import PageTitleText from "../../Components/PageTitleText";

export default function GroupChatScreen(props) {
  //console.log(receiver);
  return (
    <View style={styles.container}>
      <PageTitleText>This is Group chat Screen</PageTitleText>
      <View style={styles.chatArea}></View>
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



