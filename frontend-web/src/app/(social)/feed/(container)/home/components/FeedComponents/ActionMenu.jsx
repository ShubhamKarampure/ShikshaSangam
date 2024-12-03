import { getAllFeeds } from '@/helpers/data';
import { Button, Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { BsBookmark, BsBookmarkCheck, BsChatFill, BsEnvelope, BsFlag, BsHeart, BsHeartFill, BsInfoCircle, BsLink, BsPencilSquare, BsPersonX, BsReplyFill, BsSendFill, BsShare, BsSlashCircle, BsThreeDots, BsXCircle } from 'react-icons/bs';
import People from '../People';
import avatar4 from '@/assets/images/avatar/04.jpg';
import logo11 from '@/assets/images/logo/11.svg';
import logo12 from '@/assets/images/logo/12.svg';
import logo13 from '@/assets/images/logo/13.svg';
import postImg2 from '@/assets/images/post/3by2/02.jpg';
import postImg4 from '@/assets/images/post/3by2/03.jpg';
import PostCard from '@/components/cards/PostCard';
import { Link } from 'react-router-dom';
import LoadMoreButton from '../LoadMoreButton';
import SuggestedStories from '../SuggestedStories';
import { useFetchData } from '@/hooks/useFetchData';

const ActionMenu = ({
    name
  }) => {
    return <Dropdown drop="start">
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
  

export default ActionMenu