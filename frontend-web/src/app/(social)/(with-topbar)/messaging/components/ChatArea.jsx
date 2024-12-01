import { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Card, CardBody, CardFooter, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { FaCircle, FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { BsCameraVideoFill, BsPersonCheck, BsThreeDotsVertical, BsTelephoneFill, BsTrash } from 'react-icons/bs';
import { FaCheck, FaCheckDouble, FaFaceSmile } from 'react-icons/fa6';
import data from '@emoji-mart/data';
import EmojiPicker from '@emoji-mart/react';
import { useProfileContext } from "@/context/useProfileContext";
import { useChatContext } from '@/context/useChatContext';
import { useLayoutContext } from '@/context/useLayoutContext';
import TextFormInput from '@/components/form/TextFormInput';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { fetchMessages, sendMessage } from '@/api/multimedia';

const AlwaysScrollToBottom = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef?.current?.scrollIntoView) elementRef.current.scrollIntoView({
      behavior: 'smooth'
    });
  });
  return <div ref={elementRef} />;
};

const UserMessage = ({ message, isCurrentUser }) => {
  
  return (
    <div className={clsx('d-flex mb-1', {
      'justify-content-end text-end': isCurrentUser
    })}>
      <div className="flex-grow-1">
        <div className="w-100">
          <div className={clsx('d-flex flex-column', isCurrentUser ? 'align-items-end' : 'align-items-start')}>
            <div className={clsx('p-2 px-3 rounded-2', isCurrentUser ? 'bg-primary text-white' : 'bg-light text-secondary')}>
              {message.content}
            </div>
            <div className="d-flex my-2">
              <div className="small text-secondary">
                {new Date(message.timestamp).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
              </div>
              {message.is_read && (
                <div className="small ms-2">
                  <FaCheckDouble className="text-info" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const ChatArea = () => {
  const { theme } = useLayoutContext();
  const { activeChat } = useChatContext();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { profile } = useProfileContext();

  const messageSchema = yup.object({
    newMessage: yup.string().required('Please enter a message'),
  });

  const { reset, handleSubmit, control } = useForm({
    resolver: yupResolver(messageSchema),
  });

  // Fetch messages for the active chat
  const fetchMessagesHandler = useCallback(async () => {
    if (!activeChat) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchMessages(activeChat.id);
      console.log(response);

      setMessages(response);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching messages:', err);
    } finally {
      setIsLoading(false);
    }
  }, [activeChat]);

  useEffect(() => {
    fetchMessagesHandler();
  }, [fetchMessagesHandler]);

  // Send a new message
  const sendChatMessage = async (values) => {
    if (!activeChat) {
      alert('Please start following someone to chat.');
      return;
    }

    try {
      const newMessage = await sendMessage(activeChat.id, values.newMessage);

      if (!newMessage) {
        throw new Error('Failed to send message');
      }

      // Append the new message to the messages list
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear the text input
      reset();

      // Optional: Scroll to the bottom
      const element = document.querySelector('.chat-conversation-content');
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // Inform the user to follow someone if no active chat
  if (!activeChat) {
    return (
      <Card className="card-chat rounded-start-lg-0 border-start-lg-0 text-center">
        <CardBody>
          <h5>Please start following someone to chat</h5>
        </CardBody>
      </Card>
    );
  }

  const { full_name, avatar_image } = activeChat.participants[0];

  return (
    <Card className="card-chat rounded-start-lg-0 border-start-lg-0">
      <CardBody className="h-100">
        <div className="h-100">
          {/* Chat Header */}
          <div className="d-sm-flex justify-content-between align-items-center">
            <div className="d-flex mb-2 mb-sm-0">
              <div className="flex-shrink-0 avatar me-2">
                <img
                  className="avatar-img rounded-circle"
                  src={avatar_image || '/default-avatar.png'}
                  alt={full_name}
                />
              </div>
              <div className="d-block flex-grow-1">
                <h6 className="mb-0 mt-1">{full_name}</h6>
                <div className="small text-secondary">
                  <FaCircle
                    className={`text-${activeChat.status === 'offline' ? 'danger' : 'success'} me-1`}
                  />
                  {activeChat.status === 'offline' ? 'Offline' : 'Online'}
                </div>
              </div>
            </div>
            {/* Chat Actions */}
            <div className="d-flex align-items-center">
              <OverlayTrigger placement="top" overlay={<Tooltip>Audio call</Tooltip>}>
                <Button variant="primary-soft" className="icon-md rounded-circle me-2 px-2">
                  <BsTelephoneFill />
                </Button>
              </OverlayTrigger>
              <Dropdown>
                <DropdownToggle
                  as="a"
                  className="icon-md rounded-circle btn btn-primary-soft me-2 px-2 content-none"
                  role="button"
                >
                  <BsThreeDotsVertical />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem>
                    <BsPersonCheck className="me-2 fw-icon" />
                    View profile
                  </DropdownItem>
                  <DropdownItem>
                    <BsTrash className="me-2 fw-icon" />
                    Delete chat
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <hr />

          {/* Chat Messages */}
          <SimplebarReactClient className="chat-conversation-content">
            {isLoading ? (
              <div className="text-center my-3">Loading messages...</div>
            ) : error ? (
              <div className="text-center text-danger my-3">{error}</div>
            ) : (
              <>
                {messages.map((message) => (
                  <UserMessage
                    key={message.id}
                    message={message}
                    isCurrentUser={message.sender === profile.full_name}
                  />
                ))}
                <AlwaysScrollToBottom />
              </>
            )}
          </SimplebarReactClient>
        </div>
      </CardBody>

      {/* Message Input */}
      <CardFooter>
        <form onSubmit={handleSubmit(sendChatMessage)} className="d-sm-flex align-items-end">
          <TextFormInput
            className="mb-sm-0 mb-3"
            name="newMessage"
            control={control}
            placeholder="Type a message"
            noValidate
            containerClassName="w-100"
          />
          <Dropdown drop="up">
            <DropdownToggle
              type="button"
              className="btn h-100 btn-sm btn-danger-soft ms-2 border border-transparent content-none"
            >
              <FaFaceSmile className="fs-6" />
            </DropdownToggle>
            <DropdownMenu className="p-0 rounded-4">
              <EmojiPicker
                data={data}
                theme={theme}
                onEmojiSelect={(e) => console.info(e.native)}
              />
            </DropdownMenu>
          </Dropdown>
          <Button variant="secondary-soft" size="sm" className="ms-2">
            <FaPaperclip className="fs-6" />
          </Button>
          <Button variant="primary" type="submit" size="sm" className="ms-2">
            <FaPaperPlane className="fs-6" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatArea;
