import useToggle from '@/hooks/useToggle';
import { Button, Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
const ActivityViewButton = () => {
  const {
    isTrue: isOpen,
    toggle
  } = useToggle();
  const activityLog = [{
    location: 'London, UK',
    device: 'This Apple iMac'
  }, {
    location: 'California, USA',
    device: 'This Apple iMac'
  }, {
    location: 'New york, USA',
    device: 'This Windows'
  }, {
    location: 'Mumbai, India',
    device: 'This Windows'
  }];
  return <>
      <Button variant="primary-soft" onClick={toggle} size="sm" className="mt-1 mt-md-0">
        
        <BsEye /> View
      </Button>

      <Modal show={isOpen} onHide={toggle} className="fade" id="modalLoginActivity" tabIndex={-1} aria-labelledby="modalLabelLoginActivity" aria-hidden="true">
        <ModalHeader closeButton>
          <h5 className="modal-title" id="modalLabelLoginActivity">
            Where You&apos;re Logged in
          </h5>
        </ModalHeader>
        <ModalBody>
          <ul className="list-group list-group-flush">
            {activityLog.map((item, idx) => <li className="list-group-item d-flex justify-content-between align-items-center px-0 pb-3" key={idx}>
                <div className="me-2">
                  <h6 className="mb-0">{item.location}</h6>
                  <ul className="nav nav-divider small">
                    <li className="nav-item">Active now </li>
                    <li className="nav-item">{item.device} </li>
                  </ul>
                </div>
                <Button variant="primary-soft" size="sm">
                  
                  Logout
                </Button>
              </li>)}
          </ul>
        </ModalBody>
      </Modal>
    </>;
};
export default ActivityViewButton;