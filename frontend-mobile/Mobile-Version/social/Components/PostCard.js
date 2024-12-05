import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useState } from "react";
import LikeButton from "../Components/LikeButton";
import CommentButton from "../Components/CommentButton";
import ShareButton from "../Components/ShareButton";
import CommentSectionCard from "../Screens/CommentSectionScreen";
import timePassed from "../../Utility/timePassed";
import { processImageUrl } from "../../Utility/urlUtils";

const PostCard = ({ item, isDarkMode, navigation}) => {

  //console.log(item);

  function onCommentPress() {
    navigation.navigate('CommentSection', { 
      item: item, // post item
      isDarkMode: isDarkMode,
    });
  }
  // if no media in post then fall back to
  const defaultImageURL = "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const defaultAvatarURL = "https://via.placeholder.com/150/6c757d/FFFFFF";

  return (
    <View style={styles.fullPostBox}>
      <View style={[styles.post, isDarkMode && styles.postDark]}>
        {/* Header with author's profile image and information */}
        <View style={styles.header}>
          <Image
            source={{
              uri:
                item.user.avatar !== null ? processImageUrl(item.user.avatar) : defaultAvatarURL,
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={[styles.author, isDarkMode && styles.textDark]}>
              {item.user.username}
            </Text>
            <Text
              style={[styles.timestamp, isDarkMode && styles.textDarkSecondary]}
            >
              {timePassed(item.post.updated_at, new Date().toISOString())}
            </Text>
          </View>
        </View>
        {/* Post Title (But post title is not a field in Post will see later)*/}
        <Text style={[styles.title, isDarkMode && styles.textDark]}>
          {"New post by " + item.user.username}
        </Text>
        {/* Post Content */}
        <Text style={[styles.content, isDarkMode && styles.textDarkSecondary]}>
          {item.post.content}
        </Text>
        {/* Post Image */}

        <Image
          source={{
            uri: item.post.media !== null ? processImageUrl(item.post.media) : defaultImageURL,
          }}
          style={styles.postImage}
        />

        {/* Actions: Like, Comment, Share */}
        <View style={styles.actions}>
          <LikeButton initialLikeCount={item.post_stats.likes} />
          <CommentButton
            item={item}
            isDarkMode={isDarkMode}
            onPress={onCommentPress}
          />
          <ShareButton isDarkMode={isDarkMode} />
        </View>
        {/* */}
      </View>
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
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10, borderWidth:2, },
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
