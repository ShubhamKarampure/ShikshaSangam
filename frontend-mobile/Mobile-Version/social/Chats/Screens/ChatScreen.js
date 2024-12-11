import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { View, FlatList, StyleSheet, Animated, Easing } from "react-native";
import { StatusBar } from "expo-status-bar";
import SenderChatBubble from "../Components/SenderChatBubble";
import ReceiverChatBubble from "../Components/ReceiverChatBubble";
import TypingSection from "../Components/TypingSection";
import { fetchMessages, sendMessage, sendMedia, sendFile } from "../../../api/multimedia";
import { useProfileContext } from "../../../Context/ProfileContext";
import { useFocusEffect } from "@react-navigation/native";
import { CHATSCREEN_POOLING } from "../../../constants";
import { defaultAvatar } from "../../../Utility/urlUtils";

export default function ChatScreen({ navigation, route }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { profile } = useProfileContext();
  const chatInfo = route.params.receiver; // info about the reciever side of chat

  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);
  const [messages, setMessages] = useState([]);

  const [chatList, setChatList] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if user is at the bottom

  const flatListRef = useRef(null);
  const isMounted = useRef(true);

  const sender_profile_id = profile.id;

  const sender_username = profile.full_name;
  const sender_avatar =
    profile.avatar_image !== null
      ? profile.avatar_image
      : defaultAvatar(sender_username);

  
  const reciever_username = chatInfo.participants[0].full_name;
  const receiver_avatar =
    chatInfo.participants.avatar_image !== null
      ? chatInfo.participants[0].avatar_image
      : defaultAvatar(reciever_username);

  

  const avatars = {
    // use names as keys
    [reciever_username]: receiver_avatar,
    [sender_username]: sender_avatar,
  };
  // console.log(avatars);

  const fetchMessagesHandler = async () => {
    // for new chats
    try {
      const response = await fetchMessages(chatInfo.id, {
        after_timestamp: lastMessageTimestamp,
      });
      //console.log("response = ", response);
      //console.log("response in fetchMessagesHandler = ", response);
      if (response.length > 0) {
        console.log("response = ", response);
        const latestMessage = response[response.length - 1];
        console.log("lastestmessage = ", latestMessage);
        setLastMessageTimestamp(() => {
          if (latestMessage !== null) return latestMessage.timestamp;
          else return null;
        });

        // Create a new array with the additional avatar field
        const updatedResponse = response.map((message) => ({
          ...message,
          avatar: avatars[message.sender], // Add avatar field;
        }));

        //console.log(avatars);

        setChatList((prevMessages) => {
          const newMessages = updatedResponse.filter(
            (newMsg) =>
              !prevMessages.some((existingMsg) => existingMsg.id === newMsg.id)
          );
          return [...prevMessages, ...newMessages];
        });
      }
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  useEffect(() => {
    // need to think when to fetch
    // Initial fetch
    fetchMessagesHandler(); // currently fetched once
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => {
        fetchMessagesHandler();
      }, CHATSCREEN_POOLING);

      // Cleanup the interval when focus is lost
      return () => clearInterval(intervalId);
    }, [lastMessageTimestamp])
  );

  function renderChatBubble({ item }) {
    if (item.sender === sender_username) {
      return <SenderChatBubble chat={item} />;
    } else {
      return <ReceiverChatBubble chat={item} />;
    }
  }

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendHandler = async (chat) => {
    try {
      let newChatItem;
      if(chat.media===null && chat.file===null){
        newChatItem = await sendMessage(chatInfo.id, chat.content); 
      }
      else if(chat.file===null){
        newChatItem = await sendMedia(chatInfo.id, chat.content, chat.media); // image only
      }
      else{
        newChatItem = await sendFile(chatInfo.id, chat.content, chat.file);  
      }
      
      console.log("newChatItem = ", newChatItem);

      // const formattedChatItem = {
      //   ...newChatItem,
      //   avatar: sender_avatar,
      // };
      fetchMessagesHandler(); // call immediately to fetch

      scrollToBottom(); // scroll to bottom
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatArea}>
        <FlatList
          ref={flatListRef}
          data={chatList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderChatBubble}
          contentContainerStyle={styles.listContent}
          //onScroll={handleScroll} // Attach scroll handler
          //onContentSizeChange={scrollToBottom} // Auto-scroll on content size change
          scrollEventThrottle={16} // Throttle scroll events for performance
        />
      </View>
      <TypingSection onSend={sendHandler} scrollToBottom={scrollToBottom} />
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

