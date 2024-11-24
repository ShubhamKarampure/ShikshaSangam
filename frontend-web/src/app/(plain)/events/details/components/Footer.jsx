import { Col, Container, Row } from 'react-bootstrap';
import logo from '@/assets/images/logo.svg';
import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { footerData } from '../data';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
const Footer = () => {
  return <footer className="pt-5 bg-mode">
      <Container className="pt-4">
        <Row className="g-4">
          <Col sm={6} lg={3}>
            <img src={logo} alt="logo" />
            <p className="mt-3">Match way these she avoids seeing death their fat off. </p>
          </Col>
          {footerData.map((footerLink, idx) => <Col sm={6} lg={3} key={idx}>
              <h5 className="mb-4">{footerLink.title}</h5>
              <ul className="nav flex-column">
                {footerLink.items.map(({
              label,
              icon: Icon,
              url
            }, idx) => <li className="nav-item" key={idx}>
                    <Link className={clsx('nav-link', {
                'pt-0': idx === 0
              })} to={url ?? ''}>
                      
                      {Icon && <Icon size={16} className="fa-fw me-1" />} {label}
                    </Link>
                  </li>)}
              </ul>
            </Col>)}
        </Row>
      </Container>
      <hr className="mb-0 mt-5" />
      <div className="bg- light py-3">
        <Container>
          <Row>
            <Col lg={6}>
              <ul className="nav justify-content-center justify-content-lg-start lh-1">
                <li className="nav-item">
                  <Link className="nav-link ps-0" to="">
                    Support
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" target="_blank" to="">
                    Docs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="">
                    Terms of Use
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="">
                    Privacy &amp; terms
                  </Link>
                </li>
              </ul>
            </Col>
            <Col lg={6}>
              <p className="text-center text-lg-end mb-0">
                ©{currentYear}
                <a className="text-body" target="_blank" href={developedByLink}>
                  
                  {developedBy}
                </a>
                All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>;
};
export default Footer;