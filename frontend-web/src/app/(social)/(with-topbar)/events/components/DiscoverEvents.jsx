import EventCard from '@/components/cards/EventCard';
import { getAllEvents } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'react-bootstrap';
import CreateEvent from './CreateEvent';
const DiscoverEvents = () => {
  const allEvents = useFetchData(getAllEvents);
  return <section className="pt-5">
      <Container>
        <Row className="g-4">
          <Col xs={12} className="vstack gap-4">
            <Card>
              <CardHeader className="d-sm-flex align-items-center text-center justify-content-sm-between border-0 pb-0">
                <h2 className="h4 card-title">Discover Events</h2>
                <CreateEvent />
              </CardHeader>
              <CardBody>
                <Row className="g-4">
                  {allEvents?.slice(0, 5).map((event, idx) => <Col sm={6} xl={4} key={idx}>
                      <EventCard {...event} />
                    </Col>)}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>;
};
export default DiscoverEvents;