import { getAllCelebrations } from '@/helpers/data';
import { Fragment } from 'react';
import { Card, CardBody, CardHeader } from 'react-bootstrap';
import CelebrationCard from './CelebrationCard';
import { useFetchData } from '@/hooks/useFetchData';
const Celebrations = () => {
  const allCelebrations = useFetchData(getAllCelebrations);
  return <Card>
      <CardHeader className="border-0 pb-0">
        <h1 className="h4 card-title">Celebration</h1>
      </CardHeader>
      <CardBody>
        {allCelebrations?.slice(0, 5).map((celebration, idx) => <Fragment key={idx}>
            <CelebrationCard celebration={celebration} />
            {allCelebrations.slice(0, 5).length - 1 != idx && <hr className="my-4" />}
          </Fragment>)}
      </CardBody>
    </Card>;
};
export default Celebrations;