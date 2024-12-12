import ActionBox from './components/ActionBox';
import Discovered from './components/Discovered';
import Features from './components/Features';
import Footer from './components/Footer';
import HallOfFame from './components/HallOfFame';
import MainBanner from './components/MainBanner';
import MessagingFeature from './components/MessagingFeature';
import QRCode from './components/QRCode';
import TopBar from './components/TopBar';
import Video from './components/Video';
import PageMetaData from '@/components/PageMetaData';
const LandingPage = () => {
  return <>
    <PageMetaData title='Landing Page' />
      <TopBar />
      <main>
        <MainBanner />
        <HallOfFame/>
        <MessagingFeature />
        <Discovered />
        <Video />
        <ActionBox />
      </main>
      <Footer />
     
    </>;
};
export default LandingPage;