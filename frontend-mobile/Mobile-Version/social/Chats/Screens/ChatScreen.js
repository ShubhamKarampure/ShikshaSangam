// import React, { useState, useRef, useEffect } from "react";
// import { View, FlatList, StyleSheet } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import SenderChatBubble from "../Components/SenderChatBubble";
// import ReceiverChatBubble from "../Components/ReceiverChatBubble";
// import TypingSection from "../Components/TypingSection";
// import { chatsData } from "../../data/chatsData";
// import { fetchMessages,sendMessage } from "../../../api/multimedia";
// import { useProfileContext } from "../../../Context/ProfileContext";
// import { useFocusEffect } from "@react-navigation/native";

// export default function ChatScreen({ navigation, route }) {
//   const { profile } = useProfileContext();

//   const chatInfo = route.params.receiver; // info about the reciever side of chat

//   const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);
//   const [messages, setMessages] = useState([]);

//   const [chatList, setChatList] = useState(null); 
//   const [isAtBottom, setIsAtBottom] = useState(true); // Track if user is at the bottom

//   const flatListRef = useRef(null); // Ref for the FlatList

//   const sender_profile_id = profile.id;
//   const sender_avatar =
//     profile.avatar_image !== null
//       ? profile.avatar_image
//       : `https://ui-avatars.com/api/?name=${profile.full_name}&background=0D8ABC&color=fff`;

//   const sender_username = profile.full_name;
//   const receiver_avatar =
//     chatInfo.participants.avatar_image !== null
//       ? chatInfo.participants[0].avatar_image
//       : `https://ui-avatars.com/api/?name=${chatInfo.participants[0].full_name}&background=0D8ABC&color=fff`;
//   const reciever_username = chatInfo.participants[0].full_name;

//   // console.log('sender = ',sender_avatar);
//   // console.log("receiver = ", receiver_avatar);
//   // console.log("sender = ", sender_username);
//   // console.log("receiver = ", reciever_username);
//   // Mapping of senders to their avatars
  
//   const avatars = {  // use names as keys
//     [reciever_username] : receiver_avatar,
//     [sender_username] : sender_avatar,
//   };
//   // console.log(avatars);

  // const fetchMessagesHandler = async () => {   // for new chats
  //   try {  
  //     const response = await fetchMessages(chatInfo.id, {
  //       after_timestamp: lastMessageTimestamp,
  //     });
  //     //console.log("response = ", response);
  //     //console.log("response in fetchMessagesHandler = ", response);
  //     if(response.length > 0){
  //       console.log('response = ',response);
  //       const latestMessage = response[response.length - 1];
  //       console.log('lastestmessage = ',latestMessage);
  //       setLastMessageTimestamp(() => {
  //         if (latestMessage !== null) return latestMessage.timestamp;
  //         else return null;
  //       });

  //       // Create a new array with the additional avatar field
  //       const updatedResponse = response.map((message) => ({
  //         ...message,
  //         avatar: avatars[message.sender], // Add avatar field;
  //       }));
  //       //console.log(avatars);

  //       setChatList((prevList) => {
  //         if (prevList === null) {
  //           return updatedResponse;
  //         } 
  //         return [...prevList, ...updatedResponse];
  //       });
  //     }
      

  //   } catch (err) {
  //     console.error("Error fetching messages", err);
  //   }
  // };

//   useEffect(() => {
//     // need to think when to fetch
//     // Initial fetch
//     fetchMessagesHandler(); // currently fetched once
//   }, []);

//    useFocusEffect(
//      React.useCallback(() => {
//        const intervalId = setInterval(() => {
//          fetchMessagesHandler();
//        }, 5000);

//        // Cleanup the interval when focus is lost
//        return () => clearInterval(intervalId);
//      }, [lastMessageTimestamp])
//    );

//   // useEffect(() => {
//   //   // Scroll to the bottom only if the user is at the bottom
//   //   if (
//   //     // isAtBottom &&
//   //     chatList!==null &&
//   //     chatList[chatList.length - 1]?.sender === sender_username
//   //   ) {
//   //     //console.log("chatlist in second use effect = ", chatList);
//   //     flatListRef.current?.scrollToEnd({ animated: true });
//   //   }
//   // }, [chatList, isAtBottom]);

  

