import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MessageCard from "../Components/MessageCard";
import PageTitleText from "../../Components/PageTitleText";
import ChatScreen from "./ChatScreen";
import { messagesData } from "../../data/messagesData";

const MessageScreen = ({navigation}) => {
  const [messages, setMessages] = useState(messagesData);
  const sender = {
    profile_id: 1,
    avatar: "https://via.placeholder.com/150",
    username: "John Doe",
  };


  const handleMessagePress = (item) => {
    //console.log("Message pressed:", message);
    // setSelectedMessage(item);
    // setIsMessageScreen(false);
    navigation.navigate('Chat', {
      receiver: item,
    })
  };

  const renderMessage = ({ item }) => (
    <MessageCard item={item} onPress={() => handleMessagePress(item)} />
  );
  
  let screen = (
    <View style={styles.container}>
      {/* <PageTitleText>Messages</PageTitleText> */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.DMChat_id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

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
