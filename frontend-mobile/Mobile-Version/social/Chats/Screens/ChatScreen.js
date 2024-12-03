// import React, { useState } from "react";
// import { View, Text, FlatList, StyleSheet, Button, ScrollView, KeyboardAvoidingView } from "react-native";
// import PageTitleText from "../../Components/PageTitleText";
// import SenderChatBubble from "../Components/SenderChatBubble";
// import ReceiverChatBubble from "../Components/ReceiverChatBubble";
// import TypingSection from "../Components/TypingSection";

// import { chatsData } from "../../data/chatsData";

// export default function ChatScreen({navigation, route}){  // receiver contains the opponents data
//   //console.log(chatsData);
//   const chatInfo = route.params.receiver;
//   const [chatList, setChatList] = useState(chatsData);

//   console.log(chatInfo);
//   // console.log(chatsList);

//   const sender_profile_id = 1;
//   const sender_avatar = "https://via.placeholder.com/150/FF5733/FFFFFF";
//   const sender_username = "John Doe";


//   function renderChatBubble({item}){
//     // console.log('Here');
//     if(item.profile_id===sender_profile_id){
//       return (<SenderChatBubble chat={item}/>);
//     }
//     else{
//       return (<ReceiverChatBubble chat={item}/>);
//     }
//   }


//   function sendHandler(chat){
//     console.log(chat);
//     const newChatItem = {
//       profile_id: sender_profile_id,
//       avatar: sender_avatar,
//       username: sender_username,
//       content: chat.message,
//       timestamp: chat.timestamp.hoursMinutes,
//       isoString: chat.timestamp.isoString,
//     };

//     setChatList((prevList)=>{
//       return [...prevList, newChatItem];
//     });
//   }
//   return (
//     <View style={styles.container}>
//       <View style={styles.chatArea}>
//         <FlatList
//           data={chatList}
//           keyExtractor={(item) => item.profile_id.toString()+item.isoString}
//           renderItem={renderChatBubble}
//           contentContainerStyle={styles.listContent}
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
//     //paddingHorizontal: 2,
//     //paddingTop: 10,
//     //paddingBottom:1,
//     justifyContent: "center",
//   },
//   chatArea: {
//     flex: 1,
//     backgroundColor: "#0f0b01", //"#8cfafa",
//     //paddingBottom:10,
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
// });


// import React, { useState } from "react";
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Keyboard,
//   TouchableWithoutFeedback,
// } from "react-native";
// import SenderChatBubble from "../Components/SenderChatBubble";
// import ReceiverChatBubble from "../Components/ReceiverChatBubble";
// import TypingSection from "../Components/TypingSection";
// import KeyboardShift from "../../../common/Components/KeyBoardShift";

// import { chatsData } from "../../data/chatsData";

// export default function ChatScreen({ navigation, route }) {
//   const chatInfo = route.params.receiver;
//   const [chatList, setChatList] = useState(chatsData);

//   const sender_profile_id = 1;
//   const sender_avatar = "https://via.placeholder.com/150/FF5733/FFFFFF";
//   const sender_username = "John Doe";

//   function renderChatBubble({ item }) {
//     if (item.profile_id === sender_profile_id) {
//       return <SenderChatBubble chat={item} />;
//     } else {
//       return <ReceiverChatBubble chat={item} />;
//     }
//   }

//   function sendHandler(chat) {
//     const newChatItem = {
//       profile_id: sender_profile_id,
//       avatar: sender_avatar,
//       username: sender_username,
//       content: chat.message,
//       timestamp: chat.timestamp.hoursMinutes,
//       isoString: chat.timestamp.isoString,
//     };

//     setChatList((prevList) => [...prevList, newChatItem]);
//   }

//   return (
//     <KeyboardShift>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
//           <View style={styles.chatArea}>
//             <FlatList
//               data={chatList}
//               keyExtractor={(item) =>
//                 item.profile_id.toString() + item.isoString
//               }
//               renderItem={renderChatBubble}
//               contentContainerStyle={styles.listContent}
//               keyboardShouldPersistTaps="handled" // Allow taps to dismiss keyboard
//               sb
//             />
//           </View>
//           <View style={styles.typingSection}>
//             <TypingSection onSend={sendHandler} />
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardShift>
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
//     paddingBottom: 10,
//   },
//   typingSection: {
//     borderTopWidth: 1,
//     borderTopColor: "#333", // Add a border for visual separation
//   },
// });

import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import SenderChatBubble from "../Components/SenderChatBubble";
import ReceiverChatBubble from "../Components/ReceiverChatBubble";
import TypingSection from "../Components/TypingSection";
import { chatsData } from "../../data/chatsData";

export default function ChatScreen({ navigation, route }) {
  const chatInfo = route.params.receiver;
  const [chatList, setChatList] = useState(chatsData);

  const flatListRef = useRef(null); // Ref for the FlatList

  const sender_profile_id = 1;
  const sender_avatar = "https://via.placeholder.com/150/FF5733/FFFFFF";
  const sender_username = "John Doe";

  useEffect(() => {
    // Scroll to the bottom whenever chatList updates
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chatList]);

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

  return (
    <View style={styles.container}>
      <View style={styles.chatArea}>
        <FlatList
          ref={flatListRef} // Attach the ref to FlatList
          data={chatList}
          keyExtractor={(item) => item.profile_id.toString() + item.isoString}
          renderItem={renderChatBubble}
          contentContainerStyle={styles.listContent}
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