//   function renderChatBubble({ item }) {
//     if(item.content!==null){   // some picture only media exists with no content
//       if (item.sender === sender_username) {
//         return <SenderChatBubble chat={item} />;
//       } else {
//         return <ReceiverChatBubble chat={item} />;
//       }
//     }
//   }
//   const sendHandler = async (chat) => {
//     // const byBackend = {
//     //   chat: 41,
//     //   content: "hello Aryan Kanyawar",
//     //   id: 166,
//     //   is_read: false,
//     //   media: null,
//     //   sender: "Shubham Karampure",
//     //   timestamp: "2024-12-05T01:03:52.245434Z",
//     // };

//     try {
//       if (!chat.message) return;
//       const newChatItem = await sendMessage(chatInfo.id, chat.message);
//       console.log("newChatItem = ", newChatItem);

//       const formattedChatItem = {
//         ...newChatItem,
//         avatar: sender_avatar,
//       };

//       setChatList((prevList) => [...prevList, formattedChatItem]);

//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   // function handleScroll(event) {
//   //   // Check if the user is at the bottom of the chat list
//   //   const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
//   //   const atBottom =
//   //     layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
//   //   setIsAtBottom(atBottom);
//   // }

//   return (
//     <View style={styles.container}>
//       <View style={styles.chatArea}>
//         <FlatList
//           ref={flatListRef}
//           data={chatList}
//           keyExtractor={(item) => item.id.toString()+new Date().toDateString()}
//           renderItem={renderChatBubble}
//           contentContainerStyle={styles.listContent}
//           //onScroll={handleScroll} // Attach scroll handler
//           scrollEventThrottle={16} // Throttle scroll events for performance
//         />
//       </View>
//       <TypingSection onSend={sendHandler} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#121212",
//     justifyContent: "center",
//   },
//   chatArea: {
//     flex: 1,
//     backgroundColor: "#0f0b01",
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
// });




import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import SenderChatBubble from "../Components/SenderChatBubble";
import ReceiverChatBubble from "../Components/ReceiverChatBubble";
import TypingSection from "../Components/TypingSection";
import { chatsData } from "../../data/chatsData";
import { fetchMessages, sendMessage } from "../../../api/multimedia";
import { useProfileContext } from "../../../Context/ProfileContext";
import { useFocusEffect } from "@react-navigation/native";

export default function ChatScreen({ navigation, route }) {
  const { profile } = useProfileContext();

  const chatInfo = route.params.receiver; // info about the reciever side of chat

  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);
  const [messages, setMessages] = useState([]);

  const [chatList, setChatList] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if user is at the bottom

  const flatListRef = useRef(null);
  const isMounted = useRef(true);

  const sender_profile_id = profile.id;
  const sender_avatar =
    profile.avatar_image !== null
      ? profile.avatar_image
      : `https://ui-avatars.com/api/?name=${profile.full_name}&background=0D8ABC&color=fff`;

  const sender_username = profile.full_name;
  const receiver_avatar =
    chatInfo.participants.avatar_image !== null
      ? chatInfo.participants[0].avatar_image
      : `https://ui-avatars.com/api/?name=${chatInfo.participants[0].full_name}&background=0D8ABC&color=fff`;
  const reciever_username = chatInfo.participants[0].full_name;

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

        setChatList((prevList) => {
          if (prevList === null) {
            return updatedResponse;
          }
          return [...prevList, ...updatedResponse];
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
      }, 1000);

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
  const sendHandler = async (chat) => {
    // const byBackend = {
    //   chat: 41,
    //   content: "hello Aryan Kanyawar",
    //   id: 166,
    //   is_read: false,
    //   media: null,
    //   sender: "Shubham Karampure",
    //   timestamp: "2024-12-05T01:03:52.245434Z",
    // };

    try {
      const newChatItem = await sendMessage(chatInfo.id, chat.message);
      console.log("newChatItem = ", newChatItem);

      const formattedChatItem = {
        ...newChatItem,
        avatar: sender_avatar,
      };

      //setChatList((prevList) => [...prevList, formattedChatItem]);
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
          keyExtractor={(item) =>
            item.id.toString() + new Date().toDateString()
          }
          renderItem={renderChatBubble}
          contentContainerStyle={styles.listContent}
          //onScroll={handleScroll} // Attach scroll handler
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

