import { Card, Col, Container, Row } from 'react-bootstrap';
import { topDestinations } from '../data';
import { Link } from 'react-router-dom';
const DestinationCard = ({
  destination
}) => {
  const {
    category,
    image,
    location
  } = destination;
  return <Card className="card-overlay-bottom card-img-scale">
      <img className="card-img" src={image} alt="image" />
      <div className="card-img-overlay d-flex flex-column p-3 p-sm-4">
        <div className="w-100 mt-auto">
          <h5 className="text-white">
            <Link to="" className="btn-link text-reset stretched-link">
              {location}
            </Link>
          </h5>

          <span className="text-white small">{category}</span>
        </div>
      </div>
    </Card>;
};
const TopDestinations = () => {
  return <section className="bg-mode pb-5 pt-0 pt-lg-5">
      <Container>
        <Row>
          <Col xs={12} className="mb-3">
            <h4>Top Destinations </h4>
          </Col>
        </Row>
        <Row className="g-4">
          {topDestinations.map((destination, idx) => <Col sm={6} lg={3} key={idx}>
              <DestinationCard destination={destination} />
            </Col>)}
        </Row>
      </Container>
    </section>;
};
export default TopDestinations;