import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import MessageCard from "../Components/MessageCard";
import { fetchChats } from "../../../api/multimedia";
import { useChatContext } from "../../../Context/useChatContext";

const MessageScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { changeActiveChat } = useChatContext();
  let intervalId = useRef(null); // Use useRef to persist intervalId between re-renders

  const getAllChats = async () => {
    try {
      const fetchedChats = await fetchChats(); // Fetch chats from the backend
      console.log(fetchedChats);
      setChats(fetchedChats); // Update state with the fetched chats
      fetchedChats.forEach((chat) => {
        console.log(
          "Participants:",
          JSON.stringify(chat.participants, null, 2)
        );
        changeActiveChat(chat.id);
      });
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  };

  useEffect(() => {
    // Initial fetch
    getAllChats();

    // // Set up polling every 10 seconds
    // intervalId.current = setInterval(() => {
    //   getAllChats();
    // }, 10000);

    // // Cleanup interval on component unmount
    // return () => clearInterval(intervalId.current);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Start polling when screen gains focus
      intervalId.current = setInterval(() => {
        getAllChats();
      }, 10000);

      // Cleanup interval when screen loses focus
      return () => clearInterval(intervalId.current);
    }, [])
  );

  const handleMessagePress = (item) => {
    navigation.navigate("Chat", {
      receiver: item,
    });
  };

  const renderMessage = ({ item }) => (
    <MessageCard item={item} onPress={() => handleMessagePress(item)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default MessageScreen;
