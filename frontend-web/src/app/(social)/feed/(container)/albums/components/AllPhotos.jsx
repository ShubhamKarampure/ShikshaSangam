import { Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, FormControl, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import { BsBookmark, BsBookmarkCheck, BsChatFill, BsDownload, BsEnvelope, BsFileEarmarkX, BsFlag, BsHandThumbsUpFill, BsLink, BsPencil, BsPencilFill, BsPencilSquare, BsPerson, BsPersonBoundingBox, BsPersonX, BsReplyFill, BsShare, BsSlashCircle, BsTag, BsThreeDots, BsTrash, BsXCircle } from 'react-icons/bs';
import { FaCameraRetro, FaFolderOpen, FaPlus } from 'react-icons/fa';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import DropzoneFormInput from '@/components/form/DropzoneFormInput';
import GlightBox from '@/components/GlightBox';
import { getAllMedia } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import useToggle from '@/hooks/useToggle';
import avatar4 from '@/assets/images/avatar/04.jpg';
import avatar5 from '@/assets/images/avatar/05.jpg';
import { Link } from 'react-router-dom';
const PhotoCard = ({
  photo
}) => {
  return <>
      <div className="position-absolute bottom-0 end-0">
        <Dropdown className="mb-2 me-3">
          <DropdownToggle as="a" className="icon-sm bg-primary text-white rounded-circle cursor-pointer content-none" id="photoActionEdit" data-bs-toggle="dropdown" aria-expanded="false">
            <BsPencilFill />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end" aria-labelledby="photoActionEdit">
            <li>
              <DropdownItem>
                
                <BsTag size={19} className="fa-fw pe-1" /> Remove Tag
              </DropdownItem>
            </li>
            <li>
              <DropdownItem>
                
                <BsDownload size={19} className="fa-fw pe-1" /> Download
              </DropdownItem>
            </li>
            <li>
              <DropdownItem>
                
                <BsPerson size={19} className="fa-fw pe-1" /> Make Profile Picture
              </DropdownItem>
            </li>
            <li>
              <DropdownItem>
                
                <BsPersonBoundingBox size={19} className="fa-fw pe-1" /> Make Cover Photo
              </DropdownItem>
            </li>
            <li>
              <DropdownDivider />
            </li>
            <li>
              <DropdownItem>
                
                <BsFlag size={19} className="fa-fw pe-1" /> Report photo
              </DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
      </div>
      <GlightBox href={photo.image} data-gallery="image-popup" data-glightbox="description: .custom-desc2; descPosition: left;">
        <img className="rounded img-fluid" src={photo.image} alt="image" />
      </GlightBox>
      <div className="glightbox-desc custom-desc2 z-5">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar me-2">
              <img className="avatar-img rounded-circle" src={avatar4} alt="image" />
            </div>
            <div>
              <div className="nav nav-divider">
                <h6 className="nav-item card-title mb-0">Lori Ferguson</h6>
                <span className="nav-item small"> 2hr</span>
              </div>
              <p className="mb-0 small">Web Developer at Webestica</p>
            </div>
          </div>
          <Dropdown>
            <DropdownToggle as="a" className="content-none text-secondary btn btn-secondary-soft-hover py-1 px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
              <BsThreeDots />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardFeedAction">
              <li>
                <DropdownItem>
                  
                  <BsBookmark className="fa-fw pe-2" />
                  Save post
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  
                  <BsPersonX className="fa-fw pe-2" />
                  Unfollow lori ferguson
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  
                  <BsXCircle className="fa-fw pe-2" />
                  Hide post
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  
                  <BsSlashCircle className="fa-fw pe-2" />
                  Block
                </DropdownItem>
              </li>
              <li>
                <DropdownDivider />
              </li>
              <li>
                <DropdownItem>
                  
                  <BsFlag className="fa-fw pe-2" />
                  Report post
                </DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>
        </div>
        <p className="mt-3 mb-0">
          I&apos;m so privileged to be involved in the @bootstrap hiring process! <Link to="">#internship #inclusivebusiness</Link>
          <Link to="">#internship</Link> <Link to=""> #hiring</Link> <Link to="">#apply</Link>
        </p>
        <ul className="nav nav-stack py-3 small">
          <li className="nav-item">
            <Link className="nav-link active" to="">
              
              <BsHandThumbsUpFill className="pe-1" />
              Liked (56)
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              
              <BsChatFill className="pe-1" />
              Comments (12)
            </Link>
          </li>
          <Dropdown className="nav-item ms-auto">
            <DropdownToggle as="a" className="nav-link mb-0 content-none" id="cardShareAction" data-bs-toggle="dropdown" aria-expanded="false">
              <BsReplyFill className="fa-flip-horizontal pe-1" />
              Share (3)
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardShareAction">
              <li>
                <DropdownItem>
                  
                  <BsEnvelope className="fa-fw pe-2" />
                  Send via Direct Message
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  
                  <BsBookmarkCheck className="fa-fw pe-2" />
                  Bookmark
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  
                  <BsLink className="fa-fw pe-2" />
                  Copy link to post
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  
                  <BsShare className="fa-fw pe-2" />
                  Share post via …
                </DropdownItem>
              </li>
              <li>
                <DropdownDivider />
              </li>
              <li>
                <DropdownItem>
                  
                  <BsPencilSquare className="fa-fw pe-2" />
                  Share to News Feed
                </DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>
        </ul>
        <div className="d-flex mb-3">
          <div className="avatar avatar-xs me-2">
            <img className="avatar-img rounded-circle" src={avatar4} alt="" />
          </div>
          <form className="position-relative w-100">
            <textarea className="one form-control pe-4 bg-light" data-autoresize rows={1} placeholder="Add a comment..." defaultValue={''} />
            <div className="position-absolute top-0 end-0">
              <button className="btn" type="button">
                🙂
              </button>
            </div>
          </form>
        </div>
        <ul className="comment-wrap list-unstyled ">
          <li className="comment-item">
            <div className="d-flex">
              <div className="avatar avatar-xs">
                <img className="avatar-img rounded-circle" src={avatar5} alt="" />
              </div>
              <div className="ms-2">
                <div className="bg-light rounded-start-top-0 p-3 rounded">
                  <div className="d-flex justify-content-center">
                    <div className="me-2">
                      <h6 className="mb-1">
                        
                        <Link to=""> Frances Guerrero </Link>
                      </h6>
                      <p className="small mb-0">Removed demands expense account in outward tedious do.</p>
                    </div>
                    <small>5hr</small>
                  </div>
                </div>
                <ul className="nav nav-divider py-2 small">
                  <li className="nav-item">
                    <Link className="nav-link" to="">
                      
                      Like (3)
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="">
                      
                      Reply
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="">
                      
                      View 5 replies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>;
};
const AlbumCard = ({
  album
}) => {
  return <Col xs={6} lg={3}>
      <span role="button">
        <img className="rounded img-fluid" src={album.image} alt="image" />
      </span>
      <div className="hstack mt-3">
        <div>
          <h6 className="mb-0">
            
            <Link to=""> Cover Photos </Link>
          </h6>
          <Link className="text-secondary small" to="">
            {album.count} Items
          </Link>
        </div>
        <Dropdown className="ms-auto">
          <DropdownToggle as="a" role="button" className="icon-sm bg-light text-secondary rounded-circle content-none" id="photoActionEdit17" data-bs-toggle="dropdown" aria-expanded="false">
            <BsThreeDots />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end" aria-labelledby="photoActionEdit17">
            <li>
              <DropdownItem>
                
                <BsPencil size={18} className="fa-fw pe-1" /> Edit
              </DropdownItem>
            </li>
            <li>
              <DropdownItem>
                
                <BsDownload size={18} className="fa-fw pe-1" /> Download
              </DropdownItem>
            </li>
            <li>
              <DropdownItem>
                
                <BsTrash size={18} className="fa-fw pe-1" /> Delete
              </DropdownItem>
            </li>
            <li>
              <DropdownDivider />
            </li>
            <li>
              <DropdownItem>
                
                <BsFlag size={18} className="fa-fw pe-1" /> Report album
              </DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Col>;
};
const AllPhotos = () => {
  const allPhotos = useFetchData(getAllMedia);
  const {
    isTrue: isOpen,
    toggle
  } = useToggle();
  return <>
      <Card>
        <CardHeader className="d-sm-flex text-center align-items-center justify-content-between border-0 pb-0">
          <h1 className="card-title h4">Photos</h1>
          <Button variant="primary-soft" onClick={toggle}>
            
            <FaPlus className="pe-1" /> Create album
          </Button>
        </CardHeader>
        <CardBody>
          <TabContainer defaultActiveKey="tab-0">
            <Nav className="nav-tabs nav-bottom-line justify-content-center justify-content-md-start">
              <NavItem>
                
                <NavLink eventKey="tab-0"> Photos of you </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="tab-1"> Your photos </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="tab-2"> Recently added </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="tab-3"> Family </NavLink>
              </NavItem>
              <NavItem>
                
                <NavLink eventKey="tab-4"> Albums </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="mb-0 pb-0">
              <TabPane eventKey="tab-0" className="fade" id="tab-1">
                <Row className="g-3">
                  <Col xs={6} lg={3}>
                    <div className="border border-2 border-dashed h-100 rounded text-center d-flex align-items-center justify-content-center position-relative">
                      <Link className="stretched-link" to="">
                        <FaCameraRetro className="fs-1" />
                        <h6 className="mt-2">Add photo</h6>
                      </Link>
                    </div>
                  </Col>
                  {allPhotos?.map((photo, idx) => <Col xs={6} lg={3} className="position-relative" key={idx}>
                      <PhotoCard photo={photo} />
                    </Col>)}
                </Row>
              </TabPane>
              <TabPane eventKey="tab-1" className="fade" id="tab-2">
                <Row className="g-3">
                  <Col xs={6} lg={3}>
                    <div className="border border-2 border-dashed h-100 rounded text-center d-flex align-items-center justify-content-center position-relative">
                      <Link className="stretched-link" to="">
                        <FaCameraRetro className="fs-1" />
                        <h6 className="mt-2">Add photo</h6>
                      </Link>
                    </div>
                  </Col>
                  {allPhotos?.slice(0, 3).map((photo, idx) => <Col xs={6} lg={3} className="position-relative" key={idx}>
                      <PhotoCard photo={photo} />
                    </Col>)}
                </Row>
              </TabPane>
              <TabPane eventKey="tab-2" className="fade" id="tab-3">
                <Row className="g-3">
                  <Col xs={6} lg={3}>
                    <div className="border border-2 border-dashed h-100 rounded text-center d-flex align-items-center justify-content-center position-relative">
                      <Link className="stretched-link" to="">
                        <FaCameraRetro className="fs-1" />
                        <h6 className="mt-2">Add photo</h6>
                      </Link>
                    </div>
                  </Col>
                  {allPhotos?.slice(0, 3).map((photo, idx) => <Col xs={6} lg={3} className="position-relative" key={idx}>
                      <PhotoCard photo={photo} />
                    </Col>)}
                </Row>
              </TabPane>
              <TabPane eventKey="tab-3" className="fade text-center" id="tab-4">
                <div className="my-sm-5 py-sm-5">
                  <BsFileEarmarkX className="display-1 text-body-secondary"> </BsFileEarmarkX>
                  <h4 className="mt-2 mb-3 text-body">No photos or videos</h4>
                  <Button variant="primary-soft" size="sm" onClick={toggle}>
                    
                    Click here to add
                  </Button>
                </div>
              </TabPane>
              <TabPane eventKey="tab-4" className="fade" id="tab-5">
                <Row className="g-3">{allPhotos?.slice(0, 3).map((album, idx) => <AlbumCard album={album} key={idx} />)}</Row>
              </TabPane>
            </TabContent>
          </TabContainer>
        </CardBody>
      </Card>

      <Modal show={isOpen} onHide={toggle} className="fade" id="modalCreateAlbum" tabIndex={-1} aria-labelledby="modalLabelCreateAlbum" aria-hidden="true">
        <ModalHeader closeButton>
          <h5 className="modal-title" id="modalLabelCreateAlbum">
            Create album
          </h5>
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="mb-3">
              <FormLabel>Album name</FormLabel>
              <FormControl type="email" placeholder="Add album name here" />
            </div>
            <div className="mb-3">
              <FormLabel>Select audience</FormLabel>
              <ChoicesFormInput options={{
              searchEnabled: false
            }} className="form-select js-choice rounded" data-placeholder="false">
                <option value="PB">Public</option>
                <option value="FR">Friends</option>
                <option value="SF">Specific friends</option>
                <option value="OM">Only me</option>
                <option value="CM">Custom</option>
              </ChoicesFormInput>
            </div>
            <div className="mb-3">
              <DropzoneFormInput showPreview label="Upload Photos or Videos" icon={FaFolderOpen} text="Drop image here or click to upload." />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="button" variant="success-soft" onClick={toggle}>
            Create now
          </Button>
        </ModalFooter>
      </Modal>
    </>;
};
export default AllPhotos;