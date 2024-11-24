import { useChatContext } from '@/context/useChatContext';
import { getAllUsers } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import useViewPort from '@/hooks/useViewPort';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'react-bootstrap';
import ChatUsers from './ChatUsers';
const ChatUserList = () => {
  const chats = useFetchData(getAllUsers);
  const {
    width
  } = useViewPort();
  const {
    chatList
  } = useChatContext();
  return <>
      {width >= 992 ? <>{chats && <ChatUsers chats={chats} />}</> : <Offcanvas show={chatList.open} onHide={chatList.toggle} placement="start" tabIndex={-1} id="offcanvasNavbar">
          <OffcanvasHeader closeButton />
          <OffcanvasBody className="p-0">{chats && <ChatUsers chats={chats} />}</OffcanvasBody>
        </Offcanvas>}
    </>;
};
export default ChatUserList;