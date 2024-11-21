import PageMetaData from '@/components/PageMetaData';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
const MessagingSettings = () => {
  return <Card className="mb-4">
      <CardHeader className="border-0 pb-0">
        <CardTitle>Messaging privacy settings</CardTitle>
        <p className="mb-0">
          As young ye hopes no he place means. Partiality diminution gay yet entreaties admiration. In mention perhaps attempt pointed suppose.
          Unknown ye chamber of warrant of Norland arrived.
        </p>
      </CardHeader>
      <CardBody>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
            <div className="me-2">
              <h6 className="mb-0">Enable message request notifications</h6>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked" defaultChecked />
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
            <div className="me-2">
              <h6 className="mb-0">Invitations from your network</h6>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked2" defaultChecked />
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
            <div className="me-2">
              <h6 className="mb-0">Allow connections to add you on group</h6>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked3" />
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
            <div className="me-2">
              <h6 className="mb-0">Reply to comments</h6>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked4" />
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
            <div className="me-2">
              <h6 className="mb-0">Messages from activity on my page or channel</h6>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked5" defaultChecked />
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
            <div className="me-2">
              <h6 className="mb-0">Personalise tips for my page</h6>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked6" defaultChecked />
            </div>
          </li>
        </ul>
      </CardBody>
      <div className="card-footer pt-0 text-end border-0">
        <button type="submit" className="btn btn-sm btn-primary mb-0">
          Save changes
        </button>
      </div>
    </Card>;
};
const MessagingExperience = () => {
  const messagingExperiences = ['Read receipts and typing indicators', 'Message suggestions', 'Message nudges'];
  return <Card>
      <CardHeader className="border-0 pb-0">
        <CardTitle>Messaging experience</CardTitle>
        <p className="mb-0">Arrived off she elderly beloved him affixed noisier yet. </p>
      </CardHeader>
      <CardBody>
        <ul className="list-group list-group-flush">
          {messagingExperiences.map((message, idx) => <li className="list-group-item d-sm-flex justify-content-between align-items-center px-0" key={idx}>
              <div className="me-2">
                <h6 className="mb-0">{message}</h6>
              </div>
              <Button variant="primary-soft" size="sm" className="mt-1 mt-md-0">

                <BsPencilSquare /> Change
              </Button>
            </li>)}
        </ul>
      </CardBody>
      <CardFooter className="pt-0 text-end border-0">
        <Button variant="primary" size="sm" type="submit" className="mb-0">
          Save changes
        </Button>
      </CardFooter>
    </Card>;
};
const Messaging = () => {
  return <>
      <PageMetaData title='Messaging' />
      <MessagingSettings />
      <MessagingExperience />
    </>;
};
export default Messaging;