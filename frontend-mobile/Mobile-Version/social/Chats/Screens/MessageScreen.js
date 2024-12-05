// import React, { useState,useEffect } from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MessageCard from "../Components/MessageCard";
// import PageTitleText from "../../Components/PageTitleText";
// import ChatScreen from "./ChatScreen";
// import { useMessageContext } from "../../../Context/MessageContext";
// import { messagesData } from "../../data/messagesData";
// import { fetchChats } from "../../../api/multimedia";
// import timePassed from "../../../Utility/timePassed";
// import { useChatContext } from "react-native-gifted-chat";

// const MessageScreen = ({navigation}) => {
//   const [messages, setMessages] = useState(messagesData);
//   //const { messages, addMessage, removeMessage } = useMessageContext(); // Access context
//   const [chats, setChats] = useState();
//   const {changeActiveChat} = useChatContext();

//   useEffect(() => {
//     const getAllchats = async () => {
//       try {
//         const chats = await fetchChats(); // Fetch chats using the API function
//         console.log(chats);
//         console.log(chats.participants);
//         chats.forEach((chat) => {
//           console.log(
//             "Participants:",
//             JSON.stringify(chat.participants, null, 2)
//           );
//           changeActiveChat(chat.id);
//         });
//         setChats(chats); // Update state with fetched chats
//       } catch (err) {
//         console.error("Error fetching chats:", err);
//         setError(err.message); // Set error state
//       } finally {
//         setLoading(false); // Set loading to false once the fetch is complete
//       }
//     };
//     getAllchats(); // Call the function
//   }, []); // Empty dependency array ensures this runs only once

//   const loggedInUser = {
//     profile_id: 1,
//     avatar: "https://via.placeholder.com/150",
//     username: "John Doe",
//   };

//   const handleMessagePress = (item) => {
//     //console.log("Message pressed:", message);
//     // setSelectedMessage(item);
//     // setIsMessageScreen(false);
//     navigation.navigate("Chat", {
//       receiver: item,
//     });
//   };

//   const renderMessage = ({ item }) => (
//     <MessageCard item={item} onPress={() => handleMessagePress(item)  } />
//   );

//   let screen = (
//     <View style={styles.container}>
//       {/* <PageTitleText>Messages</PageTitleText> */}
//       <FlatList
//         data={chats}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderMessage}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );

//   return screen;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#121212",
//     paddingHorizontal: 20,
//     //paddingTop: 10,
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
// });

// export default MessageScreen;



import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MessageCard from "../Components/MessageCard";
import { fetchChats } from "../../../api/multimedia";
import { useChatContext } from "../../../Context/useChatContext";

const MessageScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { changeActiveChat } = useChatContext();

  useEffect(() => {
    let intervalId;

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

    // Initial fetch
    getAllChats();

    // Set up polling every 3 seconds
    intervalId = setInterval(() => {
      getAllChats();
    }, 1000000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [changeActiveChat]); // Include `changeActiveChat` if used in the effect

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
