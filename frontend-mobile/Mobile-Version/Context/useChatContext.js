import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from "./useAuthContext";

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
  
  const { user } = AuthContext();
  useEffect(() => {
    if (user) {
      changeActiveChat();
    }
    }, []);
  return <ChatContext.Provider value={{
    activeChatId,
    changeActiveChat,
    chatList,
    chatToast
  }}>
      {children}
    </ChatContext.Provider>;
};