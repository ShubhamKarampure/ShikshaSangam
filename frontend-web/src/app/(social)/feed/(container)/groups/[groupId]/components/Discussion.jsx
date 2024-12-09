import React, { useState, useMemo } from 'react';
import {
  Card,
  Button,
  Modal,
  Form,
  ListGroup,
  Container,
  Row,
  Col,
  Badge,
  InputGroup,
} from 'react-bootstrap';
import { 
  BsChat, 
  BsReply, 
  BsPlusCircle, 
  BsSearch,
  BsCheckCircle,
  BsXCircle
} from 'react-icons/bs';
import { BiDownvote,BiUpvote } from "react-icons/bi";

const Discussion = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: 'How to improve React performance?',
      content: 'Any tips for optimizing React components?',
      author: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      replies: [
        {
          id: 101,
          content: 'You can use React.memo for memoizing components.',
          author: 'Jane Smith',
          avatar: 'https://i.pravatar.cc/150?img=2',
          likes: 3,
          dislikes: 0,
        },
      ],
      likes: 5,
      dislikes: 1,
      status: 'unsolved',
      tags: ['React', 'Performance'],
    },
    {
      id: 2,
      title: 'Understanding useState Hook',
      content: 'Can someone explain useState with examples?',
      author: 'Alice Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      replies: [],
      likes: 2,
      dislikes: 0,
      status: 'unsolved',
      tags: ['React', 'Hooks'],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newThread, setNewThread] = useState({ 
    title: '', 
    content: '', 
    tags: '',
    status: 'unsolved' 
  });
  const [selectedThread, setSelectedThread] = useState(null);
  const [reply, setReply] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateThread = () => {
    setThreads([
      ...threads,
      {
        id: threads.length + 1,
        title: newThread.title,
        content: newThread.content,
        author: 'You',
        avatar: 'https://i.pravatar.cc/150?img=8',
        replies: [],
        likes: 0,
        dislikes: 0,
        status: newThread.status,
        tags: newThread.tags.split(',').map(tag => tag.trim()),
      },
    ]);
    setNewThread({ title: '', content: '', tags: '', status: 'unsolved' });
    setShowModal(false);
  };

  const handleReply = (threadId) => {
    const updatedThreads = threads.map((thread) =>
      thread.id === threadId
        ? {
            ...thread,
            replies: [
              ...thread.replies,
              {
                id: Date.now(),
                content: reply,
                author: 'You',
                avatar: 'https://i.pravatar.cc/150?img=8',
                likes: 0,
                dislikes: 0,
              },
            ],
          }
        : thread
    );
    setThreads(updatedThreads);
    setReply('');
    setSelectedThread(null);
  };

  const handleLike = (threadId, replyId = null, type = 'like') => {
    const updatedThreads = threads.map((thread) => {
      if (thread.id === threadId) {
        if (replyId) {
          return {
            ...thread,
            replies: thread.replies.map((reply) =>
              reply.id === replyId 
                ? { 
                    ...reply, 
                    [type + 's']: (reply[type + 's'] || 0) + 1 
                  } 
                : reply
            ),
          };
        }
        return { 
          ...thread, 
          [type + 's']: (thread[type + 's'] || 0) + 1 
        };
      }
      return thread;
    });
    setThreads(updatedThreads);
  };

  const handleStatusToggle = (threadId) => {
    const updatedThreads = threads.map((thread) =>
      thread.id === threadId
        ? { 
            ...thread, 
            status: thread.status === 'solved' ? 'unsolved' : 'solved' 
          }
        : thread
    );
    setThreads(updatedThreads);
  };

  const filteredThreads = useMemo(() => {
    return threads.filter(thread => 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.tags.some(tag => 
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [threads, searchQuery]);

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text><BsSearch /></InputGroup.Text>
            <Form.Control 
              type="text" 
              placeholder="Search threads by title or tags" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4} className="text-end">
          <Button 
            variant="primary" 
            onClick={() => setShowModal(true)} 
            className="d-flex align-items-center ms-auto"
          >
            <BsPlusCircle className="me-2" /> Create Thread
          </Button>
        </Col>
      </Row>

      {filteredThreads.map((thread) => (
        <Card className="mb-4 shadow-sm" key={thread.id}>
          <Card.Body>
            <div className="d-flex align-items-center mb-3">
              <img
                src={thread.avatar}
                alt={thread.author}
                className="rounded-circle me-3"
                width={50}
                height={50}
              />
              <div className="flex-grow-1">
                <div className="d-flex align-items-center">
                  <h5 className="mb-0 me-2">{thread.title}</h5>
                  <Badge 
                    bg={thread.status === 'solved' ? 'success' : 'warning'}
                    className="me-2"
                  >
                    {thread.status}
                  </Badge>
                </div>
                <small className="text-muted">By {thread.author}</small>
              </div>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => handleStatusToggle(thread.id)}
              >
                {thread.status === 'solved' 
                  ? <><BsXCircle className="me-1" /> Mark Unsolved</>
                  : <><BsCheckCircle className="me-1" /> Mark Solved</>
                }
              </Button>
            </div>
            <p>{thread.content}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {thread.tags.map((tag, index) => (
                  <Badge bg="secondary" className="me-2" key={index}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="d-flex align-items-center">
                <Button
                  size="sm"
                  variant="outline-success"
                  className="me-2 d-flex align-items-center"
                  onClick={() => handleLike(thread.id, null, 'like')}
                >
                  <BiUpvote className="me-1" /> {thread.likes || 0}
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  className="me-2 d-flex align-items-center"
                  onClick={() => handleLike(thread.id, null, 'dislike')}
                >
                  <BiDownvote className="me-1" /> {thread.dislikes || 0}
                </Button>
                <Button
                  size="sm"
                  variant="outline-light"
                  onClick={() => setSelectedThread(thread)}
                
                >
                  <BsReply className="me-1" /> Reply
                </Button>
              </div>
            </div>

            {/* Replies Section */}
            <div className="mt-4">
              <h6 className="mb-3">Replies:</h6>
              <ListGroup variant="flush">
                {thread.replies.map((reply) => (
                  <ListGroup.Item 
                    key={reply.id} 
                    className="border-0 ps-4 bg-light mb-3 shadow-sm"
                  >
                    <div className="d-flex">
                      <img
                        src={reply.avatar}
                        alt={reply.author}
                        className="rounded-circle me-3"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1">
                        <p className="mb-1">{reply.content}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">{reply.author}</small>
                          <div>
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={() => handleLike(thread.id, reply.id, 'like')}
                              className="me-2"
                            >
                              <BiUpvote />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleLike(thread.id, reply.id, 'dislike')}
                            >
                              <BiDownvote />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {selectedThread && (
                <div className="mt-4">
                  <InputGroup>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Write a reply..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />
                    <Button
                      variant="outline-primary"
                      onClick={() => handleReply(selectedThread.id)}
                    >
                      Post Reply
                    </Button>
                  </InputGroup>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* Modal to create thread */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Thread</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter thread title"
                value={newThread.title}
                onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formContent" className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter thread content"
                value={newThread.content}
                onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formTags" className="mt-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tags (comma-separated)"
                value={newThread.tags}
                onChange={(e) => setNewThread({ ...newThread, tags: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formStatus" className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={newThread.status}
                onChange={(e) => setNewThread({ ...newThread, status: e.target.value })}
              >
                <option value="unsolved">Unsolved</option>
                <option value="solved">Solved</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateThread}>
            Create Thread
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Discussion;
