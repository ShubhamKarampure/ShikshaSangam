import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessageContext must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (messageId) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
