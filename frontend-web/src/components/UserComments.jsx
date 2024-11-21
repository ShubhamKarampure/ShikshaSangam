import CommentItem from './cards/components/CommentItem';
import { BsBookmarkCheck, BsChatFill, BsEnvelope, BsHandThumbsUpFill, BsLink, BsPencilSquare, BsReplyFill, BsShare } from 'react-icons/bs';
import { CardFooter, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import LoadContentButton from './LoadContentButton';
import { Link } from 'react-router-dom';
const UserComments = ({
  comment,
  showStats
}) => {
  const {
    comments,
    commentsCount,
    likesCount
  } = comment;
  return <>
      {showStats && <ul className="nav nav-stack mb-3 small">
          <li className="nav-item">
            <Link className="nav-link" to="" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" data-bs-custom-class="tooltip-text-start" data-bs-title="Frances Guerrero<br> Lori Stevens<br> Billy Vasquez<br> Judy Nguyen<br> Larry Lawson<br> Amanda Reed<br> Louis Crawford">
              
              <BsHandThumbsUpFill size={18} className="pe-1" />({likesCount})
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              
              <BsChatFill size={18} className="pe-1" />({commentsCount})
            </Link>
          </li>

          <Dropdown className="nav-item ms-sm-auto" drop="start">
            <DropdownToggle as="a" className="nav-link mb-0 content-none cursor-pointer" id="cardShareAction" data-bs-toggle="dropdown" aria-expanded="false">
              <BsReplyFill size={16} className="flip-horizontal ps-1" />
              (3)
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
        </ul>}
      {comments && <ul className="comment-wrap list-unstyled">
          {comments.map(comment => <CommentItem {...comment} key={comment.id} />)}
        </ul>}
      <CardFooter className="border-0 pb-0">{comments && <LoadContentButton name="Load more comments" />}</CardFooter>
    </>;
};
export default UserComments;