import { getAllFeed } from '@/api/feed';
import PostCard from '@/components/cards/PostCard';
import LoadMoreButton from './LoadMoreButton';
import { useState, useEffect } from 'react';

const Feeds = () => {
  const [allPosts, setAllPosts] = useState([]); // State for storing posts
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        setIsLoading(true);
        const data = await getAllFeed(); // Await the result of the async function
        console.log(data);
        
        setAllPosts(data);
      } catch (err) {
        console.error('Error fetching feeds:', err);
        setError(err); // Store the error if something goes wrong
      } finally {
        setIsLoading(false); // Ensure loading state is reset
      }
    };

    fetchFeeds();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (isLoading) {
    return <p>Loading feeds...</p>;
  }

  if (error) {
    return <p>Error loading feeds: {error.message}</p>;
  }

  return (
    <>
      {allPosts.length > 0 ? (
        allPosts.map((post, idx) => <PostCard {...post} key={idx} />)
      ) : (
        <p>No feeds available.</p>
      )}
      <LoadMoreButton />
    </>
  );
};

export default Feeds;
