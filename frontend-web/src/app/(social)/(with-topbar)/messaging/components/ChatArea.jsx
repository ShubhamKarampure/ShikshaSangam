import { useState, useEffect, useCallback, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { FaCircle, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { BsPersonCheck, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { FaCheckDouble, FaFaceSmile } from "react-icons/fa6";
import data from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
import { useProfileContext } from "@/context/useProfileContext";
import { useLayoutContext } from "@/context/useLayoutContext";
import SimplebarReactClient from "@/components/wrappers/SimplebarReactClient";
import { fetchMessages, sendMessage, clearChat } from "@/api/multimedia";
import { FaUserFriends, FaCommentDots } from "react-icons/fa";
import { useNotificationContext } from "@/context/useNotificationContext";
import { SiGooglemeet } from "react-icons/si";
import { createMeeting } from "../../../live/api";

const VIDEOSDK_TOKEN = import.meta.env.VITE_VIDEOSDK_TOKEN;
import { useNavigate } from "react-router-dom";
// Constant for call message type
const MEET_MESSAGE_PREFIX = "MEET_INVITATION";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef?.current?.scrollIntoView)
      elementRef.current.scrollIntoView({
        behavior: "smooth",
      });
  });
  return <div ref={elementRef} />;
};
const MeetInvitationMessage = ({ message, onMeetCall, isCurrentUser }) => {
  console.log(message.content);
  const callDetails = message.content.split("#");
  const meetId = callDetails[1];

  console.log(meetId);
  return (
    <div
      className={clsx("d-flex mb-3 ", {
        "justify-content-end": isCurrentUser,
        "justify-content-start": !isCurrentUser,
      })}
    >
      <div
        className={clsx(
          "p-3 rounded shadow-sm d-flex align-items-center gap-3 bg-primary text-white",
          "meet-invitation"
        )}
        style={{
          cursor: "pointer",
          maxWidth: "300px",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onClick={() => onMeetCall(meetId)}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => e.key === "Enter" && onMeetCall(meetId)}
      >
        {/* Call Icon */}
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "white",
            color: "#007bff",
          }}
        >
          <SiGooglemeet className="fs-4" />
        </div>

        {/* Call Details */}
        <div>
          <h6 className="mb-0 fw-bold text-white">Quick Connect</h6>
          <p className="m-0 small text-white-50">Tap to join</p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .meet-invitation:hover {
          transform: scale(1.05);
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
        }

        .meet-invitation:focus {
          outline: 2px solid #007bff;
          outline-offset: 4px;
        }
      `}</style>
    </div>
  );
};

const UserMessage = ({ message, isCurrentUser, onMeetCall }) => {
  // Check if message is a call invitation
  const isMeetInvitation = message.content.startsWith(MEET_MESSAGE_PREFIX);

  if (isMeetInvitation) {
    return (
      <MeetInvitationMessage
        message={message}
        onMeetCall={onMeetCall}
        isCurrentUser={isCurrentUser}
      />
    );
  }

  return (
    <div
      className={clsx("d-flex mb-1", {
        "justify-content-end text-end": isCurrentUser,
      })}
    >
      <div className="flex-grow-1">
        <div className="w-100">
          <div
            className={clsx(
              "d-flex flex-column",
              isCurrentUser ? "align-items-end" : "align-items-start"
            )}
          >
            <div
              className={clsx(
                "p-2 px-3 rounded-2",
                isCurrentUser
                  ? "bg-primary text-white"
                  : "bg-light text-secondary"
              )}
            >
              {message.content}
            </div>
            <div className="d-flex my-2">
              <div className="small text-secondary">
                {new Date(message.timestamp).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
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

const ChatArea = ({ activeChat }) => {
  const [chat, setChat ] = useState();
  const { theme } = useLayoutContext();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { profile } = useProfileContext();
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);
  const pollingIntervalRef = useRef(null);
  const { showNotification } = useNotificationContext();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const navigate = useNavigate();
 const pollingSpeed = import.meta.env.VITE_POLLING_SPEED;
  const messageSchema = yup.object({
    newMessage: yup.string().required("Please enter a message"),
  });

  const { reset, handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(messageSchema),
    defaultValues: {
      newMessage: "",
    },
  });

  const fetchMessagesHandler = useCallback(async () => {
    
    if (!activeChat) return;
    console.log(activeChat)

    try {
      const response = await fetchMessages(activeChat.id, {
        after_timestamp: lastMessageTimestamp,
      });

      if (response.length > 0) {
        // Append only new messages
        setMessages((prevMessages) => {
          const newMessages = response.filter(
            (newMsg) =>
              !prevMessages.some((existingMsg) => existingMsg.id === newMsg.id)
          );
          return [...prevMessages, ...newMessages];
        });

        // Update last message timestamp
        const latestMessage = response[response.length - 1];
        setLastMessageTimestamp(latestMessage.timestamp);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  }, [activeChat, lastMessageTimestamp]);

  useEffect(() => {
    // Initial fetch
    if (activeChat && activeChat.id !== chat?.id) {
      setMessages([]); 
      setLastMessageTimestamp([]);
    }
    setChat(activeChat)
    fetchMessagesHandler();

    // Start polling
    if (activeChat && activeChat.participants[0].status === profile.status) {
      pollingIntervalRef.current = setInterval(fetchMessagesHandler, pollingSpeed);
    }


    // Cleanup interval on unmount or chat change
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [fetchMessagesHandler]);

  const sendChatMessage = async (values) => {
    try {
      if (!values.newMessage || values.newMessage.trim() === "") return;

      const newMessage = await sendMessage(activeChat.id, values.newMessage);

      // Immediately append the message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear the message input
      setValue("newMessage", "");

      // Trigger immediate fetch to sync with backend
      fetchMessagesHandler();
    } catch (err) {
      console.error("Error sending message:", err);
      showNotification({
        message: "Failed to send message",
        variant: "danger",
      });
    }
  };
  const initiateCall = async () => {
    try {
      // Create a meeting using the token
      console.log(VIDEOSDK_TOKEN);
      const meetingResponse = await createMeeting(VIDEOSDK_TOKEN);
      console.log(meetingResponse);
      if (!meetingResponse || !meetingResponse.meetingId) {
        throw new Error("Failed to create meeting");
      }
      const meetId = meetingResponse.meetingId;

      // Create a special call invitation message
      const callMessage = `${MEET_MESSAGE_PREFIX}#${meetId}`;

      // Send the call message
      const newMessage = await sendMessage(activeChat.id, callMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      showNotification({
        message: "Meeting invitation sent successfully!",
        variant: "success",
      });
    } catch (err) {
      console.error("Error initiating call:", err);
      showNotification({
        message: "Failed to initiate call",
        variant: "danger",
      });
    }
  };

  const clear = async (chatId) => {
    try {
      if (messages.length !== 0) {
        await clearChat(chatId);
        // Trigger immediate fetch to sync with backend
        showNotification({
          message: "Chats cleared successfully...",
          variant: "success",
        });
      } else {
        showNotification({
          message: "No chats to clear",
          variant: "danger",
        });
      }
      setMessages([]);
    } catch (err) {
      console.error("Failed to clear", err);
      showNotification({
        message: "Failed to clear chats",
        variant: "danger",
      });
    }
  };

  // Inform the user to follow someone if no active chat
  if (!activeChat) {
    return (
      <Card
        className="card-chat rounded-start-lg-0 border-start-lg-0 text-center d-flex justify-content-center align-items-center p-4"
        style={{ width: "100%", height: "100%" }}
      >
        <CardBody className="d-flex flex-column justify-content-center align-items-center text-center">
          <div className="mb-4">
            <FaUserFriends
              className="text-primary"
              style={{ fontSize: "8rem", opacity: 0.6 }}
            />
          </div>
          <h2 className="mb-3">Follow to Chat</h2>
        </CardBody>
      </Card>
    );
  }

  const onMeetCall = (meetId) => {
    const token = VIDEOSDK_TOKEN;
    const participantName = profile.full_name;
    navigate(`/meet/${token}/${meetId}/${participantName}`);
  };

  const { full_name, avatar_image, status } = activeChat.participants[0];

  return (
    <Card className="card-chat rounded-start-lg-0 border-start-lg-0 h-100">
      <CardBody className="h-100 ">
        <div className="h-100">
          {/* Chat Header */}
          <div className="d-sm-flex justify-content-between align-items-center">
            <div className="d-flex mb-2 mb-sm-0">
              <div className="flex-shrink-0 avatar me-2">
                <img
                  className="img-fluid"
                  src={avatar_image || "path/to/placeholder-image.jpg"}
                  alt={full_name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>

              <div className="d-block flex-grow-1">
                <h6 className="mb-0 mt-1">{full_name || ""}</h6>
                <div className="small text-secondary">
                  <FaCircle
                    className={`text-${status === "offline" ? "danger" : "success"} me-1`}
                  />
                  {status === "offline" ? "Offline" : "Online"}
                </div>
              </div>
            </div>

            {/* Chat Actions */}
            <div className="d-flex align-items-center">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Quick Connect</Tooltip>}
              >
                <Button
                  variant="primary-soft"
                  className="icon-md rounded-circle me-2 px-2"
                  onClick={() => initiateCall()}
                >
                  <SiGooglemeet />
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
                  <DropdownItem onClick={() => clear(activeChat.id)}>
                    <BsTrash className="me-2 fw-icon" />
                    Delete chat
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <hr />

          {/* Chat Messages */}
          <SimplebarReactClient
            className="chat-conversation-content tw-overflow-hidden tw-overflow-y-auto"
            style={{
              maxHeight: "calc(100vh - 260px)",
            }}
          >
            {isLoading ? (
              <div className="text-center my-3">Loading messages...</div>
            ) : error ? (
              <div className="text-center text-danger my-3">{error}</div>
            ) : (
              <div>
                {messages.map((message) => (
                  <UserMessage
                    key={message.id}
                    message={message}
                    onMeetCall={onMeetCall}
                    isCurrentUser={message.sender === profile.full_name}
                  />
                ))}
                <AlwaysScrollToBottom />
              </div>
            )}
          </SimplebarReactClient>
        </div>
      </CardBody>

      {/* Message Input */}
      <CardFooter>
        <form
          onSubmit={handleSubmit(sendChatMessage)}
          className="d-sm-flex align-items-end"
        >
          <Controller
            name="newMessage"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="w-100">
                <input
                  {...field}
                  type="text"
                  placeholder="Type a message"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                />
                {error && (
                  <div className="invalid-feedback">{error.message}</div>
                )}
              </div>
            )}
          />
          <Dropdown
            show={isEmojiPickerOpen}
            onToggle={(isOpen) => setIsEmojiPickerOpen(isOpen)}
            drop="up"
          >
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
                onEmojiSelect={(e) => {
                  const currentMessage = control._formValues.newMessage || "";
                  setValue("newMessage", currentMessage + e.native);
                  setIsEmojiPickerOpen(false);
                }}
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
