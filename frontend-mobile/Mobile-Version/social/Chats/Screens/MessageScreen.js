import React, { useState,useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MessageCard from "../Components/MessageCard";
import PageTitleText from "../../Components/PageTitleText";
import ChatScreen from "./ChatScreen";
import { messagesData } from "../../data/messagesData";
import { fetchChats } from "../../../api/multimedia";

const MessageScreen = ({navigation}) => {
  const [messages, setMessages] = useState(messagesData);
  const [chat, setChats] = useState();
  
  useEffect(() => {
    const getAllchats = async () => {
      try {
        const chats = await fetchChats(); // Fetch chats using the API function
        console.log(chats)
        console.log(chats.participants)
        chats.forEach((chat) => {
          console.log("Participants:", JSON.stringify(chat.participants, null, 2));
        });
        setChats(chats); // Update state with fetched chats
      } catch (err) {
        console.error("Error fetching chats:", err);
        setError(err.message); // Set error state
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };
    getAllchats(); // Call the function
  }, []); // Empty dependency array ensures this runs only once
  
  
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
