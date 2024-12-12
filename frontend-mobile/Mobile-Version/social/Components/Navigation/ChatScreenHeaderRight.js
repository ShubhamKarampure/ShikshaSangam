import React from "react";
import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { clearChat } from "../../../api/multimedia";

export default function ChatScreenHeaderRight({ route }) {
  const chat = route.params.receiver;
  const setChatList = route.params.setChatList;
  //console.log('route.params = ',route.params);
  const [visible, setVisible] = useState(false);
  let toggle = () => {
    //console.log('clear chat pressed');
    return setVisible(!visible);
  }
  const clearChatHandler = () => {
    toggle();
    Alert.alert("Clear Chat", "Are you sure you want to clear the chat?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: clearChatRequest},
    ]);
  };

  const clearChatRequest = async () => {
    try {
      const response = await clearChat(chat.id);
      //console.log("clear chat response = ", response);
      //setChatList([]);
    } catch (err) {
      console.error("Error clearing chat of chat_id " + chat.id + " :", err);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      {/* <TouchableOpacity style={styles.iconButton} onPress={toggle}>
        <MaterialCommunityIcons name="dots-vertical" size={25} color="#fff" />
      </TouchableOpacity> */}
      <Menu
        visible={visible}
        anchor={
          <TouchableOpacity style={styles.iconButton} onPress={toggle}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        }
        onRequestClose={toggle}
      >
        <MenuItem onPress={clearChatHandler}>Clear chat</MenuItem>
      </Menu>
    </>
  );
}
const styles = StyleSheet.create({
  iconButton: {
    marginHorizontal: 8,
    //backgroundColor:'blue'
  },
});


