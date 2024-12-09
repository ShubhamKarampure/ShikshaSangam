import { messages } from '@/assets/data/other';
import { useChatContext } from '@/context/useChatContext';
import { addOrSubtractMinutesFromDate } from '@/utils/date';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BsArchive, BsCameraVideoFill, BsCheckLg, BsMicMute, BsPersonCheck, BsTelephoneFill, BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { FaCircle, FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import * as yup from 'yup';
import avatar10 from '@/assets/images/avatar/10.jpg';
import TextFormInput from '@/components/form/TextFormInput';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { FaCheck, FaCheckDouble, FaFaceSmile } from 'react-icons/fa6';
import data from '@emoji-mart/data'
import EmojiPicker from '@emoji-mart/react'
import { useLayoutContext } from '@/context/useLayoutContext'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef?.current?.scrollIntoView) elementRef.current.scrollIntoView({
      behavior: 'smooth'
    });
  });
  return <div ref={elementRef} />;
};
const UserMessage = ({
  message,
  toUser
}) => {
  const received = message.from.id === toUser.id;
  return <div className={clsx('d-flex mb-1', {
    'justify-content-end text-end': received
  })}>
      <div className="flex-shrink-0 avatar avatar-xs me-2">
        {!received && <img className="avatar-img rounded-circle" src={message.from.avatar} alt="" />}
      </div>
      <div className="flex-grow-1">
        <div className="w-100">
          <div className={clsx('d-flex flex-column', received ? 'align-items-end' : 'align-items-start')}>
            {message.image ? <div className="bg-light text-secondary p-2 px-3 rounded-2">
                <p className="small mb-0">{message.message}</p>
                <Card className="shadow-none p-2 border border-2 rounded mt-2">
                  <img width={87} height={91} src={message.image} alt="image" />
                </Card>
              </div> : <div className={clsx('p-2 px-3 rounded-2', received ? 'bg-primary text-white' : 'bg-light text-secondary')}>{message.message}</div>}
            {message.isRead ? <div className="d-flex my-2">
                <div className="small text-secondary">
                  {message.sentOn.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}
                </div>
                <div className="small ms-2">
                  <FaCheckDouble className="text-info" />
                </div>
              </div> : message.isSend ? <div className="d-flex my-2">
                <div className="small text-secondary">
                  {message.sentOn.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}
                </div>
                <div className="small ms-2">
                  <FaCheck />
                </div>
              </div> : <div className="small my-2">{message.sentOn.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })}</div>}
          </div>
        </div>
      </div>
    </div>;
};
const ChatArea = () => {
  const { theme } = useLayoutContext()
  const activeChat = 101
  const [userMessages, setUserMessages] = useState([]);
  const messageSchema = yup.object({
    newMessage: yup.string().required('Please enter message')
  });
  const {
    reset,
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(messageSchema)
  });
  const [toUser] = useState({
    id: '108',
    lastActivity: addOrSubtractMinutesFromDate(0),
    lastMessage: 'Hey! Okay, thank you for letting me know. See you!',
    status: 'online',
    avatar: avatar10,
    mutualCount: 30,
    name: 'Judy Nguyen',
    role: 'web'
  });
  const getMessagesForUser = useCallback(() => {
    if (activeChat) {
      setUserMessages(messages.filter(m => m.to.id === toUser.id && m.from.id === activeChat.id || toUser.id === m.from.id && m.to.id === activeChat.id));
    }
  }, [activeChat, toUser]);
  useEffect(() => {
    getMessagesForUser();
  }, [activeChat]);
  const sendChatMessage = values => {
    if (activeChat) {
      const newUserMessages = [...userMessages];
      newUserMessages.push({
        id: (userMessages.length + 1).toString(),
        from: toUser,
        to: activeChat,
        message: values.newMessage ?? '',
        sentOn: addOrSubtractMinutesFromDate(-0.1)
      });
      setTimeout(() => {
        const otherNewMessages = [...newUserMessages];
        otherNewMessages.push({
          id: (userMessages.length + 2).toString(),
          from: activeChat,
          to: toUser,
          message: values.newMessage ?? '',
          sentOn: addOrSubtractMinutesFromDate(0)
        });
        setUserMessages(otherNewMessages);
      }, 1000);
      setUserMessages(newUserMessages);
      reset();
    }
  };
  if (activeChat) {
    const {
      avatar,
      name
    } = activeChat;
    return <Card className="card-chat rounded-start-lg-0 border-start-lg-0">
        <CardBody className="h-100">
          <div className="h-100">
            <div className="d-sm-flex justify-content-between align-items-center">
              <div className="d-flex mb-2 mb-sm-0">
                <div className="flex-shrink-0 avatar me-2">
                  <img className="avatar-img rounded-circle" src={avatar} alt="" />
                </div>
                <div className="d-block flex-grow-1">
                  <h6 className="mb-0 mt-1">{name}</h6>
                  <div className="small text-secondary">
                    <FaCircle className={`text-${activeChat.status === 'offline' ? 'danger' : 'success'} me-1`} />
                    {activeChat.status}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <OverlayTrigger placement="top" overlay={<Tooltip>Audio call</Tooltip>}>
                  <Button variant="primary-soft" className="icon-md rounded-circle me-2 px-2">
                    <BsTelephoneFill />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Video call</Tooltip>}>
                  <Button variant="primary-soft" className="icon-md rounded-circle me-2 px-2">
                    <BsCameraVideoFill />
                  </Button>
                </OverlayTrigger>
                <Dropdown>
                  <DropdownToggle as="a" className="icon-md rounded-circle btn btn-primary-soft me-2 px-2 content-none" role="button">
                    <BsThreeDotsVertical />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end" aria-labelledby="chatcoversationDropdown">
                    <li>
                      <DropdownItem>
                        <BsCheckLg className="me-2 fw-icon" />
                        Mark as read
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        <BsMicMute className="me-2 fw-icon" />
                        Mute conversation
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        <BsPersonCheck className="me-2 fw-icon" />
                        View profile
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        <BsTrash className="me-2 fw-icon" />
                        Delete chat
                      </DropdownItem>
                    </li>
                    <DropdownDivider />
                    <li>
                      <DropdownItem>
                        <BsArchive className="me-2 fw-icon" />
                        Archive chat
                      </DropdownItem>
                    </li>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <hr />

            <SimplebarReactClient className="chat-conversation-content">
              <div className="text-center small my-2">Jul 16, 2022, 06:15 am</div>
              {userMessages.map(message => <UserMessage message={message} key={message.id} toUser={toUser} />)}
              <AlwaysScrollToBottom />
            </SimplebarReactClient>
          </div>
        </CardBody>
        <CardFooter>
          <form onSubmit={handleSubmit(sendChatMessage)} className="d-sm-flex align-items-end">
            <TextFormInput className="mb-sm-0 mb-3" name="newMessage" control={control} placeholder="Type a message" noValidate containerClassName="w-100" />
            <Dropdown drop="up">
              <DropdownToggle type="button" className="btn h-100 btn-sm btn-danger-soft ms-2  border border-transparent  content-none">
                <FaFaceSmile className="fs-6" />
              </DropdownToggle>
              <DropdownMenu className="p-0 rounded-4">
                <EmojiPicker data={data} theme={theme} onEmojiSelect={(e) => console.info(e.native)} />
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
      </Card>;
  }
};
export default ChatArea;