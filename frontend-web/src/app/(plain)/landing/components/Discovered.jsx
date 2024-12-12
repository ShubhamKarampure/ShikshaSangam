import { Button, Col, Container, Row } from 'react-bootstrap';
import avatar9 from '@/assets/images/avatar/09.jpg';
import avatar10 from '@/assets/images/avatar/10.jpg';
import avatar12 from '@/assets/images/avatar/12.jpg';
import post1 from '@/assets/images/post/4by3/01.jpg';

const Discovered = () => {
  return (
    <section className="py-4 py-sm-5">
      <Container>
        <Row>
          <Col lg={10} className="ms-auto">
            <Row className="g-4 align-items-center">
              <Col md={5} lg={5} className="position-relative">
                <img className="rounded-circle" src={post1} alt="image" />
                <div className="position-absolute top-50 start-0 translate-middle d-none d-lg-block">
                  <div className="bg-mode border p-3 rounded-3 rounded-start-top-0 d-flex align-items-center mb-3">
                    <div className="avatar avatar-xs me-3">
                      <span role="button">
                        <img className="avatar-img rounded-circle" src={avatar12} alt="image" />
                      </span>
                    </div>
                    <div className="d-flex">
                      <h6 className="mb-0">Happy birthday</h6>
                      <span className="ms-2">🎂</span>
                    </div>
                  </div>
                  <div className="bg-mode border p-3 rounded-3 rounded-start-top-0 d-flex align-items-center mb-3">
                    <div className="avatar avatar-xs me-3">
                      <span role="button">
                        <img className="avatar-img rounded-circle" src={avatar10} alt="image" />
                      </span>
                    </div>
                    <div className="d-flex">
                      <h6 className="mb-0">New connection request</h6>
                      <span className="ms-2">🤘</span>
                    </div>
                  </div>
                  <div className="bg-mode border p-3 rounded-3 rounded-start-top-0 d-flex align-items-center mb-3">
                    <div className="avatar avatar-xs me-3">
                      <span role="button">
                        <img className="avatar-img rounded-circle" src={avatar9} alt="image" />
                      </span>
                    </div>
                    <div className="d-flex">
                      <h6 className="mb-0">Congratulations</h6>
                      <span className="ms-2">🎉</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="ms-4">
                  <h2 className="h1">Get Discovered</h2>
                  <p className="lead mb-4">
                    Connect, collaborate, and grow with our comprehensive platform designed for alumni and students. Explore features like mentorship programs, event management, discussion forums, and more to foster a thriving community!
                  </p>
                  <Button variant="primary">Let's start</Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Discovered;
