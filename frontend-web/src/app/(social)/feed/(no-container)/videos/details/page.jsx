import Footer from './components/Footer';
import Player from './components/Player';
import RelatedVideos from './components/RelatedVideos';
import VideoLayout from '../components/VideoLayout';
import PageMetaData from '@/components/PageMetaData';
const VideoDetails = () => {
  return <>
      <PageMetaData title='Video Details' />
      <VideoLayout>
        <Player />
        <RelatedVideos />
        <Footer />
      </VideoLayout>
    </>;
};
export default VideoDetails;