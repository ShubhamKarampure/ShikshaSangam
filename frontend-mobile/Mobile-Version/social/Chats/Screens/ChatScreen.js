import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import PageTitleText from "../../Components/PageTitleText";
import ReplyButton from "../../Components/ReplyButton";

export default function ChatScreen({navigation, route}){  // receiver contains the opponents data
  console.log(route.params.receiver);
  return (
    <View style={styles.container}>
      {/* <PageTitleText>This is chat Screen</PageTitleText> */}
      {/* <View style={styles.backButtonContainer}>
        <Button title="Back" onPress={onBackButtonPress} />
      </View> */}
      <View style={styles.chatArea}>
        <ReplyButton  />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 10,
    paddingTop: 10,
    //paddingBottom:1,
  },
  backButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  chatArea: {
    flex: 1,
    backgroundColor: "#8cfafa",
  },
});