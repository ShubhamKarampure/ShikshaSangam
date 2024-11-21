import PageMetaData from '@/components/PageMetaData';
import AllPosts from './components/AllPosts';
import Hero from './components/Hero';
const Posts = () => {
  return <>
      <PageMetaData title='Post Home' />
      <main className="pt-5">
        <Hero />

        <AllPosts />
      </main>
    </>;
};
export default Posts;