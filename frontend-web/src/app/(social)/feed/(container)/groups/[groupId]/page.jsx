import { Col } from 'react-bootstrap';
import AllGroupDetails from './components/page';
import { getGroupById } from '@/helpers/data';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
const GroupDetails = () => {
  const [group, setGroup] = useState();
  const {
    groupId
  } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (groupId) {
        const data = await getGroupById(groupId);
        if (data) setGroup(data);else navigate('/not-found');
      }
    })();
  }, []);
  return <>
    <PageMetaData title={group?.id ?? "Group Details"} />
    <Col md={8} lg={8} className="vstack gap-4">
      <AllGroupDetails />
    </Col>
    </>;
};
export default GroupDetails;