import { Col, Container, Row } from 'react-bootstrap';
import element1 from '@/assets/images/elements/01.svg';
import element2 from '@/assets/images/elements/02.svg';
import element7 from '@/assets/images/elements/07.svg';
const MessagingFeature = () => {
  return <section className="py-4 py-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={12} className="text-center mb-4">
            <h2 className="h1">More than messaging</h2>
            <p>Express besides it present if at an opinion visitor. </p>
          </Col>
        </Row>
        <Row className="g-4 g-lg-5">
          <Col md={4} className="text-center">
            <img className="h-100px mb-4 w-auto" src={element2} alt="element" />
            <h4>Voice and video calls</h4>
            <p className="mb-0">Place voice no arises along to. Parlors waiting so against me no. Wishing calling is warrant settled was lucky.</p>
          </Col>
          <Col md={4} className="text-center">
            <img className="h-100px mb-4 w-auto" src={element7} alt="element" />
            <h4>Auto save contacts</h4>
            <p className="mb-0">Handsome met debating sir dwelling age material. As style lived he worse dried. visitors subjects distance.</p>
          </Col>
          <Col md={4} className="text-center">
            <img className="h-100px mb-4 w-auto" src={element1} alt="element" />
            <h4>End to end encryption</h4>
            <p className="mb-0">Yet uncommonly his ten who diminution astonished. Demesne new manners savings staying had. </p>
          </Col>
        </Row>
      </Container>
    </section>;
};
export default MessagingFeature;