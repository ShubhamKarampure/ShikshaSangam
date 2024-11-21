import { Col, Container, Row } from 'react-bootstrap';
import background7 from '@/assets/images/bg/07.jpg';
import { Link } from 'react-router-dom';
const Hero = () => {
  return <section className="py-5 position-relative" style={{
    backgroundImage: `url(${background7})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center'
  }}>
      <div className="bg-overlay bg-dark opacity-8" />
      <Container>
        <div className="py-5">
          <Row className="position-relative">
            <Col xl={8} lg={10} className="mx-auto pt-sm-5 text-center">
              <ul className="nav nav-divider justify-content-center text-white pt-2 small mb-4">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="">
                    
                    Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="">
                    
                    Live Event
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="">
                    
                    Featured
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="">
                    
                    Music
                  </Link>
                </li>
              </ul>
              <h1 className="text-white">The learning conference</h1>
            </Col>
          </Row>
        </div>
      </Container>
    </section>;
};
export default Hero;