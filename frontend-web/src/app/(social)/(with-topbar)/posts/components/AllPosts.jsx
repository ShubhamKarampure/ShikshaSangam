import TinySlider from '@/components/TinySlider';
import { Button, Card, CardBody, Col, Container, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import VideoPlayer from './VideoPlayer';
import { Link } from 'react-router-dom';
import { BsBookmarkCheck, BsCardText, BsChatFill, BsEnvelope, BsHandThumbsUpFill, BsLink, BsPencilSquare, BsPlayFill, BsReplyFill, BsShare } from 'react-icons/bs';
import clsx from 'clsx';
import GlightBox from '@/components/GlightBox';
import { postData } from '@/assets/data/social';
import { Fragment, useState } from 'react';
const postSliderSettings = {
  arrowKeys: false,
  gutter: 0,
  autoplayButton: false,
  autoplayButtonOutput: false,
  nested: 'inner',
  mouseDrag: true,
  autoplay: true,
  controls: false,
  items: 1,
  nav: true,
  responsive: {
    1: {
      items: 1
    }
  }
};
const PostCard = ({
  post
}) => {
  const {
    comments,
    likeCount,
    share,
    title,
    iframe,
    image,
    isPlyer,
    isVideo,
    photos
  } = post;
  return <Card className={clsx(isVideo ? 'p-0 shadow-none border-0 position-relative' : 'h-100')}>
      {isVideo && image && <div className="position-relative">
          <img className="rounded" src={image} alt="video" />

          <div className="position-absolute top-0 end-0 p-3">
            <GlightBox className="icon-md bg-danger text-white rounded-circle" data-glightbox href="assets/images/videos/video-call.mp4">
              
              <BsPlayFill className="fs-5"> </BsPlayFill>
            </GlightBox>
          </div>

          <div className="position-absolute bottom-0 start-0 p-3 d-flex w-100">
            <span className="bg-dark bg-opacity-50 px-2 rounded text-white small">10:20</span>
            <span className="bg-dark bg-opacity-50 px-2 rounded text-white small ms-auto">1 min ago</span>
          </div>
        </div>}

      {image && !isVideo && <img className="card-img-top" src={image} alt="Post" />}
      {photos && <div className="tiny-slider dots-inside dots-white">
          <TinySlider settings={postSliderSettings} data-arrow="false" data-dots="true" data-autoplay="true" data-items={1} data-gutter={0}>
            {photos.map((photo, idx) => <div className="overflow-hidden" key={idx}>
                <img className="card-img-top" src={photo} alt="Post" />
              </div>)}
          </TinySlider>
        </div>}
      {isPlyer && <VideoPlayer />}
      {iframe && <div className="ratio ratio-16x9 card-img-top overflow-hidden">
          <iframe src={iframe} title="YouTube video" allowFullScreen />
        </div>}

      <CardBody>
        <Link className="text-body" to="/feed/post-details">
          {title}
        </Link>

        <ul className="nav nav-stack flex-wrap small mt-3">
          <li className="nav-item">
            <Link className="nav-link icons-center" to="">
              
              <BsHandThumbsUpFill size={17} className="pe-1" />({likeCount})
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link icons-center" to="">
              
              <BsChatFill size={17} className="pe-1" />({comments})
            </Link>
          </li>

          <Dropdown className="nav-item ms-sm-auto">
            <DropdownToggle as="a" className="nav-link mb-0 content-none icons-center  cursor-pointer" id="cardShareAction" data-bs-toggle="dropdown" aria-expanded="false">
              <BsReplyFill size={18} className="flip-horizontal ps-1" />({share})
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
        </ul>
      </CardBody>
    </Card>;
};
const AllPosts = () => {
  const postCategories = ['for-you', 'covid', 'trending', 'news', 'sports', 'entertainment'];
  const allPosts = postData;
  const [posts, setPosts] = useState(allPosts);
  const filterPosts = category => {
    setTimeout(() => {
      const post = allPosts.filter(post => post.category?.includes(category));
      setPosts(post);
    }, 100);
  };
  return <div className="py-5">
      <Container>
        <TabContainer defaultActiveKey="for-you">
          <Row className="g-4">
            <Col xs={12}>
              <Nav className="nav-tabs nav-tabs-white justify-content-center border-0">
                <NavItem>
                  
                  <NavLink eventKey="for-you" onClick={() => filterPosts('for-you')}>
                    
                    For you
                  </NavLink>
                </NavItem>
                <NavItem>
                  
                  <NavLink eventKey="covid" onClick={() => filterPosts('covid')}>
                    
                    COVID-19
                  </NavLink>
                </NavItem>
                <NavItem>
                  
                  <NavLink eventKey="trending" onClick={() => filterPosts('trending')}>
                    
                    Trending
                  </NavLink>
                </NavItem>
                <NavItem>
                  
                  <NavLink eventKey="news" onClick={() => filterPosts('news')}>
                    
                    News
                  </NavLink>
                </NavItem>
                <NavItem>
                  
                  <NavLink eventKey="sports" onClick={() => filterPosts('sports')}>
                    
                    Sports
                  </NavLink>
                </NavItem>
                <NavItem>
                  
                  <NavLink eventKey="entertainment" onClick={() => filterPosts('entertainment')}>
                    
                    Entertainment
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
          <TabContent className="mb-0 pb-0">
            {postCategories.map((category, idx) => <Fragment key={idx}>
                {posts.length != 0 ? <TabPane eventKey={category} className="fade">
                    <Row className="g-4">
                      {posts.slice(0, 11).map((post, idx) => <Col sm={6} lg={4} key={idx}>
                          <PostCard post={post} />
                        </Col>)}
                      <Col xs={12} className="text-center">
                        <Button variant="primary" className="mb-0" type="button">
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                          Loading
                        </Button>
                      </Col>
                    </Row>
                  </TabPane> : <TabPane eventKey={category} className="fade text-center">
                    <div className="my-sm-5 py-sm-5">
                      <BsCardText className="display-1 text-primary text-opacity-25"> </BsCardText>
                      <h4 className="mt-2 mb-3 text-body">Nothing to see here</h4>
                      <Button variant="primary-soft" size="sm">
                        
                        View recent post
                      </Button>
                    </div>
                  </TabPane>}
              </Fragment>)}
          </TabContent>
        </TabContainer>
      </Container>
    </div>;
};
export default AllPosts;