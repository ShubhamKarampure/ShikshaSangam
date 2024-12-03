import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useState } from "react";
import LikeButton from "../Components/LikeButton";
import CommentButton from "../Components/CommentButton";
import ShareButton from "../Components/ShareButton";
import CommentSectionCard from "../Screens/CommentSectionScreen";

const PostCard = ({ item, isDarkMode, navigation}) => {
  const [isModalVisible, setisModalVisible] = useState(false);

  function closeCommentSectionHandler(){
    setisModalVisible(false);
  }

  function onCommentPress() {
    //console.log('Comment Pressed')
    setisModalVisible(true);
    // navigation.navigate('CommentSection', {
    //   item: item,
    //   isDarkMode: isDarkMode,
    // });
  }

  return (
    <View style={styles.fullPostBox}>
      <View style={[styles.post, isDarkMode && styles.postDark]}>
        {/* Header with author's profile image and information */}
        <View style={styles.header}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View>
            <Text style={[styles.author, isDarkMode && styles.textDark]}>
              {item.author}
            </Text>
            <Text
              style={[styles.timestamp, isDarkMode && styles.textDarkSecondary]}
            >
              {item.timestamp}
            </Text>
          </View>
        </View>
        {/* Post Title */}
        <Text style={[styles.title, isDarkMode && styles.textDark]}>
          {item.title}
        </Text>
        {/* Post Content */}
        <Text style={[styles.content, isDarkMode && styles.textDarkSecondary]}>
          {item.content}
        </Text>
        {/* Post Image */}
        <Image source={{ uri: item.image }} style={styles.postImage} />
        {/* Actions: Like, Comment, Share */}
        <View style={styles.actions}>
          <LikeButton initialLikeCount={item.likes} />
          <CommentButton
            item={item}
            isDarkMode={isDarkMode}
            onPress={onCommentPress}
          />
          <ShareButton isDarkMode={isDarkMode} />
        </View>
        {/* */}
      </View>
      {isModalVisible && (
        <CommentSectionCard
          item={item}
          isDarkMode={isDarkMode}
          onPress={closeCommentSectionHandler}
          visible={isModalVisible}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullPostBox: {
    backgroundColor: "#4a4301",
    //padding: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  post: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  postDark: { backgroundColor: "#1E1E1E" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postImage: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  author: { fontWeight: "bold", fontSize: 16, color: "#000" },
  textDark: { color: "#fff" },
  textDarkSecondary: { color: "#b3b3b3" },
  timestamp: { fontSize: 12, color: "gray" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5, color: "#000" },
  content: { fontSize: 14, marginBottom: 10, color: "#333" },
  actions: { flexDirection: "row", justifyContent: "space-between" },
});

export default PostCard;
