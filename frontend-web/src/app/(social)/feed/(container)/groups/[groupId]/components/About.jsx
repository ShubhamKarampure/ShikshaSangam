import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { FaUsers, FaComments, FaCogs, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">About Our Forum</h1>
          <p className="text-center text-muted">
            Welcome to the community-driven forum where knowledge, ideas, and discussions flow freely. 
            Whether you're here to share, learn, or collaborate, you're in the right place!
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>What is Our Forum?</Card.Title>
              <Card.Text>
                Our forum is a platform designed for members to ask questions, share answers, exchange ideas, 
                and connect with like-minded individuals. Whether you’re seeking advice, sharing your expertise, or 
                discussing industry trends, this is the place for open and respectful discussions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                Our mission is to build a supportive, collaborative, and diverse community where everyone can 
                learn and grow. We strive to foster a space that encourages thoughtful discussions, problem-solving, 
                and community-driven solutions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h3 className="text-center mb-4">Key Features</h3>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <FaUsers className="me-2 text-primary" />
              <strong>Community Engagement</strong>: Join a vibrant community of experts and learners to share your knowledge and ideas.
            </ListGroup.Item>
            <ListGroup.Item>
              <FaComments className="me-2 text-primary" />
              <strong>Interactive Discussions</strong>: Participate in engaging and insightful conversations on various topics.
            </ListGroup.Item>
            <ListGroup.Item>
              <FaCogs className="me-2 text-primary" />
              <strong>Customizable Profiles</strong>: Personalize your profile, track your discussions, and engage with other members.
            </ListGroup.Item>
            <ListGroup.Item>
              <FaShieldAlt className="me-2 text-primary" />
              <strong>Moderation & Safety</strong>: Our moderators ensure a safe and respectful environment for all members.
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>How to Get Involved</Card.Title>
              <Card.Text>
                It's easy to get started in our forum! All you need is to create an account and you're ready to dive into the 
                conversation. Here’s how to get involved:
              </Card.Text>
              <ul>
                <li>Sign up for a free account</li>
                <li>Participate in ongoing discussions or start your own</li>
                <li>Contribute valuable insights and help others</li>
                <li>Connect with members through personal messages and group discussions</li>
              </ul>
              <Button variant="primary" href="/signup">Join Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
