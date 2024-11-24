import DateFormInput from '@/components/form/DateFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import DropzoneFormInput from '@/components/form/DropzoneFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import useToggle from '@/hooks/useToggle';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import * as yup from 'yup';
import avatar1 from '@/assets/images/avatar/01.jpg';
import avatar2 from '@/assets/images/avatar/02.jpg';
import avatar3 from '@/assets/images/avatar/03.jpg';
import avatar4 from '@/assets/images/avatar/04.jpg';
import avatar5 from '@/assets/images/avatar/05.jpg';
import avatar6 from '@/assets/images/avatar/06.jpg';
import avatar7 from '@/assets/images/avatar/07.jpg';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsFileEarmarkText } from 'react-icons/bs';
const CreateEvent = () => {
  const guests = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];
  const {
    isTrue: isOpen,
    toggle
  } = useToggle();
  const eventFormSchema = yup.object({
    title: yup.string().required('Please enter event title'),
    description: yup.string().required('Please enter event description'),
    duration: yup.string().required('Please enter event duration'),
    location: yup.string().required('Please enter event location'),
    guest: yup.string().email('Please enter valid email').required('Please enter event guest email')
  });
  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(eventFormSchema)
  });
  return <>
      <Button variant="primary-soft" onClick={toggle}>
        <span className="d-flex align-items-center gap-1">
          <FaPlus className="pe-1" /> Create event
        </span>
      </Button>

      <Modal show={isOpen} onHide={toggle} centered className="fade" id="modalCreateEvents" tabIndex={-1} aria-labelledby="modalLabelCreateEvents" aria-hidden="true">
        <form onSubmit={handleSubmit(() => {})}>
          <ModalHeader closeButton>
            <h5 className="modal-title" id="modalLabelCreateEvents">
              Create event
            </h5>
          </ModalHeader>
          <ModalBody>
            <Row className="row g-4">
              <TextFormInput name="title" label="Title" placeholder="Event name here" containerClassName="col-12" control={control} />
              <TextAreaFormInput name="description" label="Description" rows={2} placeholder="Ex: topics, schedule, etc." containerClassName="col-12" control={control} />

              <Col sm={4}>
                <label className="form-label">Date</label>
                <DateFormInput options={{
                enableTime: false
              }} type="text" className="form-control" placeholder="Select date" />
              </Col>
              <div className="col-sm-4">
                <label className="form-label">Time</label>
                <DateFormInput options={{
                enableTime: true,
                noCalendar: true
              }} type="text" className="form-control" placeholder="Select time" />
              </div>
              <TextFormInput name="duration" label="Duration" placeholder="1hr 23m" containerClassName="col-sm-4" control={control} />
              <TextFormInput name="location" label="Location" placeholder="Logansport, IN 46947" containerClassName="col-12" control={control} />
              <TextFormInput name="guest" type="email" label="Add guests" placeholder="Guest email" containerClassName="col-12" control={control} />
              <Col xs={12} className="mt-3">
                <ul className="avatar-group list-unstyled align-items-center mb-0">
                  {guests.map((avatar, idx) => <li className="avatar avatar-xs" key={idx}>
                      <img className="avatar-img rounded-circle" src={avatar} alt="avatar" />
                    </li>)}
                  <li className="ms-3">
                    <small> +50 </small>
                  </li>
                </ul>
              </Col>
              <div className="mb-3">
                <DropzoneFormInput showPreview helpText="Drop presentation and document here or click to upload." icon={BsFileEarmarkText} label="Upload attachment" />
              </div>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="danger-soft" type="button" className="me-2" onClick={toggle}>
              
              Cancel
            </Button>
            <Button variant="success-soft" type="submit">
              Create now
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>;
};
export default CreateEvent;