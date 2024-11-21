import DropzoneFormInput from '@/components/form/DropzoneFormInput';
import { getAllPostVideos } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import useToggle from '@/hooks/useToggle';
import { timeSince } from '@/utils/date';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, FormControl, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import { BsCameraReels, BsPatchCheckFill, BsPlayFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import PageMetaData from '@/components/PageMetaData';
const VideoCard = ({
  video
}) => {
  const {
    title,
    views,
    image,
    user,
    isVerified,
    time,
    uploadTime
  } = video;
  return <Card className="p-0 shadow-none border-0 position-relative">
      <div className="position-relative">
        {image && <img className="rounded" src={image} alt="image" />}
        <div className="position-absolute top-0 end-0 p-3">
          <span className="icon-md bg-danger text-white rounded-circle" role="button">
            
            <BsPlayFill className="fs-5"> </BsPlayFill>
          </span>
        </div>
        <div className="position-absolute bottom-0 start-0 p-3 d-flex w-100">
          <span className="bg-dark bg-opacity-50 px-2 rounded text-white small">{time}</span>
          {uploadTime && <span className="bg-dark bg-opacity-50 px-2 rounded text-white small ms-auto">{timeSince(uploadTime)}</span>}
        </div>
      </div>
      <CardBody className="px-0">
        <div className="d-flex align-items-center mb-3">
          <div className="avatar avatar-xxs me-2">
            {user?.avatar && <img className="avatar-img rounded-circle" src={user.avatar} alt="avatar1" />}
          </div>
          <h6 className="mb-0">
            
            <Link to="">
              
              {user?.name} {isVerified && <BsPatchCheckFill className="text-success small" />}
            </Link>
          </h6>
          <span className="ms-auto small"> {views}</span>
        </div>
        <h6 className="mb-0">
          
          <Link className="stretched-link" to="/feed/post-videos">
            
            {title}
          </Link>
        </h6>
      </CardBody>
    </Card>;
};
const AllPostVideos = () => {
  const allVideos = useFetchData(getAllPostVideos);
  const {
    isTrue: isOpen,
    toggle
  } = useToggle();
  const VideoNotFound = () => {
    return <div className="my-sm-5 py-sm-5 text-center">
        <BsCameraReels className="display-1 text-body-secondary"> </BsCameraReels>
        <h4 className="mt-2 mb-3 text-body">No video founds</h4>
        <Button variant="primary-soft" size="sm" className="btn-sm" onClick={toggle}>
          
          Click here to add
        </Button>
      </div>;
  };
  return <>
    <PageMetaData title='Post Videos' />
      <Card>
        <CardHeader className="d-sm-flex align-items-center justify-content-between border-0 pb-0">
          <h1 className="h4 card-title">Videos</h1>
          <Button variant="primary-soft" onClick={toggle}>
            
            <FaPlus className="pe-1" /> Add video
          </Button>
        </CardHeader>
        <CardBody>
          <TabContainer defaultActiveKey="tab-1">
            <Nav className="nav-tabs nav-bottom-line">
              <NavItem>
                
                <NavLink eventKey="tab-1"> Home </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="tab-2"> Live </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="tab-3"> Show </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="tab-4"> Saved video </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="mb-0 pb-0">
              <TabPane className="fade" eventKey="tab-1">
                <Row className="g-3">
                  {allVideos?.map((video, idx) => <Col sm={6} lg={4} key={idx}>
                      <VideoCard video={video} />
                    </Col>)}
                </Row>
              </TabPane>
              <TabPane className="fade" eventKey="tab-2">
                <Row className="g-3">
                  {allVideos?.slice(3, 4)?.map((video, idx) => <Col sm={6} lg={4} key={idx}>
                      <VideoCard video={video} />
                    </Col>)}
                </Row>
              </TabPane>
              <TabPane className="fade" eventKey="tab-3">
                <VideoNotFound />
              </TabPane>
              <TabPane className="fade" eventKey="tab-4">
                <VideoNotFound />
              </TabPane>
            </TabContent>
          </TabContainer>
        </CardBody>
      </Card>

      <Modal show={isOpen} onHide={toggle} className="fade" id="modalCreateVideo" tabIndex={-1} aria-labelledby="modalLabelCreateVideo" aria-hidden="true">
        <ModalHeader closeButton>
          <h5 className="modal-title" id="modalLabelCreateVideo">
            Create video
          </h5>
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="mb-3">
              <FormLabel>Title</FormLabel>
              <FormControl type="text" placeholder="Add title here" />
            </div>
            <div className="mb-3">
              <FormLabel>Description</FormLabel>
              <textarea className="form-control" rows={3} placeholder="Add description here" defaultValue={''} />
            </div>
            <div className="mb-3">
              <DropzoneFormInput textClassName="mt-3" showPreview label="Upload videos" text="Drag here or click to upload video." icon={BsCameraReels} />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="success-soft" type="button" onClick={toggle}>
            Post video
          </Button>
        </ModalFooter>
      </Modal>
    </>;
};
export default AllPostVideos;