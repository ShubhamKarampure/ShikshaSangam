import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Reply from "./Reply";

export default function ReplySection({ comment, isDarkMode }) {
  // Extracting replies from the comment prop
  const allReplies = comment.replies || [];

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
      {visibleReplies.map((reply) => (
        <Reply key={reply.reply_id} reply={reply} isDarkMode={isDarkMode} />
      ))}

      {/* "More Replies" as a pressable text, visible only at the end of the batch */}
      {hasMoreReplies && (
        <Pressable
          style={styles.moreRepliesContainer}
          onPress={loadMoreReplies}
          android_ripple={{ color: "#2b2b04" }}
        >
          <Text style={styles.moreRepliesText}>View More Replies</Text>
        </Pressable>
      )}
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
    paddingVertical:10,
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
