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
        console.log(data);
        if (data)
          setGroup(data);
      }
    })();
  }, []);
  return <>
    <PageMetaData title={group?.id ?? "Group Details"} />
   
    <div className="mx-5" style={{ marginTop: "70px" }}>
  <AllGroupDetails />
</div>


    
    </>;
};
export default GroupDetails;