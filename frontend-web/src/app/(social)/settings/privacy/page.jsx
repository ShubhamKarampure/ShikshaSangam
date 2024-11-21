import PageMetaData from '@/components/PageMetaData';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import ActivityViewButton from './components/ActivityViewButton';
import { privacyData } from './data';
const PrivacyAndSafety = () => {
  return <>
    <PageMetaData title='Privacy and Safety' />
    <Card>
      <CardHeader className="border-0 pb-0">
        <CardTitle>Privacy and safety</CardTitle>
        <p className="mb-0">See information about your account, download an archive of your data, or learn about your account deactivation options</p>
      </CardHeader>
      <CardBody>
        <ul className="list-group">
          {privacyData.map((privacy, idx) => <li className="list-group-item d-md-flex justify-content-between align-items-start" key={idx}>
              <div className="me-md-3">
                <h6 className="mb-0"> {privacy.title}</h6>
                <p className="small mb-0">{privacy.description} </p>
              </div>
              {privacy.isView ? <ActivityViewButton /> : <Button variant="primary-soft" size="sm" className="mt-1 mt-md-0">
                  
                  <BsPencilSquare /> Change
                </Button>}
            </li>)}
        </ul>
      </CardBody>
      <CardFooter className="pt-0 text-end border-0">
        <Button variant="primary" size="sm" type="submit" className="mb-0">
          Save changes
        </Button>
      </CardFooter>
    </Card>
    </>;
};
export default PrivacyAndSafety;