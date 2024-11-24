import PageMetaData from '@/components/PageMetaData';
import BookConference from './components/BookConference';
import DiscoverEvents from './components/DiscoverEvents';
import Footer from './components/Footer';
import Groups from './components/Groups';
import HeroEvent from './components/HeroEvent';
import Topbar from './components/Topbar';
import TopDestinations from './components/TopDestinations';
const Event = () => {
  return <>
      <PageMetaData title='Event Home' />
      <Topbar />
      <main>
        <HeroEvent />

        <DiscoverEvents />

        <BookConference />

        <TopDestinations />

        <Groups />
      </main>

      <Footer />
    </>;
};
export default Event;