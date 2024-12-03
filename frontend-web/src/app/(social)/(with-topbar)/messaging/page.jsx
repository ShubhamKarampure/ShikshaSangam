import { Card, Col, Container, Row } from 'react-bootstrap';
import ChatArea from './components/ChatArea';
import ChatToggler from './components/ChatToggler';
import ChatUserList from './components/ChatUserList';
import PageMetaData from '@/components/PageMetaData';
import { fetchChats } from '@/api/multimedia';
import { useEffect, useState, useCallback } from 'react';
import { useChatContext } from '@/context/useChatContext';

const Messaging = () => {
  const { activeChatId, changeActiveChat } = useChatContext();
  const [chat, setUserChats] = useState([]);
 
  const fetchUserChats = useCallback(async () => {
    try {
      const fetchedChats = await fetchChats();

      // Update state only if there are changes
      if (
        fetchedChats.length !== chat.length ||
        JSON.stringify(fetchedChats) !== JSON.stringify(chat)
      ) {
        setUserChats(fetchedChats);
       
        // Update activeChat if none is selected
        if (!activeChatId && fetchedChats.length > 0) {
          changeActiveChat(fetchedChats[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    } 
  }, [chat, activeChatId, changeActiveChat]);

  useEffect(() => {
    // Fetch chats on mount and set up polling
    fetchUserChats();
    const intervalId = setInterval(fetchUserChats, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchUserChats, changeActiveChat]);

  // Find the active chat based on the activeChatId
  const activeChat = chat.find((chatItem) => chatItem.id === activeChatId);

  return (
    <>
      <PageMetaData title="Messaging" />
      <main>
        <Container>
          <Row className="gx-0">
            <Col lg={4} xxl={3}>
              <div className="d-flex align-items-center mb-4 d-lg-none">
                <ChatToggler />
              </div>
              <Card className="card-body border-end-0 border-bottom-0 rounded-bottom-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="h5 mb-0">
                    Active chats{' '}
                    <span className="badge bg-success bg-opacity-10 text-success">{chat.length}</span>
                  </h1>
                </div>
              </Card>
              <nav className="navbar navbar-light navbar-expand-lg mx-0">
                <ChatUserList chat={chat} />
              </nav>
            </Col>
            <Col lg={8} xxl={9}>
              {/* Pass the activeChat to ChatArea */}
              <ChatArea activeChat={activeChat} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Messaging;
