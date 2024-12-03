import { getAllFeed } from "@/api/feed";
import PostCard from "@/components/cards/PostCard";
import LoadMoreButton from "./LoadMoreButton";
import { useState, useEffect } from "react";
import Post3 from "./FeedComponents/Post3";
import Post2 from "./FeedComponents/Post2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Feeds = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        setIsLoading(true);
        const data = await getAllFeed();
        console.log(data);

        setAllPosts(data);
      } catch (err) {
        console.error("Error fetching feeds:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  if (error) {
    return <p>Error loading feeds: {error.message}</p>;
  }

  return (
    <>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="skeleton-container">
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
      <LoadMoreButton />
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