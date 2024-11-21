import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import Followers from './components/Followers';
import { Link } from 'react-router-dom';
import Celebrations from './components/Celebrations';
import UpcomingCelebrations from './components/UpcomingCelebrations';
import LoadContentButton from '@/components/LoadContentButton';
import PageMetaData from '@/components/PageMetaData';
const Celebration = () => {
  return <>
    <PageMetaData title='Celebration' />
      <Col md={8} lg={6} className="vstack gap-4">
        <Celebrations />
        <UpcomingCelebrations />
      </Col>
      <Col lg={3}>
        <Row className="g-4">
          <Col sm={6} lg={12}>
            <Followers />
          </Col>

          <Col sm={6} lg={12}>
            <Card>
              <CardHeader className="pb-0 border-0">
                <CardTitle className="mb-0">Today’s news</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <h6 className="mb-0">
                    <Link to="/blog/details/">Ten questions you should answer truthfully</Link>
                  </h6>
                  <small>2hr</small>
                </div>

                <div className="mb-3">
                  <h6 className="mb-0">
                    <Link to="/blog/details/">Five unbelievable facts about money</Link>
                  </h6>
                  <small>3hr</small>
                </div>

                <div className="mb-3">
                  <h6 className="mb-0">
                    <Link to="/blog/details/">Best Pinterest Boards for learning about business</Link>
                  </h6>
                  <small>4hr</small>
                </div>

                <div className="mb-3">
                  <h6 className="mb-0">
                    <Link to="/blog/details/">Skills that you can learn from business</Link>
                  </h6>
                  <small>6hr</small>
                </div>

                <LoadContentButton name="View all latest news" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    </>;
};
export default Celebration;