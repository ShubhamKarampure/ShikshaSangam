import { Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { BsBookmark, BsBookmarkCheck, BsChatFill, BsEnvelope, BsFlag, BsHeart, BsHeartFill, BsLink, BsPencilSquare, BsPersonX, BsReplyFill, BsSendFill, BsShare, BsSlashCircle, BsThreeDots, BsXCircle } from 'react-icons/bs';
import Post3 from '@/app/(social)/feed/(container)/home/components/FeedComponents/Post3';
import { getAllFeed } from "@/api/feed";
import PostCard from "@/components/cards/PostCard";
import LoadMoreButton from "@/app/(social)/feed/(container)/home/components/LoadMoreButton.jsx";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 2;
  const [offset, setOffset] = useState(0);
  const [toggle,setToggle] = useState(false);
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const data = await getAllFeed(limit,offset);
        console.log(data);

        setAllPosts([...allPosts,...data]);
      } catch (err) {
        console.error("Error fetching feeds:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
      setToggle(false)
    };

    fetchFeeds();
  }, [offset]);

  if (error) {
    return <p>Error loading feeds: {error.message}</p>;
  }
  return (
    <>
    {isLoading ? (
      Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="skeleton-container"
          style={{ height: "150px", width: "100%" }} // Match the card height
        >
          <Skeleton height={50} width={50} circle={true} /> {/* Avatar */}
          <Skeleton height={20} width={`80%`} /> {/* Title */}
          <Skeleton height={15} width={`60%`} /> {/* Description */}
        </div>
      ))
    ) : allPosts.length > 0 ? (
      allPosts.map((post, idx) => <Post3 {...post} key={idx} />)
    ) : (
      <p>No posts available.</p>
    )}

<LoadMoreButton setOffset={setOffset} limit={limit} offset={offset} toggle={toggle} setToggle={setToggle}/>
  </>
  )
};
export default Posts;