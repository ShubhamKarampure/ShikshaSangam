import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import Reply from "./Reply";
import { getReply } from "../../api/feed";

export default function ReplySection({ comment_id, isDarkMode }) {
  // /social/replies/comment_replies/{comment_id} to get the list of replies
  // get the replies from backend via api call

  const [replyList, setReplyList] = useState(null);

  // Fetch replies when the component mounts 
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const replies = await getReply(comment_id); // Call the API to fetch comments
        setReplyList(replies.results); // Set the fetched comments to state
        console.log("replies.results = ",replies.results);
      } catch (error) {
        console.error("Error fetching replies:", error.message);
      }
    };

    fetchReplies();


  }, [comment_id]);

  //console.log("replyList = ", replyList);
  
  //const allReplies = replyList || [];
  //console.log('allReplies = ',allReplies)
  //const allReplies = fromBackendReplies || [];

  // States to manage visible replies and batch size
  // const [visibleReplies, setVisibleReplies] = useState(allReplies.slice(0, 10));
  // const [batchIndex, setBatchIndex] = useState(1);
  // const batchSize = 10;

  // const loadMoreReplies = () => {
  //   const nextIndex = batchIndex * batchSize;
  //   const newReplies = allReplies.slice(nextIndex, nextIndex + batchSize);
  //   setVisibleReplies((prevReplies) => [...prevReplies, ...newReplies]);
  //   setBatchIndex(batchIndex + 1);
  // };

  // const hasMoreReplies = batchIndex * batchSize < allReplies.length;

  return (
    <View style={styles.container}>
      <FlatList
        //data={visibleReplies}
        data={replyList}
        keyExtractor={(item) => item.reply.id.toString()}
        renderItem={({ item }) => (
          <Reply key={item.reply.id} reply={item} isDarkMode={isDarkMode} />
        )}
        scrollEnabled={false} // Disables scrolling for the FlatList
        // ListFooterComponent={
        //   hasMoreReplies && (
        //     <Pressable
        //       style={styles.moreRepliesContainer}
        //       onPress={loadMoreReplies}
        //       android_ripple={{ color: "#2b2b04" }}
        //     >
        //       <Text style={styles.moreRepliesText}>View More Replies</Text>
        //     </Pressable>
        //   )
        // }
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
