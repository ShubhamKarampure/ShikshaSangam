import { getAllFeed } from "@/api/feed";
import PostCard from "@/components/cards/PostCard";
import LoadMoreButton from "./LoadMoreButton";
import { useState, useEffect } from "react";
import Post3 from "./FeedComponents/Post3";
import Post2 from "./FeedComponents/Post2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useToggle from '@/hooks/useToggle';

const Feeds = () => {
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

        setAllPosts([...allPosts,...data]);
        
      } catch (err) {
        console.error("Error fetching feeds:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
      setToggle(false);
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
  );
};

export default Feeds;
//  <Post2 comments={[{'comment':'Hello','socialUser':{'avatar': allPosts[0]?.socialUser.avatar,'name': 'User'},'createdAt':allPosts[0]?.createdAt}]}/>
//       <Post3 comments={[{'comment':'Hello','socialUser':{'avatar': allPosts[0]?.socialUser.avatar,'name': 'User'},'createdAt':allPosts[0]?.createdAt}]}/>
// comment,
//   likesCount,
//   children,
//   socialUser,
//   createdAt,
//   image
