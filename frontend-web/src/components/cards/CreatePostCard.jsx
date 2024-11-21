import { Button, Card, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { BsBookmarkCheck, BsCalendar2EventFill, BsCameraReels, BsCameraReelsFill, BsCameraVideoFill, BsEmojiSmileFill, BsEnvelope, BsFileEarmarkText, BsGeoAltFill, BsImageFill, BsImages, BsPencilSquare, BsTagFill, BsThreeDots } from 'react-icons/bs';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useToggle from '@/hooks/useToggle';
import DropzoneFormInput from '../form/DropzoneFormInput';
import TextFormInput from '../form/TextFormInput';
import TextAreaFormInput from '../form/TextAreaFormInput';
import DateFormInput from '../form/DateFormInput';
import avatar1 from '@/assets/images/avatar/01.jpg';
import avatar2 from '@/assets/images/avatar/02.jpg';
import avatar3 from '@/assets/images/avatar/03.jpg';
import avatar4 from '@/assets/images/avatar/04.jpg';
import avatar5 from '@/assets/images/avatar/05.jpg';
import avatar6 from '@/assets/images/avatar/06.jpg';
import avatar7 from '@/assets/images/avatar/07.jpg';
import ChoicesFormInput from '../form/ChoicesFormInput';
import { Link } from 'react-router-dom';
const CreatePostCard = () => {
  const guests = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];
  const {
    isTrue: isOpenPhoto,
    toggle: togglePhotoModel
  } = useToggle();
  const {
    isTrue: isOpenVideo,
    toggle: toggleVideoModel
  } = useToggle();
  const {
    isTrue: isOpenEvent,
    toggle: toggleEvent
  } = useToggle();
  const {
    isTrue: isOpenPost,
    toggle: togglePost
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
      <Card className="card-body">
        <div className="d-flex mb-3">
          <div className="avatar avatar-xs me-2">
            <span role="button">
              
              <img className="avatar-img rounded-circle" src={avatar3} alt="avatar3" />
            </span>
          </div>

          <form className="w-100">
            <textarea className="form-control pe-4 border-0" rows={2} data-autoresize placeholder="Share your thoughts..." defaultValue={''} />
          </form>
        </div>

        <ul className="nav nav-pills nav-stack small fw-normal">
          <li className="nav-item">
            <a className="nav-link bg-light py-1 px-2 mb-0" onClick={togglePhotoModel}>
              
              <BsImageFill size={20} className="text-success pe-2" />
              Photo
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link bg-light py-1 px-2 mb-0" onClick={toggleVideoModel}>
              
              <BsCameraReelsFill size={20} className="text-info pe-2" />
              Video
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link bg-light py-1 px-2 mb-0" onClick={toggleEvent}>
              
              <BsCalendar2EventFill size={20} className="text-danger pe-2" />
              Event
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link bg-light py-1 px-2 mb-0" onClick={togglePost}>
              
              <BsEmojiSmileFill size={20} className="text-warning pe-2" />
              Feeling /Activity
            </a>
          </li>
          <Dropdown drop="start" className="nav-item ms-lg-auto">
            <DropdownToggle as="a" className="nav-link bg-light py-1 px-2 mb-0 content-none" id="feedActionShare" data-bs-toggle="dropdown" aria-expanded="false">
              <BsThreeDots />
            </DropdownToggle>

            <DropdownMenu className="dropdown-menu-end" aria-labelledby="feedActionShare">
              <li>
                <DropdownItem>
                  
                  <BsEnvelope size={21} className="fa-fw pe-2" />
                  Create a poll
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  
                  <BsBookmarkCheck size={21} className="fa-fw pe-2" />
                  Ask a question
                </DropdownItem>
              </li>
              <li>
                <DropdownDivider />
              </li>
              <li>
                <DropdownItem>
                  
                  <BsPencilSquare size={21} className="fa-fw pe-2" />
                  Help
                </DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>
        </ul>
      </Card>

      {/* photo */}
      <Modal show={isOpenPhoto} onHide={togglePhotoModel} centered className="fade" id="feedActionPhoto" tabIndex={-1} aria-labelledby="feedActionPhotoLabel" aria-hidden="true">
        <ModalHeader closeButton>
          <h5 className="modal-title" id="feedActionPhotoLabel">
            Add post photo
          </h5>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex mb-3">
            <div className="avatar avatar-xs me-2">
              <img className="avatar-img rounded-circle" src={avatar3} alt="" />
            </div>
            <form className="w-100">
              <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows={2} placeholder="Share your thoughts..." defaultValue={''} />
            </form>
          </div>
          <div>
            <label className="form-label">Upload attachment</label>
            <DropzoneFormInput icon={BsImages} showPreview text="Drag here or click to upload photo." />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal">
            Cancel
          </button>
          <button type="button" className="btn btn-success-soft">
            Post
          </button>
        </ModalFooter>
      </Modal>

      {/* video */}
      <Modal centered show={isOpenVideo} onHide={toggleVideoModel} className="fade" id="feedActionVideo" tabIndex={-1}>
        <ModalHeader closeButton>
          <h5 className="modal-title" id="feedActionVideoLabel">
            Add post video
          </h5>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex mb-3">
            <div className="avatar avatar-xs me-2">
              <img className="avatar-img rounded-circle" src={avatar3} alt="" />
            </div>
            <form className="w-100">
              <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows={2} placeholder="Share your thoughts..." defaultValue={''} />
            </form>
          </div>
          <div>
            <DropzoneFormInput label="Upload attachment" icon={BsCameraReels} showPreview text="Drag here or click to upload video." />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger-soft" type="button" className="me-2">
            <BsCameraVideoFill className="pe-1" /> Live video
          </Button>
          <Button variant="soft-success" type="button">
            Post
          </Button>
        </ModalFooter>
      </Modal>

      {/* event */}
      <Modal show={isOpenEvent} onHide={toggleEvent} centered className="fade" id="modalCreateEvents" tabIndex={-1} aria-labelledby="modalLabelCreateEvents" aria-hidden="true">
        <form onSubmit={handleSubmit(() => {})}>
          <ModalHeader closeButton>
            <h5 className="modal-title" id="modalLabelCreateEvents">
              Create event
            </h5>
          </ModalHeader>
          <ModalBody>
            <Row className="g-4">
              <TextFormInput name="title" label="Title" placeholder="Event name here" containerClassName="col-12" control={control} />
              <TextAreaFormInput name="description" label="Description" rows={2} placeholder="Ex: topics, schedule, etc." containerClassName="col-12" control={control} />

              <Col sm={4}>
                <label className="form-label">Date</label>
                <DateFormInput options={{
                enableTime: false
              }} type="text" className="form-control" placeholder="Select date" />
              </Col>
              <Col sm={4}>
                <label className="form-label">Time</label>
                <DateFormInput options={{
                enableTime: true,
                noCalendar: true
              }} type="text" className="form-control" placeholder="Select time" />
              </Col>
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
            <Button variant="danger-soft" type="button" className="me-2" onClick={toggleEvent}>
              
              Cancel
            </Button>
            <Button variant="success-soft" type="submit">
              Create now
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* feeling/activity */}
      <Modal show={isOpenPost} onHide={togglePost} className="fade" centered id="modalCreateFeed" tabIndex={-1}>
        <ModalHeader closeButton>
          <h5 className="modal-title" id="modalLabelCreateFeed">
            Create post
          </h5>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex mb-3">
            <div className="avatar avatar-xs me-2">
              <img className="avatar-img rounded-circle" src={avatar3} alt="" />
            </div>
            <form className="w-100">
              <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows={4} placeholder="Share your thoughts..." defaultValue={''} />
            </form>
          </div>
          <div className="hstack gap-2">
            <OverlayTrigger overlay={<Tooltip>Photo</Tooltip>}>
              <Link className="icon-md bg-success bg-opacity-10 text-success rounded-circle" to="">
                
                <BsImageFill />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Video</Tooltip>}>
              <Link className="icon-md bg-info bg-opacity-10 text-info rounded-circle" to="">
                
                <BsCameraReelsFill />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Events</Tooltip>}>
              <Link className="icon-md bg-danger bg-opacity-10 text-danger rounded-circle" to="">
                
                <BsCalendar2EventFill />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Feeling/Activity</Tooltip>}>
              <Link className="icon-md bg-warning bg-opacity-10 text-warning rounded-circle" to="">
                
                <BsEmojiSmileFill />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Check in</Tooltip>}>
              <Link className="icon-md bg-light text-secondary rounded-circle" to="">
                
                <BsGeoAltFill />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Tag people on top</Tooltip>}>
              <Link className="icon-md bg-primary bg-opacity-10 text-primary rounded-circle" to="">
                
                <BsTagFill />
              </Link>
            </OverlayTrigger>
          </div>
        </ModalBody>
        <ModalFooter className="row justify-content-between">
          <Col lg={3}>
            <ChoicesFormInput options={{
            searchEnabled: false
          }} className="form-select js-choice choice-select-text-none" data-position="top" data-search-enabled="false">
              <option value="PB">Public</option>
              <option value="PV">Friends</option>
              <option value="PV">Only me</option>
              <option value="PV">Custom</option>
            </ChoicesFormInput>
          </Col>
          <Col lg={8} className="text-sm-end">
            <Button variant="danger-soft" type="button" className="me-2">
              
              <BsCameraVideoFill className="pe-1" /> Live video
            </Button>
            <Button variant="success-soft" type="button">
              Post
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    </>;
};
export default CreatePostCard;