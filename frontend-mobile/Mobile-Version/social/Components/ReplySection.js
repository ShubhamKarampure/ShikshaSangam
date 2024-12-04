import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import Reply from "./Reply";

export default function ReplySection({ comment_id, isDarkMode }) { 
  // /social/replies/comment_replies/{comment_id} to get the list of replies
  // get the replies from backend via api call
  const fromBackendReplies = [ // dummy placeholder data
    {
      reply: {
        id: 4,
        content: "Kabhi Kabhi lagta hai apunich bhagvaan hai 😎",
        created_at: "2024-12-04T13:15:00.000Z",
        comment: 3, // comment id
        userprofile: 2,
      },
      user: {
        username: "Shubham Karampure",
        avatar:
          "http://res.cloudinary.com/dhp4wuv2x/image/upload/v1733055854/shikshasangam/avatar/ahbs1gionghsf2g6aqxa.jpg",
        profile_id: 2,
        role: "student",
      },
      likes_count: 68,
    },
    {
      reply: {
        id: 5,
        content: "Bhai Ye hackathon toh jeetna hi hai",
        created_at: "2024-12-04T21:45:00.000Z",
        comment: 3, // comment id
        userprofile: 2,
      },
      user: {
        username: "Shubham Karampure",
        avatar:
          "http://res.cloudinary.com/dhp4wuv2x/image/upload/v1733055854/shikshasangam/avatar/ahbs1gionghsf2g6aqxa.jpg",
        profile_id: 2,
        role: "student",
      },
      likes_count: 1,
    },
  ];

  // Extracting replies from the comment prop
  const allReplies = fromBackendReplies || [];

  // States to manage visible replies and batch size
  const [visibleReplies, setVisibleReplies] = useState(allReplies.slice(0, 10));
  const [batchIndex, setBatchIndex] = useState(1);
  const batchSize = 10;

  const loadMoreReplies = () => {
    const nextIndex = batchIndex * batchSize;
    const newReplies = allReplies.slice(nextIndex, nextIndex + batchSize);
    setVisibleReplies((prevReplies) => [...prevReplies, ...newReplies]);
    setBatchIndex(batchIndex + 1);
  };

  const hasMoreReplies = batchIndex * batchSize < allReplies.length;

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleReplies}
        keyExtractor={(item) => item.reply.id.toString()}
        renderItem={({ item }) => (
          <Reply key={item.reply.id} reply={item} isDarkMode={isDarkMode} />
        )}
        scrollEnabled={false} // Disables scrolling for the FlatList
        ListFooterComponent={
          hasMoreReplies && (
            <Pressable
              style={styles.moreRepliesContainer}
              onPress={loadMoreReplies}
              android_ripple={{ color: "#2b2b04" }}
            >
              <Text style={styles.moreRepliesText}>View More Replies</Text>
            </Pressable>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212b21",
    paddingBottom: 5, // Padding at the bottom for better UX
  },
  moreRepliesContainer: {
    alignItems: "center",
    marginVerticalTop: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "#393b39",
  },
  moreRepliesText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#aaa",
  },
});
