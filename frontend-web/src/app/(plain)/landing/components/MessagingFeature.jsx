import { Col, Container, Row } from 'react-bootstrap';
import element1 from '@/assets/images/elements/01.svg';
import element2 from '@/assets/images/elements/02.svg';
import element7 from '@/assets/images/elements/07.svg';

const MessagingFeature = () => {
  return (
    <section className="py-4 py-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={12} className="text-center mb-4">
            <h2 className="h1">More than messaging</h2>
            <p>Seamlessly connect and collaborate with alumni and students.</p>
          </Col>
        </Row>
        <Row className="g-4 g-lg-5">
          <Col md={4} className="text-center">
            <img className="h-100px mb-4 w-auto" src={element2} alt="Group chats and collaboration" />
            <h4>Group chats and collaboration</h4>
            <p className="mb-0">Create and join group chats to collaborate on projects, share insights, and foster connections.</p>
          </Col>
          <Col md={4} className="text-center">
            <img className="h-100px mb-4 w-auto" src={element7} alt="Event management and RSVPs" />
            <h4>Event management and RSVPs</h4>
            <p className="mb-0">Host events and manage RSVPs to ensure seamless participation, whether online or offline.</p>
          </Col>
          <Col md={4} className="text-center">
            <img className="h-100px mb-4 w-auto" src={element1} alt="Content moderation and reporting" />
            <h4>Content moderation and reporting</h4>
            <p className="mb-0">Maintain a safe platform with content moderation and easy reporting tools.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MessagingFeature;
