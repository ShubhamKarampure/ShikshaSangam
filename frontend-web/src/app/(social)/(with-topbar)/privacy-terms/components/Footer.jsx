import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
const Footer = () => {
  return <footer className="bg-mode py-3">
      <Container>
        <Row>
          <Col lg={6}>
            <ul className="nav lh-1">
              <li className="nav-item">
                <Link className="nav-link" to="/profile/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" target="_blank" to={developedByLink}>
                  Support
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" target="_blank" to="">
                  Docs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/privacy-terms">
                  Privacy &amp; terms
                </Link>
              </li>
            </ul>
          </Col>
          <Col lg={6}>
            <p className="text-end mb-0">
              ©{currentYear}&nbsp;
              <Link className="text-body" target="_blank" to={developedByLink}>
                {developedBy}&nbsp;
              </Link>
              All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>;
};
export default Footer;