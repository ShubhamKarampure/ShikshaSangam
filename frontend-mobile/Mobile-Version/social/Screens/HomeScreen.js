import React from "react";
import { View, FlatList, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity,ActivityIndicator } from "react-native";
import { useState,useEffect } from "react";
import { posts } from "../data/postsdata"; // Import your updated dummy data
import LikeButton from "../Components/LikeButton";
import CommentButton from "../Components/CommentButton";
import ShareButton from "../Components/ShareButton";
import PostCard from "../Components/PostCard";
import { useAuthContext } from "../../Context/useAuthContext";
import { useFocusEffect } from "@react-navigation/native";

import { getAllFeed } from "../../api/feed";
export default function HomeScreen({navigation}) {   // GET  /social/posts/list_posts/    to get the list of post objects

  const isDarkMode = true; // Enforce dark mode by default

  const [scrollOffset, setScrollOffset] = React.useState(0);
  const flatListRef = React.useRef(null); // Reference to the FlatList
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.y); // Save the scroll offset
  };

  // const handleNavigateToComments = (postId) => {
  //   navigation.navigate("CommentSection", { postId });
  // };
  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getAllFeed();
      setPosts(fetchedPosts); // Update posts with API data
      console.log(fetchedPosts);
      
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Load data or perform updates here
      //console.log("HomeScreen is focused");
    }, [])
  );
  useEffect(() => {
    //console.log(posts);
    
    
    fetchPosts(); // Fetch posts on component mount
    // console.log("Post data:", posts);

  }, []);

  
  const renderPost = ({ item }) => (
    <PostCard item={item} isDarkMode={isDarkMode} navigation={navigation} />
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading posts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.containerDark]}
    >
      <FlatList
        data={posts.results}
        keyExtractor={(item) => item.post.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.feed}
        onScroll={handleScroll} // Track scroll position
        maintainVisibleContentPosition={{ minIndexForVisible: 0 }} // Prevent scroll position reset
        onLayout={() => {
          flatListRef.current?.scrollToOffset({
            offset: scrollOffset,
            animated: false,
          }); // Restore scroll offset
        }}
        removeClippedSubviews={true} // Improves performance
      />
      {/* <View>
      <Text>{user ? `Welcome, ${user.name}` : "No user logged in"}</Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5",
  },
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
