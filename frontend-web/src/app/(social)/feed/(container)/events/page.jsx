import { Link } from 'react-router-dom';
import { Alert, Col } from 'react-bootstrap';
import AllEvents from './components/AllEvents';
import PageMetaData from '@/components/PageMetaData';
const Events = () => {
  return <>
      <PageMetaData title='Events' />
      <Col md={8} lg={6} className="vstack gap-4">
        <Alert variant="success" dismissible className="fade  mb-0" role="alert">
          <strong>Upcoming event:</strong> The learning conference on Sep 19 2024
          <Link to="/event-details" className="btn btn-xs btn-success mt-2 mt-md-0 ms-md-4">
            View event
          </Link>
        </Alert>
        <AllEvents />
      </Col>
    </>;
};
export default Events;