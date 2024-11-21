import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFileEarmarkPlay } from 'react-icons/bs';
import Footer from './components/Footer';
import Music from './components/Music';
import OfficialTrailer from './components/OfficialTrailer';
import TrendingVideos from './components/TrendingVideos';
import avatar1 from '@/assets/images/avatar/01.jpg';
import backgroundImg from '@/assets/images/post/16by9/big/02.jpg';
import PageMetaData from '@/components/PageMetaData';
import VideoLayout from './components/VideoLayout';
const Hero = () => {
  return <div className="rounded py-4 py-sm-5 overflow-hidden position-relative" style={{
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }}>
      <div className="bg-overlay bg-dark opacity-5" />
      <div className="p-4 p-sm-5 position-relative">
        <div className="d-flex align-items-center mb-3">
          <div className="avatar avatar-xxs me-2">
            <img className="avatar-img rounded-circle" src={avatar1} alt="image" />
          </div>

          <h6 className="mb-0">
            
            <Link className="text-white" to="">
              
              Frances Guerrero
            </Link>
          </h6>
          <span className="ms-1 ms-sm-3 small text-white"> 156.9K views</span>
        </div>
        <h1 className="text-white">How does the stock market work?</h1>
        <p className="text-white">Suspicion neglected he resolving agreement perceived at an. </p>
        <Link className="btn btn-primary stretched-link icons-center" to="/feed/videos/details">
          
          <BsFileEarmarkPlay size={19} className="pe-1" />
          Watch now
        </Link>
      </div>
    </div>;
};
const HomeVideos = () => {
  return <>
      <PageMetaData title='Videos' />
      <VideoLayout>
        <Row className="mb-4">
          <Col xs={12}>
            <Hero />
          </Col>
        </Row>
        <Row className="g-3 mb-4">
          <TrendingVideos />
        </Row>

        <Row className="g-3 mb-4">
          <OfficialTrailer />
        </Row>

        <Row className="g-3 mb-4">
          <Music />
        </Row>

        <Footer />
      </VideoLayout>
    </>;
};
export default HomeVideos;