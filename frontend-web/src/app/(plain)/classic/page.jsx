import { Col, Container, Row } from 'react-bootstrap';
import Topbar from './components/Topbar';
import ContactSidebar from './components/ContactSidebar';
import LeftSidebar from './components/LeftSidebar';
import Feeds from './components/Feeds';
import Stories from './components/Stories';
import CreatePostCard from '@/components/cards/CreatePostCard';
const ClassicHome = () => {
  return <>
      <Topbar />

      <main>
        <Container fluid>
          <Row className="justify-content-between g-0">
            <Col md={2} lg={3} xxl={4} className="mt-n4">
              <LeftSidebar />
            </Col>
            <Col md={8} lg={6} xxl={4} className="vstack gap-4">
              <Stories />
              <CreatePostCard />
              <Feeds />
            </Col>
            <Col md={2} lg={3} xxl={4}>
              <ContactSidebar />
            </Col>
          </Row>
        </Container>
      </main>
    </>;
};
export default ClassicHome;