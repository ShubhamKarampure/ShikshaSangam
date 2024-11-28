import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const MessageScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: 'Alice', message: 'Hey, how are you?', timestamp: '10:45 AM' },
    { id: 2, name: 'Bob', message: 'Meeting at 2 PM?', timestamp: '09:30 AM' },
    { id: 3, name: 'Charlie', message: 'Let’s catch up later!', timestamp: 'Yesterday' },
  ]);

  const renderMessage = ({ item }) => (
    <TouchableOpacity style={styles.messageCard} activeOpacity={0.7}>
      <Text style={styles.messageName}>{item.name}</Text>
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Messages</Text>
      <FlatList
        data={messages}
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
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  messageCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  messageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1DA1F2',
  },
  messageText: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
});

export default MessageScreen;
