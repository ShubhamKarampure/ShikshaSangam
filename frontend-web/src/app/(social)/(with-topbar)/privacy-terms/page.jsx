import { Card, CardBody, CardHeader, Col, Container, Row } from 'react-bootstrap';
import Footer from './components/Footer';
import CookieAlert from './components/CookieAlert';
import { Link } from 'react-router-dom';
const PrivacyAndTerms = () => {
  return <>
      <main>
        <Container>
          <Row className="g-4">
            <Col lg={8} className="mx-auto">
              <Card>
                <CardHeader>
                  <h1 className="card-title h4 mb-0">Privacy &amp; terms</h1>
                </CardHeader>
                <CardBody>
                  <h5>Your privacy matters</h5>
                  <p>
                    Started several mistake joy say painful removed reached end. State burst <Link to="">think end are its.</Link> Arrived off she
                    elderly beloved him affixed noisier yet.
                  </p>
                  <hr className="mt-2 mb-4" />
                  <h5>Table of Contents</h5>
                  <p>Age she way earnestly the fulfilled extremely.</p>
                  <ol>
                    <li>Post no so what deal evil rent by real in.</li>
                    <li>But her ready least set lived spite solid.</li>
                    <li>
                      Sex lasted dinner wanted <strong> indeed wished outlaw.</strong>
                    </li>
                    <li>Affronting imprudence do he he everything.</li>
                  </ol>
                  <hr className="mt-2 mb-4" />
                  <h5>Introduction</h5>
                  <p>
                    As it so contrasted oh estimating instrument. Size like body someone had. Are conduct
                    <mark>viewing boy minutes warrant the expense?</mark> Tolerably behavior may admit daughters offending her ask own. Praise effect
                    wishes change way and any wanted.
                  </p>
                  <p>
                    State burst think end are its. <u>Arrived off she elderly beloved himaf fixed noisier yet.</u> Course regard to up he hardly. View
                    four has said do men saw find dear shy. Talent men wicket add garden.
                  </p>
                  <hr className="mt-2 mb-4" />
                  <h5>Services</h5>
                  <p>
                    Existence certainly explained how improving the household pretended. Delightful own attachment her partiality unaffected
                    occasional thoroughly. Adieus it no wonders spirit houses.
                  </p>
                  <div className="alert alert-warning" role="alert">
                    This website stores cookies on your computer.
                  </div>
                  <p>
                    Started several mistake joy say painful removed reached end.
                    <em>
                      State burst think end are its. Arrived off she elderly beloved him affixed noisier yet. Course regard to up he hardly. View four
                      has said do men saw find dear shy.
                    </em>
                    Talent men wicket add garden.
                  </p>
                  <hr className="mt-2 mb-4" />
                  <h5>Messages</h5>
                  <p>
                    As young ye hopes no he place means. Partiality diminution gay yet entreaties admiration.
                    <strong className="text-secondary">In mention perhaps attempt pointed suppose.</strong> Unknown ye chamber of warrant of Norland
                    arrived.
                  </p>
                  <ul>
                    <li>Size like body someone had.</li>
                    <li>Are conduct viewing boy minutes warrant the expense.</li>
                    <li>Adieus it no wonders spirit houses. </li>
                    <li>Talent men wicket add garden. </li>
                  </ul>
                  <hr className="mt-2 mb-4" />
                  <h5>How we use your data</h5>
                  <p>
                    Affronting imprudence do he he everything. Sex lasted dinner wanted indeed wished outlaw.
                    <a href=""> Far advanced settling say finished raillery.</a> Offered chiefly farther of my no colonel shyness. Such on help ye
                    some door if in. Laughter proposal laughing any son law consider. Needed except up piqued an.
                  </p>
                  <p className="mb-0">
                    Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior
                    arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
      <CookieAlert />
    </>;
};
export default PrivacyAndTerms;