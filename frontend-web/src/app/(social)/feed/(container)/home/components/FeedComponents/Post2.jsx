import {  Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import {  BsBookmarkCheck, BsChatFill, BsEnvelope, BsHeart, BsHeartFill, BsPencilSquare, BsReplyFill, BsSendFill, BsShare,BsLink } from 'react-icons/bs';
import logo13 from '@/assets/images/logo/13.svg';
import { Link } from 'react-router-dom';
import ActionMenu from './ActionMenu.jsx';
import avatar12 from '@/assets/images/avatar/12.jpg';

const Post2 = ({
    createdAt,
    likesCount,
    caption,
    comments,
    commentsCount,
    image,
    socialUser,
    photos,
    isVideo
  }) => {
    return <Card>
        <CardHeader className="border-0 pb-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="avatar me-2">
                <span role="button">
                  
                  <img className="avatar-img rounded-circle" src={logo13} alt="logo" />
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
        <CardBody className="pb-0">
          <p>
            Find out how you can save time in the classroom this year. Earn recognition while you learn new skills on iPad and Mac. Start recognition
            your first Apple Teacher badge today!
          </p>
  
          <ul className="nav nav-stack pb-2 small">
            <li className="nav-item">
              <Link className="nav-link active text-secondary" to="">
                <span className="me-1 icon-xs bg-danger text-white rounded-circle">
                  <BsHeartFill size={10} />
                </span>
                Louis, Billy and 126 others
              </Link>
            </li>
            <li className="nav-item ms-sm-auto">
              <Link className="nav-link" to="">
                
                <BsChatFill size={18} className="pe-1" />
                Comments (12)
              </Link>
            </li>
          </ul>
        </CardBody>
  
        <CardFooter className="py-3">
          <ul className="nav nav-fill nav-stack small">
            <li className="nav-item">
              <Link className="nav-link mb-0 active" to="">
                
                <BsHeart className="pe-1" size={18} />
                Liked (56)
              </Link>
            </li>
  
            <Dropdown className="nav-item">
              <DropdownToggle as="a" className="nav-link mb-0 content-none cursor-pointer" id="cardShareAction6" aria-expanded="false">
                <BsReplyFill className="flip-horizontal ps-1" size={18} />
                Share (3)
              </DropdownToggle>
  
              <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardShareAction6">
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
                
                <BsSendFill className="pe-1" size={18} />
                Send
              </Link>
            </li>
          </ul>
          {comments && <>
            <div className="d-flex mb-3">
              <div className="avatar avatar-xs me-2">
                <span role="button">
                  
                  <img className="avatar-img rounded-circle" src={avatar12} alt="avatar12" />
                </span>
              </div>

              <form className="nav nav-item w-100 position-relative">
                <textarea data-autoresize className="form-control pe-5 bg-light" rows={1} placeholder="Add a comment..." defaultValue={''} />
                <button className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0" type="button">
                  <BsSendFill />
                </button>
              </form>
            </div>

            <ul className="comment-wrap list-unstyled">
              {comments.map(comment => <CommentItem {...comment} key={comment.id} />)}
            </ul>
          </>}
        </CardFooter>
      </Card>;
  };

export default Post2