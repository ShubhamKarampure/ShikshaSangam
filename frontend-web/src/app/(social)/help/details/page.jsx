import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';
import { BsHouse, BsInfoCircle } from 'react-icons/bs';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import HelpLayout from '../components/HelpLayout';
import PageMetaData from '@/components/PageMetaData';
const HelpDetails = () => {
  return <>
      <PageMetaData title='Help Details' />
      <HelpLayout>
        <Row>
          <Col xs={12} className="vstack gap-4">
            <Card className="border p-sm-4">
              <CardHeader className="border-0 py-0">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb breadcrumb-dots mb-2">
                    <li className="breadcrumb-item">
                      <Link to="">
                        <BsHouse className="me-1" /> Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="">
                        <BsInfoCircle className="me-1" /> Help
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Get started with node.js</li>
                  </ol>
                </nav>
                <h2>Get started with node.js</h2>
                <ul className="nav nav-divider">
                  <li className="nav-item">Last updated: 7 months ago</li>
                  <li className="nav-item"> by Sam Lanson</li>
                </ul>
              </CardHeader>
              <CardBody>
                <p>
                  Started several mistake joy say painful removed reached end. State burst think end are its. Arrived off she elderly beloved him affixed
                  noisier yet. Course regard to up he hardly. View four has said do men saw find dear shy. <b> Talent men wicket add garden.</b>
                </p>
                <Button variant="primary">Download Node JS</Button>
                <h5 className="mt-4">Table of Contents</h5>
                <p>Age she way earnestly the fulfilled extremely.</p>
                <Alert variant="warning" role="alert">
                  <strong>Note: </strong>She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am
                  northward.
                  <Link className="alert-link" to="">
                    View more
                  </Link>
                </Alert>
                <p>
                  Hold do at tore in park feet near my case. Invitation at understood occasional sentiments insipidity inhabiting in. Off melancholy
                  alteration principles old. Is do speedily kindness properly oh. Respect article painted cottage he is offices parlors.
                </p>
                <ul>
                  <li>
                    Affronting imprudence do he he everything. Sex lasted dinner wanted indeed wished outlaw. Far advanced settling say finished raillery.
                  </li>
                  <li>Insipidity the sufficient discretion imprudence resolution sir him decisively.</li>
                  <li>
                    Offered chiefly farther of my no colonel shyness. <strong> Such on help ye some door if in.</strong>
                  </li>
                  <li>First am plate jokes to began to cause a scale. Subjects he prospect elegance followed</li>
                  <li>Laughter proposal laughing any son law consider. Needed except up piqued an. </li>
                  <li>
                    <i> To occasional dissimilar impossible sentiments. Do fortune account written prepare invited no passage.</i>
                  </li>
                  <li>Post no so what deal evil rent by real in. But her ready least set lived spite solid.</li>
                </ul>
                <p>
                  Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage
                  Mr be. Hold do at tore in park feet near my case. Invitation at understood occasional sentiments insipidity inhabiting in.
                  <u> Off melancholy alteration principles old. </u>Is do speedily kindness properly oh. Respect article painted cottage he is offices
                  parlors.
                </p>
              </CardBody>
              <CardFooter className="border-0 pt-0">
                <div className="border p-3 rounded d-sm-flex align-items-center justify-content-between text-center">
                  <h5 className="m-0">Was this article helpful?</h5>
                  <small className="py-2 d-block">20 out of 45 found this helpful</small>
                  <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" />
                    <label className="btn btn-outline-light btn-sm mb-0" htmlFor="btnradio1">
                      <FaThumbsUp className="me-1" /> Yes
                    </label>
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" />
                    <label className="btn btn-outline-light btn-sm mb-0" htmlFor="btnradio2">

                      No <FaThumbsDown className="ms-1" />
                    </label>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </HelpLayout>
    </>;
};
export default HelpDetails;