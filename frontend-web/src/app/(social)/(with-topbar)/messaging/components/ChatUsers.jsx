import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import clsx from 'clsx';
import { useChatContext } from '@/context/useChatContext';

const CALL_MESSAGE_PREFIX = "CALL_INVITATION:";

const ChatItem = ({ id, participants, last_message, isStory }) => {
  const { activeChatId, changeActiveChat } = useChatContext();

  // Access the first participant's full_name and avatar_image
  const participant = participants[0]; // Assuming there's at least one participant
  const full_name = participant?.full_name;
  const avatar_image = participant?.avatar_image;
  const status = participant?.status;

  // Determine the last message content
  let lastMessageContent = last_message?.content || 'No recent messages';
  if (lastMessageContent.startsWith(CALL_MESSAGE_PREFIX)) {
    const callDetails = lastMessageContent.slice(CALL_MESSAGE_PREFIX.length); // Extract everything after the prefix
    const callType = callDetails.split('|')[0].slice(0, 5); // Get the first 5 characters of the call type (e.g., 'audio' or 'video')
    if (callType === 'audio') {
      lastMessageContent = 'Audio Call';
    } else if (callType === 'video') {
      lastMessageContent = 'Video Call';
    }
  }

  return (
    <li data-bs-dismiss="offcanvas" onClick={() => changeActiveChat(id)}>
      <div
        className={clsx('nav-link text-start', { active: activeChatId === id })}
        id="chat-1-tab"
        data-bs-toggle="pill"
        role="tab"
      >
        <div className="d-flex">
          <div
            className={clsx(
              'flex-shrink-0 avatar me-2',
              status === 'online' ? 'status-online' : 'status-offline',
              { 'avatar-story': isStory }
            )}
          >
            <img
              className="avatar-img rounded-circle"
              src={avatar_image}
              alt={full_name || "Avatar"}
            />
          </div>
          <div className="flex-grow-1 d-block">
            <h6 className="mb-0 mt-1">{full_name}</h6>
            <div className="small text-secondary">{lastMessageContent}</div>
          </div>
        </div>
      </div>
    </li>
  );
};


const ChatUsers = ({ chats }) => {
  const [users, setUsers] = useState(chats);

  useEffect(() => {
    setUsers(chats);
  }, [chats]);

  const search = (text) => {
    setUsers(
      text
        ? chats.filter((u) => u.participants[0].full_name.toLowerCase().includes(text.toLowerCase()))
        : chats
    );
  };

  return (
    <Card className="card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0 overflow-hidden" >
      <form className="position-relative">
        <input
          className="form-control py-2"
          type="search"
          placeholder="Search for chats"
          aria-label="Search"
          onKeyUp={(e) => search(e.target.value)}
        />
        <button className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="button">
          <BsSearch className="fs-5" />
        </button>
      </form>
      <div className="mt-4 h-100">
        <SimplebarReactClient className="chat-tab-list custom-scrollbar">
          <ul className="nav flex-column nav-pills nav-pills-soft">
            {users.map((chat, idx) => (
              <ChatItem {...chat} key={idx} last_message={chat.last_message} />
            ))}
          </ul>
        </SimplebarReactClient>
      </div>
    </Card>
  );
};

export default ChatUsers;
