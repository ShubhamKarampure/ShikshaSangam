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
import { BsCheckCircle, BsSearch, BsPlusCircle } from 'react-icons/bs';
import { BiUpvote, BiDownvote } from 'react-icons/bi';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      question: 'What is React?',
      options: ['A JavaScript library', 'A CSS framework', 'A database', 'A server-side language'],
      correctAnswer: 'A JavaScript library',
      userAnswer: null,
      status: null,
      points: 10,
    },
    {
      id: 2,
      question: 'What is the time complexity of QuickSort?',
      options: ['O(n^2)', 'O(n log n)', 'O(log n)', 'O(n)'],
      correctAnswer: 'O(n log n)',
      userAnswer: null,
      status: null,
      points: 10,
    },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', score: 20 },
    { id: 2, name: 'Alice Johnson', score: 15 },
    { id: 3, name: 'Bob Smith', score: 10 },
  ]);

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmitAnswer = () => {
    const updatedQuizzes = [...quizzes];
    const currentQuiz = updatedQuizzes[currentQuizIndex];
    currentQuiz.userAnswer = userAnswer;
    currentQuiz.status = userAnswer === currentQuiz.correctAnswer ? 'Correct' : 'Incorrect';
    setQuizzes(updatedQuizzes);

    if (currentQuiz.status === 'Correct') {
      // Update user score
      const updatedUsers = [...users];
      const userIndex = updatedUsers.findIndex((user) => user.name === 'You');
      if (userIndex !== -1) {
        updatedUsers[userIndex].score += currentQuiz.points;
      } else {
        updatedUsers.push({ id: users.length + 1, name: 'You', score: currentQuiz.points });
      }
      setUsers(updatedUsers);
    }

    // Move to the next quiz
    setCurrentQuizIndex(currentQuizIndex + 1);
    setUserAnswer('');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <Container className="py-5">
      {/* Search Bar */}
      <Row className="mb-4 align-items-center">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text><BsSearch /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search leaderboard by name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Col>
      </Row>

      {/* Current Quiz */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5>Daily Quiz</h5>
          <p><strong>Question: </strong>{quizzes[currentQuizIndex]?.question}</p>
          <Form>
            {quizzes[currentQuizIndex]?.options.map((option, index) => (
              <Form.Check
                key={index}
                type="radio"
                label={option}
                name="answer"
                value={option}
                checked={userAnswer === option}
                onChange={handleAnswerChange}
              />
            ))}
          </Form>

          <Button
            variant="primary"
            className="mt-3"
            onClick={handleSubmitAnswer}
            disabled={!userAnswer}
          >
            Submit Answer
          </Button>
        </Card.Body>
      </Card>

      {/* Leaderboard */}
      <h5 className="mb-3">Leaderboard</h5>
      <ListGroup variant="flush">
        {filteredUsers.map((user) => (
          <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
            {user.name}
            <Badge bg="primary" className="ms-2">
              {user.score} points
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal for Creating a New Quiz (if needed) */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="quizQuestion">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter quiz question"
              />
            </Form.Group>
            <Form.Group controlId="quizOptions" className="mt-3">
              <Form.Label>Options</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter options (comma separated)"
              />
            </Form.Group>
            <Form.Group controlId="correctAnswer" className="mt-3">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter correct answer"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Create Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Quiz;
