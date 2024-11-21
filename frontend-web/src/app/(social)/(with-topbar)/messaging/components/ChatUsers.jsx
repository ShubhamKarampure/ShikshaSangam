import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { useChatContext } from '@/context/useChatContext';
import clsx from 'clsx';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
const ChatItem = ({
  id,
  avatar,
  lastMessage,
  name,
  status,
  isStory
}) => {
  const {
    changeActiveChat,
    activeChat
  } = useChatContext();
  return <li data-bs-dismiss="offcanvas" onClick={() => changeActiveChat(id)}>
      <div className={clsx('nav-link text-start', {
      active: activeChat?.id === id
    })} id="chat-1-tab" data-bs-toggle="pill" role="tab">
        <div className="d-flex">
          <div className={clsx('flex-shrink-0 avatar  me-2', status === 'online' ? 'status-online' : 'status-offline', {
          'avatar-story': isStory
        })}>
            <img className="avatar-img rounded-circle" src={avatar} alt="" />
          </div>
          <div className="flex-grow-1 d-block">
            <h6 className="mb-0 mt-1">{name}</h6>
            <div className="small text-secondary">{lastMessage}</div>
          </div>
        </div>
      </div>
    </li>;
};
const ChatUsers = ({
  chats
}) => {
  const [users, setUser] = useState([...chats]);
  const search = text => {
    setUser(text ? [...chats].filter(u => u.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) : [...chats]);
  };
  return <Card className="card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0  overflow-hidden">
      <form className="position-relative">
        <input className="form-control py-2" type="search" placeholder="Search for chats" aria-label="Search" onKeyUp={e => search(e.target.value)} />
        <button className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="button">
          <BsSearch className="fs-5" />
        </button>
      </form>
      <div className="mt-4 h-100">
        <SimplebarReactClient className="chat-tab-list custom-scrollbar">
          <ul className="nav flex-column nav-pills nav-pills-soft">
            {users.slice(0, 5).map((chat, idx) => <ChatItem {...chat} key={idx} />)}
          </ul>
        </SimplebarReactClient>
      </div>
    </Card>;
};
export default ChatUsers;