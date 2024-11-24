import EventCard from '@/components/cards/EventCard';
import { getAllEvents } from '@/helpers/data';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useFetchData } from '@/hooks/useFetchData';
const DiscoverEvents = () => {
  const allEvents = useFetchData(getAllEvents);
  return <section className="bg-mode py-5">
      <Container className="pt-5">
        <Row>
          <Col xs={12} className="mb-3">
            <div className="d-sm-flex justify-content-between">
              <h4>Discover Events </h4>
              <Link className="btn btn-link" to="/events">
                View all events
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="g-4">
          {allEvents?.slice(0, 4).map((event, idx) => <Col sm={6} lg={3} key={idx}>
              <EventCard {...event} />
            </Col>)}
        </Row>
      </Container>
    </section>;
};
export default DiscoverEvents;