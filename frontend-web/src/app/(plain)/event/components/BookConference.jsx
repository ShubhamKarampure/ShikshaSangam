import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsShareFill, BsTicketFill } from 'react-icons/bs';
import event6 from '@/assets/images/events/06.jpg';
import avatar5 from '@/assets/images/avatar/05.jpg';
import avatar6 from '@/assets/images/avatar/06.jpg';
import qrCodeImg from '@/assets/images/qr-code.png';
const BookConference = () => {
  return <section className="bg-mode pt-0 pt-lg-5">
      <Container>
        <Row className="g-4 justify-content-between">
          <Col lg={5}>
            <Link to="/event/details">
              <img className="rounded" src={event6} alt="image" />
            </Link>

            <h5 className="mt-4">
              
              <Link to="/event/details"> Global conference </Link>
            </h5>
            <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.</p>

            <ul className="avatar-group list-unstyled align-items-center mb-0">
              <li className="avatar avatar-xs">
                <img className="avatar-img rounded-circle" src={avatar5} alt="avatar" />
              </li>
              <li className="avatar avatar-xs">
                <img className="avatar-img rounded-circle" src={avatar6} alt="avatar" />
              </li>
              <li className="avatar avatar-xs">
                <div className="avatar-img rounded-circle bg-primary">
                  <span className="smaller text-white position-absolute top-50 start-50 translate-middle">+34</span>
                </div>
              </li>
              <li className="ms-3">
                <small> are attending</small>
              </li>
            </ul>
          </Col>
          <Col lg={6}>
            <h4 className="mb-4">Book a conference</h4>
            <div className="bg-light dashed p-4 rounded">
              <Row className="g-4 justify-content-between">
                <Col sm={7}>
                  <Row className="g-3">
                    <Col xs={6}>
                      <small>Date</small>
                      <h6>12 june, 2022</h6>
                    </Col>

                    <Col xs={6}>
                      <small>Time</small>
                      <h6>🌞Morning 10AM</h6>
                    </Col>

                    <Col xs={12}>
                      <small>Address</small>
                      <h6>2492 Centennial NW, Acworth, GA, 30102</h6>
                    </Col>
                    <Col xs={12}>
                      <Link className="btn btn-white" to="">
                        <BsShareFill size={20} className="pe-2" /> Share
                      </Link>
                    </Col>
                  </Row>
                </Col>
                <Col sm={5} className="text-center">
                  <div className="ticket-border">
                    <img className="w-200px mx-auto" src={qrCodeImg} alt="qr-code" />
                    <Button variant="primary" className="mt-3">
                      
                      <BsTicketFill size={22} className="pe-2" /> Book now
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>;
};
export default BookConference;