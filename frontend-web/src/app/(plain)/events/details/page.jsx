import PageMetaData from '@/components/PageMetaData';
import Footer from './components/Footer';
import Hero from './components/Hero';
import OverView from './components/OverView';
import Topbar from './components/Topbar';
const EventDetails = () => {
  return <>
    <PageMetaData title='Event Details 2' />
      <Topbar />
      <main>
        <Hero />
        <OverView />
      </main>
      <Footer />
    </>;
};
export default EventDetails;