import { Card, CardBody, CardFooter, CardHeader, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import Plyr from 'plyr-react';
import avatar1 from '@/assets/images/avatar/01.jpg';
import avatar12 from '@/assets/images/avatar/12.jpg';
import 'plyr-react/plyr.css';
import { BsBookmarkCheck, BsEnvelope, BsLink, BsPencilSquare, BsReplyFill, BsShare } from 'react-icons/bs';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { commentData } from '../data';
import { Link } from 'react-router-dom';
import { timeSince } from '@/utils/date';
import LoadContentButton from '@/components/LoadContentButton';
const Player = () => {
  return <Row className="g-0 mb-4">
      <Col xl={8} xxl={9}>
        <Card className="card-body p-0 rounded-end-lg-0 position-relative h-100">
          <div className="card-image">
            <div className="overflow-hidden fullscreen-video w-100">
              <div className="player-wrapper card-img-top overflow-hidden">
                <Plyr crossOrigin="anonymous" controls source={{
                type: 'video',
                poster: '/videos/poster.jpg',
                sources: [{
                  src: '/videos/video-feed.mp4'
                }]
              }} />
              </div>
            </div>
          </div>
          <CardBody>
            <div className="d-xxl-flex justify-content-between mb-3">
              <div className="mb-2 mb-xxl-0">
                <h4> New movie trailers (2021 - 2022) September </h4>
                <div className="d-flex mt-3 align-items-center">
                  <div className="avatar me-2">
                    <img className="avatar-img rounded-circle" src={avatar1} alt="avatar" />
                  </div>
                  <div>
                    <h6 className="mb-0">
                      
                      <Link to=""> Frances Guerrero </Link>
                    </h6>
                    <nav className="nav nav-divider small">
                      <span className="nav-item">145.2K views</span>
                      <span className="nav-item">12 dec, 2022</span>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <Dropdown>
                  <DropdownToggle as="a" className="nav nav-link mb-0 content-none cursor-pointer icons-center" id="cardShareAction" data-bs-toggle="dropdown" aria-expanded="false">
                    <BsReplyFill size={20} className="flip-horizontal ps-1" />
                    Share (3)
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardShareAction">
                    <li>
                      <DropdownItem>
                        
                        <BsEnvelope size={20} className="fa-fw pe-2" />
                        Send via Direct Message
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        
                        <BsBookmarkCheck size={20} className="fa-fw pe-2" />
                        Bookmark
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        
                        <BsLink size={20} className="fa-fw pe-2" />
                        Copy link to post
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        
                        <BsShare size={20} className="fa-fw pe-2" />
                        Share post via …
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownDivider />
                    </li>
                    <li>
                      <DropdownItem>
                        
                        <BsPencilSquare size={20} className="fa-fw pe-2" />
                        Share to News Feed
                      </DropdownItem>
                    </li>
                  </DropdownMenu>
                </Dropdown>
                <div className="btn-group ms-2" role="group" aria-label="Basic radio toggle button group">
                  <input type="radio" className="btn-check" name="article1" id="articleup1" />
                  <label className="btn btn-outline-light btn-sm mb-0" htmlFor="articleup1">
                    <FaThumbsUp className="me-1" /> 457
                  </label>
                  <input type="radio" className="btn-check" name="article1" id="articledown1" defaultChecked />
                  <label className="btn btn-outline-light btn-sm mb-0" htmlFor="articledown1">
                    
                    01 <FaThumbsDown className="ms-1" />
                  </label>
                </div>
              </div>
            </div>
            <p>
              He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of
              compliment alteration to. Place voice no arises along to. Parlors waiting so against me no. Wishing calling is warrant settled was
              lucky. Express besides it present if at an opinion visitor.
            </p>
          </CardBody>
        </Card>
      </Col>
      <Col xl={4} xxl={3}>
        <Card className="rounded-start-lg-0 border-start-0 h-100">
          <CardHeader className="border-0 pb-0">
            <h5 className="mb-4"> 3,664 Comments</h5>
          </CardHeader>
          <div className="card-body pt-0 h-400px">
            <SimplebarReactClient className="comment-wrap list-unstyled custom-scrollbar h-100">
              {commentData.map((item, idx) => <li className="comment-item" key={idx}>
                  <div className="d-flex">
                    <div className="avatar avatar-xs">
                      <span role="button">
                        
                        <img className="avatar-img rounded-circle" src={item.avatar} alt="avatar" />
                      </span>
                    </div>
                    <div className="ms-2">
                      <div className="bg-light rounded-start-top-0 p-3 rounded">
                        <div className="d-flex justify-content-between">
                          <h6 className="mb-1">
                            
                            <Link to=""> {item.name} </Link>
                          </h6>
                          <small>{timeSince(item.createdAt)}</small>
                        </div>
                        <p className="small mb-0">{item.comment}</p>
                      </div>
                      <ul className="nav nav-divider py-2 small">
                        <li className="nav-item">
                          <Link className="nav-link" to="">
                            
                            Like{item.likeCount && ` (${item.likeCount})`}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="">
                            
                            Reply
                          </Link>
                        </li>
                        {item.repliesCount && <li className="nav-item">
                            <Link className="nav-link" to="">
                              
                              View {item.repliesCount} replies
                            </Link>
                          </li>}
                      </ul>
                    </div>
                  </div>
                  {item.reply && <ul className="comment-item-nested list-unstyled">
                      {item.reply.map((reply, idx) => <li className="comment-item" key={idx}>
                          <div className="d-flex">
                            <div className="avatar avatar-xs">
                              <span role="button">
                                <img className="avatar-img rounded-circle" src={reply.avatar} alt="image" />
                              </span>
                            </div>
                            <div className="ms-2">
                              <div className="bg-light p-3 rounded">
                                <div className="d-flex justify-content-between">
                                  <h6 className="mb-1">
                                    
                                    <Link to=""> {reply.name} </Link>
                                  </h6>
                                  <small className="ms-2">{timeSince(reply.createdAt)}</small>
                                </div>
                                <p className="small mb-0">{reply.comment}</p>
                              </div>
                              <ul className="nav nav-divider py-2 small">
                                <li className="nav-item">
                                  <Link className="nav-link" to="">
                                    
                                    Like {reply.likeCount && reply.likeCount}
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link className="nav-link" to="">
                                    
                                    Reply
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>)}
                    </ul>}
                  {item.reply && item.reply?.length >= 2 && <LoadContentButton name="Load more replies" className="mb-3 ms-5" />}
                </li>)}
              <li>
                <LoadContentButton name="Load more comments" />
              </li>
            </SimplebarReactClient>
          </div>
          <CardFooter className="border-0 pt-0">
            <div className="d-flex">
              <div className="avatar avatar-xs me-2">
                <span role="button">
                  
                  <img className="avatar-img rounded-circle" src={avatar12} alt="avatar" />
                </span>
              </div>
              <form className="position-relative w-100">
                <textarea className="form-control pe-4 bg-light" data-autoresize rows={1} placeholder="Add a comment..." defaultValue={''} />
                <div className="position-absolute top-0 end-0">
                  <button className="btn" type="button">
                    🙂
                  </button>
                </div>
              </form>
            </div>
          </CardFooter>
        </Card>
      </Col>
    </Row>;
};
export default Player;