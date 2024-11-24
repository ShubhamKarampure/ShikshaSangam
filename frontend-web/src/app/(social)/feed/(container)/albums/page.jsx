import PageMetaData from '@/components/PageMetaData';
import { Col } from 'react-bootstrap';
import AllPhotos from './components/AllPhotos';
const Albums = () => {
  return <>
      <PageMetaData title='Photos' />
      <Col md={8} lg={6} className="vstack gap-4">
        <AllPhotos />
      </Col>
    </>;
};
export default Albums;