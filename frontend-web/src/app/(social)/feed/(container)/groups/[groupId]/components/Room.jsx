import React, { useState, useMemo } from 'react';
import {
  Card,
  Button,
  Modal,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
  Badge,
} from 'react-bootstrap';
import { BsPlusCircle, BsSearch } from 'react-icons/bs';

const Room = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      title: 'React Discussion',
      description: 'Discuss all things related to React.',
      creator: 'John Doe',
      date: '2024-12-01',
      tags: ['React', 'JavaScript'],
      participants: 5,
    },
    {
      id: 2,
      title: 'JavaScript Deep Dive',
      description: 'Deep discussions on advanced JavaScript topics.',
      creator: 'Jane Smith',
      date: '2024-12-05',
      tags: ['JavaScript', 'Advanced'],
      participants: 3,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    title: '',
    description: '',
    tags: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateRoom = () => {
    setRooms([
      ...rooms,
      {
        id: rooms.length + 1,
        title: newRoom.title,
        description: newRoom.description,
        creator: 'You',
        date: new Date().toLocaleDateString(),
        tags: newRoom.tags.split(',').map((tag) => tag.trim()),
        participants: 0,
      },
    ]);
    setNewRoom({ title: '', description: '', tags: '' });
    setShowModal(false);
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter(
      (room) =>
        room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [rooms, searchQuery]);

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text><BsSearch /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search rooms by title or tags"
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
            <BsPlusCircle className="me-2" /> Create Room
          </Button>
        </Col>
      </Row>

      {filteredRooms.map((room) => (
        <Card className="mb-4 shadow-sm" key={room.id}>
          <Card.Body>
            <h5>{room.title}</h5>
            <p>{room.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {room.tags.map((tag, index) => (
                  <Badge bg="secondary" className="me-2" key={index}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <div>
                <Button
                  size="sm"
                  variant="outline-info"
                  href={`#`} // Placeholder link, can be updated with room joining logic
                >
                  Join Room
                </Button>
              </div>
            </div>
            <div className="mt-2 text-muted">
              Created by {room.creator} on {room.date} | {room.participants} Participants
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* Modal to add new room */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter room title"
                value={newRoom.title}
                onChange={(e) => setNewRoom({ ...newRoom, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter room description"
                value={newRoom.description}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTags" className="mt-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tags (comma-separated)"
                value={newRoom.tags}
                onChange={(e) => setNewRoom({ ...newRoom, tags: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateRoom}>
            Create Room
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Room;
