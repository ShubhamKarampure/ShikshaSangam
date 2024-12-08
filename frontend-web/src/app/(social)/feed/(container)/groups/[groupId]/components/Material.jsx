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

const Material = () => {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'Introduction to React',
      description: 'A beginner-friendly guide to React.js',
      author: 'John Doe',
      date: '2024-12-01',
      tags: ['React', 'JavaScript', 'Frontend'],
      file: 'react_intro.pdf',
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      description: 'Deep dive into JavaScript closures and async/await',
      author: 'Jane Smith',
      date: '2024-12-05',
      tags: ['JavaScript', 'Advanced'],
      file: 'advanced_js.pdf',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    tags: '',
    file: null,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateMaterial = () => {
    setMaterials([
      ...materials,
      {
        id: materials.length + 1,
        title: newMaterial.title,
        description: newMaterial.description,
        author: 'You',
        date: new Date().toLocaleDateString(),
        tags: newMaterial.tags.split(',').map(tag => tag.trim()),
        file: newMaterial.file,
      },
    ]);
    setNewMaterial({ title: '', description: '', tags: '', file: null });
    setShowModal(false);
  };

  const filteredMaterials = useMemo(() => {
    return materials.filter(material =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [materials, searchQuery]);

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text><BsSearch /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search materials by title or tags"
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
            <BsPlusCircle className="me-2" /> Add Material
          </Button>
        </Col>
      </Row>

      {filteredMaterials.map((material) => (
        <Card className="mb-4 shadow-sm" key={material.id}>
          <Card.Body>
            <h5>{material.title}</h5>
            <p>{material.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {material.tags.map((tag, index) => (
                  <Badge bg="secondary" className="me-2" key={index}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <div>
                <Button
                  size="sm"
                  variant="outline-info"
                  href={`#`} // Placeholder link, can be updated with a file download link
                >
                  Download
                </Button>
              </div>
            </div>
            <div className="mt-2 text-muted">
              Uploaded by {material.author} on {material.date}
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* Modal to add new material */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter material title"
                value={newMaterial.title}
                onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter material description"
                value={newMaterial.description}
                onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formTags" className="mt-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tags (comma-separated)"
                value={newMaterial.tags}
                onChange={(e) => setNewMaterial({ ...newMaterial, tags: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mt-3">
              <Form.Label>Upload Material File</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setNewMaterial({ ...newMaterial, file: e.target.files[0] })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateMaterial}>
            Add Material
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Material;
