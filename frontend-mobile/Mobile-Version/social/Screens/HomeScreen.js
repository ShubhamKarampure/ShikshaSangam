import React from "react";
import { View, FlatList, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity } from "react-native";
import { posts } from "../data/postsdata"; // Import your updated dummy data

export default function HomeScreen() {
  const isDarkMode = true; // Enforce dark mode by default

  const renderPost = ({ item }) => (
    <View style={[styles.post, isDarkMode && styles.postDark]}>
      {/* Header with author's profile image and information */}
      <View style={styles.header}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View>
          <Text style={[styles.author, isDarkMode && styles.textDark]}>{item.author}</Text>
          <Text style={[styles.timestamp, isDarkMode && styles.textDarkSecondary]}>{item.timestamp}</Text>
        </View>
      </View>
      {/* Post Title */}
      <Text style={[styles.title, isDarkMode && styles.textDark]}>{item.title}</Text>
      {/* Post Content */}
      <Text style={[styles.content, isDarkMode && styles.textDarkSecondary]}>{item.content}</Text>
      {/* Post Image */}
      <Image source={{ uri: item.image }} style={styles.postImage} />
      {/* Actions: Like, Comment, Share */}
      <View style={styles.actions}>
        <TouchableOpacity>
          <Text style={[styles.actionText, isDarkMode && styles.textDarkSecondary]}>
            👍 Like ({item.likes})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.actionText, isDarkMode && styles.textDarkSecondary]}>
            💬 Comment ({item.comments})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.actionText, isDarkMode && styles.textDarkSecondary]}>
            🔄 Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.feed}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  containerDark: { backgroundColor: "#121212" },
  feed: { padding: 10 },
  post: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10 },
  postDark: { backgroundColor: "#1E1E1E" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postImage: { width: "100%", height: 200, marginVertical: 10, borderRadius: 10 },
  author: { fontWeight: "bold", fontSize: 16, color: "#000" },
  textDark: { color: "#fff" },
  textDarkSecondary: { color: "#b3b3b3" },
  timestamp: { fontSize: 12, color: "gray" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5, color: "#000" },
  content: { fontSize: 14, marginBottom: 10, color: "#333" },
  actions: { flexDirection: "row", justifyContent: "space-between" },
  actionText: { fontSize: 14, color: "#007bff" },
});
