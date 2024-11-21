import { Col, Container, Row } from 'react-bootstrap';
import LatestBlogs from './components/LatestBlogs';
import SidePenal from './components/SidePenal';
import Footer from './components/Footer';
import PageMetaData from '@/components/PageMetaData';
const Blogs = () => {
  return <>
    <PageMetaData title='Blogs' />
      <main>
        <Container>
          <Row className="g-4">
            <Col lg={8}>
              <LatestBlogs />
            </Col>
            <Col lg={4}>
              <Row className="g-4">
                <SidePenal />
              </Row>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </>;
};
export default Blogs;