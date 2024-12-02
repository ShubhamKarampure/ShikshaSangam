import { Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import {BsBookmarkCheck, BsChatFill, BsEnvelope, BsHeart, BsLink, BsPencilSquare, BsReplyFill, BsSendFill, BsShare,  } from 'react-icons/bs';
import logo11 from '@/assets/images/logo/11.svg';
import postImg4 from '@/assets/images/post/3by2/03.jpg';
import { Link } from 'react-router-dom';
import ActionMenu from './ActionMenu.jsx';

const Post3 = () => {
  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar me-2">
              <span role="button">
                <img
                  className="avatar-img rounded-circle"
                  src={logo11}
                  alt="logo"
                />
              </span>
            </div>
            <div>
              <h6 className="card-title mb-0">
                <Link to=""> Webestica </Link>
              </h6>
              <p className="small mb-0">9 December at 10:00 </p>
            </div>
          </div>
          <ActionMenu />
        </div>
      </CardHeader>
      <CardBody>
        <p className="mb-0">
          The next-generation blog, news, and magazine theme for you to start
          sharing your content today with beautiful aesthetics! This minimal
          &amp; clean Bootstrap 5 based theme is ideal for all types of sites
          that aim to provide users with content. <Link to=""> #bootstrap</Link>
          <Link to=""> #webestica </Link> <Link to=""> #getbootstrap</Link>{" "}
          <Link to=""> #bootstrap5 </Link>
        </p>
      </CardBody>

      <span role="button">
        <img src={postImg4} alt="post-image" />
      </span>

      <CardBody className="position-relative bg-light">
        <Link to="" className="small stretched-link">
          https://blogzine.webestica.com
        </Link>
        <h6 className="mb-0 mt-1">
          Blogzine - Blog and Magazine Bootstrap 5 Theme
        </h6>
        <p className="mb-0 small">
          Bootstrap based News, Magazine and Blog Theme
        </p>
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
            <DropdownToggle
              as="a"
              className="nav-link mb-0 content-none cursor-pointer"
              id="cardShareAction6"
              aria-expanded="false"
            >
              <BsReplyFill className="flip-horizontal ps-1" size={18} />
              Share (3)
            </DropdownToggle>

            <DropdownMenu
              className="dropdown-menu-end"
              aria-labelledby="cardShareAction6"
            >
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
              <BsSendFill size={18} className="pe-1" />
              Send
            </Link>
          </li>
        </ul>
      </CardFooter>
    </Card>
  );
};

export default Post3;
