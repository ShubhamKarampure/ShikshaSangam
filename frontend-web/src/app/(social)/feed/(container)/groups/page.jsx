import PageMetaData from '@/components/PageMetaData';
import { Col } from 'react-bootstrap';
import AllGroups from './components/AllGroups';
const Groups = () => {
  return <>
      <PageMetaData title='Groups' />
      <Col md={8} lg={6} className="vstack gap-4">
        <AllGroups />
      </Col>
    </>;
};
export default Groups;