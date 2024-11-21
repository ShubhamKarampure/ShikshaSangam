import CreatePostCard from '@/components/cards/CreatePostCard';
import Posts from './components/Posts';
import PageMetaData from '@/components/PageMetaData';
const Feed = () => {
  return <>
    <PageMetaData title='Feed' />
      <CreatePostCard />
      <Posts />
    </>;
};
export default Feed;