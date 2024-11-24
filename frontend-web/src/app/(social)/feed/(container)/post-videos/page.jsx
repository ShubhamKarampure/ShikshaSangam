import PageMetaData from '@/components/PageMetaData';
import { Col } from 'react-bootstrap';
import AllPostVideos from './components/AllPostVideos';
const PostVideos = () => {
  return <>
    <PageMetaData title='Post Videos' />
    <Col md={8} lg={6} className="vstack gap-4">
      <AllPostVideos />
    </Col>
    </>;
};
export default PostVideos;