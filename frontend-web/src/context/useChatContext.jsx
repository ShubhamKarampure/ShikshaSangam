import { createContext, useContext, useEffect, useState } from 'react';
import { fetchChats } from '@/api/multimedia'
import { useAuthContext } from "@/context/useAuthContext";

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
  const [activeChat, setActiveChat] = useState();
  const [offcanvasStates, setOffcanvasStates] = useState({
    showChatList: false,
    showMessageToast: false
  });
  const changeActiveChat = async chatId => {
   
    const chat = await fetchChats(chatId);
   
    /*get user profile with who we are chatting*/
    if (chat) setActiveChat(chat[0]);
    
  };
  const toggleChatList = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showChatList: !offcanvasStates.showChatList
    });
  };
  const toggleMessageToast = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showMessageToast: !offcanvasStates.showMessageToast
    });
  };
  const chatList = {
    open: offcanvasStates.showChatList,
    toggle: toggleChatList
  };
  const chatToast = {
    open: offcanvasStates.showMessageToast,
    toggle: toggleMessageToast
  };
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      changeActiveChat();
    }
    }, []);
  return <ChatContext.Provider value={{
    activeChat,
    changeActiveChat,
    chatList,
    chatToast
  }}>
      {children}
    </ChatContext.Provider>;
};