import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MessageCard from "../Components/MessageCard";
import { fetchChats } from "../../../api/multimedia";

const MessageScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch chats when the component mounts
    const getChats = async () => {
      try {
        const fetchedChats = await fetchChats(); // Fetch chats using the API function
        setMessages(fetchedChats); // Update state with the fetched chats
      } catch (err) {
        setError("Failed to fetch chats. Please try again.");
        console.error(err);
      } finally {
        setLoading(false); // Ensure loading is stopped regardless of success or failure
      }
    };

    getChats();
  }, []);

  const handleMessagePress = (item) => {
    navigation.navigate("Chat", {
      receiver: item,
    });
  };

  const renderMessage = ({ item }) => (
    <MessageCard item={item} onPress={() => handleMessagePress(item)} />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.DMChat_id.toString()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  errorText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default MessageScreen;
