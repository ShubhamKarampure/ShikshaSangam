import { useChatContext } from '@/context/useChatContext';
import { FaSlidersH } from 'react-icons/fa';
const ChatToggler = () => {
  const {
    chatList
  } = useChatContext();
  return <button onClick={chatList.toggle} className="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas" aria-controls="offcanvasNavbar">
      <span className="btn btn-primary">
        <FaSlidersH />
      </span>
      <span className="h6 mb-0 fw-bold d-lg-none ms-2">Chats</span>
    </button>;
};
export default ChatToggler;