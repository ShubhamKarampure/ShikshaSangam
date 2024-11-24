import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import { BsBookmark, BsBookmarkCheck, BsCalendarDate, BsCalendarPlus, BsCameraReels, BsChatFill, BsEnvelope, BsFileEarmarkPdf, BsFilm, BsFlag, BsGear, BsGlobe2, BsHeart, BsHeartFill, BsLink, BsLock, BsPatchCheckFill, BsPencilSquare, BsPeople, BsPerson, BsPersonCheckFill, BsPersonX, BsReplyFill, BsSendFill, BsShare, BsSlashCircle, BsThreeDots, BsXCircle } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import avatar1 from '@/assets/images/avatar/01.jpg';
import avatar2 from '@/assets/images/avatar/02.jpg';
import avatar3 from '@/assets/images/avatar/03.jpg';
import avatar4 from '@/assets/images/avatar/04.jpg';
import avatar5 from '@/assets/images/avatar/05.jpg';
import avatar6 from '@/assets/images/avatar/06.jpg';
import avatar7 from '@/assets/images/avatar/07.jpg';
import avatar8 from '@/assets/images/avatar/08.jpg';
import avatar9 from '@/assets/images/avatar/09.jpg';
import avatar10 from '@/assets/images/avatar/10.jpg';
import logo13 from '@/assets/images/logo/13.svg';
import CreatePostCard from '@/components/cards/CreatePostCard';
import PostCard from '@/components/cards/PostCard';
import { getAllFeeds } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import { Link } from 'react-router-dom';
const ActionMenu = ({
  name
}) => {
  return <Dropdown>
      <DropdownToggle as="a" className="text-secondary btn btn-secondary-soft-hover py-1 px-2 content-none" id="cardFeedAction">
        <BsThreeDots />
      </DropdownToggle>

      <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardFeedAction">
        <li>
          <DropdownItem>
            
            <BsBookmark size={22} className="fa-fw pe-2" />
            Save post
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            
            <BsPersonX size={22} className="fa-fw pe-2" />
            Unfollow {name}
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            
            <BsXCircle size={22} className="fa-fw pe-2" />
            Hide post
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            
            <BsSlashCircle size={22} className="fa-fw pe-2" />
            Block
          </DropdownItem>
        </li>
        <li>
          <DropdownDivider />
        </li>
        <li>
          <DropdownItem>
            
            <BsFlag size={22} className="fa-fw pe-2" />
            Report post
          </DropdownItem>
        </li>
      </DropdownMenu>
    </Dropdown>;
};
const AboutCard = () => {
  return <Card>
      <CardHeader className="border-0 pb-0">
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardBody className="position-relative pt-0">
        <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.</p>
        <ul className="list-unstyled mt-3 mb-0">
          <li className="mb-2">
            
            <BsCalendarDate className="fa-fw pe-1" /> People: <strong> 20 Members </strong>
          </li>
          <li className="mb-2">
            
            <BsHeart className="fa-fw pe-1" /> Status: <strong> Public </strong>
          </li>
          <li className="mb-2">
            
            <BsGlobe2 className="fa-fw pe-1" /> <strong>www.webestica.com </strong>
          </li>
        </ul>
      </CardBody>
    </Card>;
};
const AllGroupDetails = () => {
  const members = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10];
  const allPosts = useFetchData(getAllFeeds);
  return <TabContainer defaultActiveKey="group-tab-1">
      <Card>
        <CardBody>
          <div className="d-md-flex flex-wrap align-items-start text-center text-md-start">
            <div className="mb-2">
              <div className="avatar avatar-xl">
                <img className="avatar-img border-0" src={logo13} alt="logo" />
              </div>
            </div>
            <div className="ms-md-4 mt-3">
              <h1 className="h5 mb-0">
                Apple Education <BsPatchCheckFill className="text-success small" />
              </h1>
              <ul className="nav nav-divider justify-content-center justify-content-md-start">
                <li className="nav-item"> Private group </li>
                <li className="nav-item"> 28.3K members </li>
              </ul>
            </div>
            <div className="d-flex justify-content-center justify-content-md-start align-items-center mt-3 ms-lg-auto">
              <Button variant="primary-soft" size="sm" className="me-2" type="button">
                
                <BsPersonCheckFill size={16} className="pe-1" /> Joined
              </Button>
              <Button variant="success" size="sm" className="me-2" type="button">
                
                <FaPlus className="pe-1" /> Invite
              </Button>
              <Dropdown>
                <DropdownToggle as="a" className="icon-sm btn btn-dark-soft content-none" type="button" id="groupAction" data-bs-toggle="dropdown" aria-expanded="false">
                  <span>
                    <BsThreeDots />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end" aria-labelledby="groupAction">
                  <li>
                    <DropdownItem>
                      
                      <BsBookmark size={22} className="fa-fw pe-2" />
                      Share profile in a message
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsFileEarmarkPdf size={22} className="fa-fw pe-2" />
                      Save your profile to PDF
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsLock size={22} className="fa-fw pe-2" />
                      Lock profile
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownDivider />
                  </li>
                  <li>
                    <DropdownItem>
                      
                      <BsGear size={22} className="fa-fw pe-2" />
                      Profile settings
                    </DropdownItem>
                  </li>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <ul className="avatar-group list-unstyled justify-content-center justify-content-md-start align-items-center mb-0 mt-3 flex-wrap">
            {members.map((member, idx) => <li className="avatar avatar-xs" key={idx}>
                <img className="avatar-img rounded-circle" src={member} alt="avatar" />
              </li>)}
            <li className="avatar avatar-xs me-2">
              <div className="avatar-img rounded-circle bg-primary">
                <span className="smaller text-white position-absolute top-50 start-50 translate-middle">+19</span>
              </div>
            </li>
            <li className="small text-center">Carolyn Ortiz, Frances Guerrero, and 20 joined group</li>
          </ul>
        </CardBody>
        <CardFooter className="pb-0">
          <Nav className="nav-tabs nav-bottom-line justify-content-center justify-content-md-start mb-0">
            <NavItem>
              
              <NavLink eventKey="group-tab-1"> Feed </NavLink>
            </NavItem>
            <NavItem>
              
              <NavLink eventKey="group-tab-2"> About </NavLink>
            </NavItem>
            <NavItem>
              
              <NavLink eventKey="group-tab-3">
                
                Connections <span className="badge bg-success bg-opacity-10 text-success small"> 230</span>
              </NavLink>
            </NavItem>
            <NavItem>
              
              <NavLink eventKey="group-tab-4"> Media</NavLink>
            </NavItem>
            <NavItem>
              
              <NavLink eventKey="group-tab-5"> Videos</NavLink>
            </NavItem>
            <NavItem>
              
              <NavLink eventKey="group-tab-6"> Events</NavLink>
            </NavItem>
          </Nav>
        </CardFooter>
      </Card>
      <TabContent className="pt-0 pb-0 mb-0">
        <TabPane className="fade" eventKey="group-tab-1">
          <Row className="g-4">
            <Col lg={8} className="vstack gap-4">
              <CreatePostCard />
              {allPosts?.slice(0, 1).map((post, idx) => <PostCard {...post} key={idx} />)}
              <Card>
                <div className="border-bottom">
                  <p className="small mb-0 px-4 py-2">
                    <BsHeartFill className="text-danger pe-1" size={18} />
                    Sam Lanson likes this post
                  </p>
                </div>
                <CardHeader className="border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="avatar me-2">
                        <span role="button">
                          
                          <img className="avatar-img rounded-circle" src={logo13} alt="" />
                        </span>
                      </div>
                      <div>
                        <h6 className="card-title mb-0">
                          
                          <Link to=""> Apple Education </Link>
                        </h6>
                        <p className="mb-0 small">9 November at 23:29</p>
                      </div>
                    </div>
                    <ActionMenu />
                  </div>
                </CardHeader>
                <CardBody className="card-body pb-0">
                  <p>
                    Find out how you can save time in the classroom this year. Earn recognition while you learn new skills on iPad and Mac. Start
                    recognition your first Apple Teacher badge today!
                  </p>
                  <ul className="nav nav-stack pb-2 small">
                    <li className="nav-item">
                      <Link className="nav-link active text-secondary " to="">
                        
                        <span className="icon-xs bg-danger text-white rounded-circle me-1">
                          <BsHeartFill size={12} />
                        </span>
                        Louis, Billy and 126 others
                      </Link>
                    </li>
                    <li className="nav-item ms-sm-auto">
                      <Link className="nav-link" to="">
                        
                        <BsChatFill className="pe-1" size={18} />
                        Comments (12)
                      </Link>
                    </li>
                  </ul>
                </CardBody>
                <CardFooter className="py-3">
                  <ul className="nav nav-fill nav-stack small">
                    <li className="nav-item">
                      <Link className="nav-link mb-0 active" to="">
                        
                        <BsHeart size={18} className="pe-1" />
                        Liked (56)
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link mb-0" to="">
                        
                        <BsChatFill size={18} className="pe-1" />
                        Comments (12)
                      </Link>
                    </li>
                    <Dropdown className="nav-item">
                      <DropdownToggle as="a" className="nav-link mb-0 content-none" id="cardShareAction" data-bs-toggle="dropdown" aria-expanded="false">
                        <BsReplyFill size={16} className="flip-horizontal ps-1" />
                        Share (3)
                      </DropdownToggle>

                      <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardShareAction">
                        <li>
                          <DropdownItem>
                            
                            <BsEnvelope size={22} className="fa-fw pe-2" />
                            Send via Direct Message
                          </DropdownItem>
                        </li>
                        <li>
                          <DropdownItem>
                            
                            <BsBookmarkCheck size={22} className="fa-fw pe-2" />
                            Bookmark
                          </DropdownItem>
                        </li>
                        <li>
                          <DropdownItem>
                            
                            <BsLink size={22} className="fa-fw pe-2" />
                            Copy link to post
                          </DropdownItem>
                        </li>
                        <li>
                          <DropdownItem>
                            
                            <BsShare size={22} className="fa-fw pe-2" />
                            Share post via …
                          </DropdownItem>
                        </li>
                        <li>
                          <DropdownDivider />
                        </li>
                        <li>
                          <DropdownItem>
                            
                            <BsPencilSquare size={22} className="fa-fw pe-2" />
                            Share to News Feed
                          </DropdownItem>
                        </li>
                      </DropdownMenu>
                    </Dropdown>
                    <li className="nav-item">
                      <Link className="nav-link mb-0" to="">
                        
                        <BsSendFill size={16} className="pe-1" />
                        Send
                      </Link>
                    </li>
                  </ul>
                </CardFooter>
              </Card>
            </Col>
            <Col lg={4}>
              <AboutCard />
            </Col>
          </Row>
        </TabPane>
        <TabPane className="fade" eventKey="group-tab-2">
          <Card className="card-body">
            <div className="my-sm-5 py-sm-5 text-center">
              <BsPerson className="display-1 text-body-secondary"> </BsPerson>
              <h4 className="mt-2 mb-3 text-body">No about details</h4>
              <Button variant="primary-soft" size="sm">
                
                Click here to add
              </Button>
            </div>
          </Card>
        </TabPane>
        <TabPane className="fade" eventKey="group-tab-3">
          <Card className="card-body">
            <div className="my-sm-5 py-sm-5 text-center">
              <BsPeople className="display-1 text-body-secondary"> </BsPeople>
              <h4 className="mt-2 mb-3 text-body">No connections founds</h4>
              <Button variant="primary-soft" size="sm">
                
                Click here to add
              </Button>
            </div>
          </Card>
        </TabPane>
        <TabPane className="fade" eventKey="group-tab-4">
          <Card className="card-body">
            <div className="my-sm-5 py-sm-5 text-center">
              <BsFilm className="display-1 text-body-secondary"> </BsFilm>
              <h4 className="mt-2 mb-3 text-body">No media founds</h4>
              <Button variant="primary-soft" size="sm">
                
                Click here to add
              </Button>
            </div>
          </Card>
        </TabPane>
        <TabPane className="fade" eventKey="group-tab-5">
          <Card className="card-body">
            <div className="my-sm-5 py-sm-5 text-center">
              <BsCameraReels className="display-1 text-body-secondary"> </BsCameraReels>
              <h4 className="mt-2 mb-3 text-body">No videos founds</h4>
              <Button variant="primary-soft" size="sm">
                
                Click here to add
              </Button>
            </div>
          </Card>
        </TabPane>
        <TabPane className="fade" eventKey="group-tab-6">
          <Card className="card-body">
            <div className="my-sm-5 py-sm-5 text-center">
              <BsCalendarPlus className="display-1 text-body-secondary"> </BsCalendarPlus>
              <h4 className="mt-2 mb-3 text-body">No events founds</h4>
              <Button variant="primary-soft" size="sm">
                
                Click here to add
              </Button>
            </div>
          </Card>
        </TabPane>
      </TabContent>
    </TabContainer>;
};
export default AllGroupDetails;