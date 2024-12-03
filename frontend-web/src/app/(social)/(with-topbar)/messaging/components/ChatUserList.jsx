import { useChatContext } from '@/context/useChatContext';
import useViewPort from '@/hooks/useViewPort';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'react-bootstrap';
import ChatUsers from './ChatUsers';

const ChatUserList = ({chat}) => {
  const {
    width
  } = useViewPort();
  const {
    chatList
  } = useChatContext();
  return <>
      {width >= 992 ? <>{chat && <ChatUsers chats={chat} />}</> : <Offcanvas show={chatList.open} onHide={chatList.toggle} placement="start" tabIndex={-1} id="offcanvasNavbar">
          <OffcanvasHeader closeButton />
          <OffcanvasBody className="p-0">{chat && <ChatUsers chats={chat} />}</OffcanvasBody>
        </Offcanvas>}
    </>;
};
export default ChatUserList;