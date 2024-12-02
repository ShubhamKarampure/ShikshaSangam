import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MessageCard from "../Components/MessageCard";
import PageTitleText from "../../Components/PageTitleText";
import ChatScreen from "./ChatScreen";

const MessageScreen = ({navigation}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Alice",
      message: "Hey, how are you?",
      timestamp: "10:45 AM",
    },
    { id: 2, name: "Bob", message: "Meeting at 2 PM?", timestamp: "09:30 AM" },
    {
      id: 3,
      name: "Charlie",
      message: "Let’s catch up later!",
      timestamp: "Yesterday",
    },
  ]);
  const [isMessageScreen, setIsMessageScreen] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null); // State to store selected message

  const handleMessagePress = (item) => {
    //console.log("Message pressed:", message);
    // setSelectedMessage(item);
    // setIsMessageScreen(false);
    navigation.navigate('Chat', {
      receiver: item
    })
  };

  const renderMessage = ({ item }) => (
    <MessageCard item={item} onPress={() => handleMessagePress(item)} />
  );
  
  let screen = (
    <View style={styles.container}>
      <PageTitleText>Messages</PageTitleText>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  // if (!isMessageScreen) {
  //   screen = <ChatScreen receiver={selectedMessage} />;
  // }
  return screen;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    //paddingTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default MessageScreen;
