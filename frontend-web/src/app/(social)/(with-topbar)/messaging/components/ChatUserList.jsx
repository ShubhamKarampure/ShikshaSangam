import { useChatContext } from '@/context/useChatContext';
import { getAllUsers } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import useViewPort from '@/hooks/useViewPort';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'react-bootstrap';
import ChatUsers from './ChatUsers';
import { fetchChats } from '@/api/multimedia'
import { useEffect,useState } from 'react';

const ChatUserList = () => {
  
  const [userChats, setUserChats] = useState([]);

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const chats = await fetchChats();
       
        setUserChats(chats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchUserChats();
  }, [])

  const {
    width
  } = useViewPort();
  const {
    chatList
  } = useChatContext();
  return <>
      {width >= 992 ? <>{userChats && <ChatUsers chats={userChats} />}</> : <Offcanvas show={chatList.open} onHide={chatList.toggle} placement="start" tabIndex={-1} id="offcanvasNavbar">
          <OffcanvasHeader closeButton />
          <OffcanvasBody className="p-0">{userChats && <ChatUsers chats={userChats} />}</OffcanvasBody>
        </Offcanvas>}
    </>;
};
export default ChatUserList;