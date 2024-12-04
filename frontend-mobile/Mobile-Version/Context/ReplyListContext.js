import React, { createContext, useContext, useState } from "react";

// Create the ReplyList context
const ReplyListContext = createContext();

// Custom hook to use ReplyListContext
export const useReplyListContext = () => {
  const context = useContext(ReplyListContext);
  if (context === undefined) {
    throw new Error(
      "useReplyListContext must be used within a ReplyListProvider"
    );
  }
  return context;
};

// Provider for the ReplyList context
export const ReplyListProvider = ({ children }) => {
  const [replies, setReplies] = useState([]);

  // Add a reply
  const addReply = (reply) => {
    setReplies((prev) => [...prev, reply]);
  };

  // Remove a reply by ID
  const removeReply = (replyId) => {
    setReplies((prev) => prev.filter((reply) => reply.reply_id !== replyId));
  };

  return (
    <ReplyListContext.Provider value={{ replies, addReply, removeReply }}>
      {children}
    </ReplyListContext.Provider>
  );
};
