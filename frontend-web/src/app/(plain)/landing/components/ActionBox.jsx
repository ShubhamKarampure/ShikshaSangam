import { Card, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import appStore from '@/assets/images/app-store.svg';
import googlePlay from '@/assets/images/google-play.svg';
const ActionBox = () => {
  return <section className="py-4 py-sm-5">
      <Container>
        <Card className="card-body bg-light shadow-none border-0 p-4 p-sm-5 text-center">
          <Col lg={8} className="mx-auto">
            <h2 className="h1">People prefer to message</h2>
            <p className="lead mb-4">Frequently sufficient to be unaffected. The furnished she concluded depending procuring concealed. </p>
            <div className="d-flex justify-content-center">
              <Link to="/download">
                <img className="h-40px" src={appStore} alt="app-store" />
              </Link>
              <Link to="/download">
                <img className="h-40px ms-1 ms-sm-2" src={googlePlay} alt="google-play" />
              </Link>
            </div>
            <ul className="nav nav-divider justify-content-center mt-4">
              <li className="nav-item"> Easy set-up </li>
              <li className="nav-item"> Free Forever </li>
              <li className="nav-item"> Secure </li>
            </ul>
          </Col>
        </Card>
      </Container>
    </section>;
};
export default ActionBox;