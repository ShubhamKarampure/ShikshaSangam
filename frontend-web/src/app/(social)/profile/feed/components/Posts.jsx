import { Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { BsBookmark, BsBookmarkCheck, BsChatFill, BsEnvelope, BsFlag, BsHeart, BsHeartFill, BsLink, BsPencilSquare, BsPersonX, BsReplyFill, BsSendFill, BsShare, BsSlashCircle, BsThreeDots, BsXCircle } from 'react-icons/bs';
import logo13 from '@/assets/images/logo/13.svg';
import PostCard from '@/components/cards/PostCard';
import { getAllFeeds } from '@/helpers/data';
import { Link } from 'react-router-dom';
import { useFetchData } from '@/hooks/useFetchData';
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
const Posts = () => {
  const allPosts = useFetchData(getAllFeeds);
  return <>
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
                  
                  <img className="avatar-img rounded-circle" src={logo13} alt="image" />
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
              <Link className="nav-link active text-secondary " to="">
                
                <span className="icon-xs bg-danger text-white rounded-circle me-1">
                  <BsHeartFill size={8} />
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
              <DropdownToggle as="a" className="nav-link mb-0 content-none cursor-pointer" id="cardShareAction" data-bs-toggle="dropdown" aria-expanded="false">
                <BsReplyFill size={17} className="flip-horizontal ps-1" />
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
                
                <BsSendFill size={17} className="pe-1" />
                Send
              </Link>
            </li>
          </ul>
        </CardFooter>
      </Card>
    </>;
};
export default Posts;