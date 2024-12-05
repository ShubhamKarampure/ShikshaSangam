import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';

const ChatContext = createContext(undefined);
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext can only be used within ChatProvider');
  }
  return context;
};
export const ChatProvider = ({
  children
}) => {
  const [activeChatId, setActiveChatId] = useState();
 
  const changeActiveChat = async chatId => {
    setActiveChatId(chatId);
  };
  
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      changeActiveChat();
    }
    }, []);
  return <ChatContext.Provider value={{
    activeChatId,
    changeActiveChat,
  }}>
      {children}
    </ChatContext.Provider>;
};