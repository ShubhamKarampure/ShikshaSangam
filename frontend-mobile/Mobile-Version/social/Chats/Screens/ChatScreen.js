import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import SenderChatBubble from "../Components/SenderChatBubble";
import ReceiverChatBubble from "../Components/ReceiverChatBubble";
import TypingSection from "../Components/TypingSection";
import { chatsData } from "../../data/chatsData";
import { fetchMessages } from "../../../api/multimedia";

export default function ChatScreen({ navigation, route }) {
  const chatInfo = route.params.receiver;
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);
  const [messages, setMessages] = useState([]);
  
  const [chatList, setChatList] = useState(chatsData);
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if user is at the bottom

  const flatListRef = useRef(null); // Ref for the FlatList

  const sender_profile_id = 1;
  const sender_avatar = "https://via.placeholder.com/150/FF5733/FFFFFF";
  const sender_username = "John Doe";
  
  useEffect(() => {

    const fetchMessagesHandler = async () => {
      try {
        const response = await fetchMessages(chatInfo.id, {
        after_timestamp: lastMessageTimestamp,
      });
        console.log(response)
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };

    // Initial fetch
    fetchMessagesHandler();
    const latestMessage = response[response.length - 1];
    setLastMessageTimestamp(latestMessage.timestamp);

    // Scroll to the bottom only if the user is at the bottom
    if (
      // isAtBottom &&
      chatList[chatList.length - 1]?.profile_id === sender_profile_id
    ) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [chatList, isAtBottom]);

  function renderChatBubble({ item }) {
    if (item.profile_id === sender_profile_id) {
      return <SenderChatBubble chat={item} />;
    } else {
      return <ReceiverChatBubble chat={item} />;
    }
  }

  function sendHandler(chat) {
    const newChatItem = {
      profile_id: sender_profile_id,
      avatar: sender_avatar,
      username: sender_username,
      content: chat.message,
      timestamp: chat.timestamp.hoursMinutes,
      isoString: chat.timestamp.isoString,
    };
    setChatList((prevList) => [...prevList, newChatItem]);
  }

  function handleScroll(event) {
    // Check if the user is at the bottom of the chat list
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const atBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    setIsAtBottom(atBottom);
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatArea}>
        <FlatList
          ref={flatListRef}
          data={chatList}
          keyExtractor={(item) => item.profile_id.toString() + item.isoString}
          renderItem={renderChatBubble}
          contentContainerStyle={styles.listContent}
          onScroll={handleScroll} // Attach scroll handler
          scrollEventThrottle={16} // Throttle scroll events for performance
        />
      </View>
      <TypingSection onSend={sendHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
  },
  chatArea: {
    flex: 1,
    backgroundColor: "#0f0b01",
  },
  listContent: {
    paddingBottom: 20,
  },
});
