import { Col, Container, Row } from 'react-bootstrap';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa'; // Correct import for FaStarHalf
import appPlaceholder from '@/assets/images/mockup/app-placeholder2.jpg';
import macPlaceholder from '@/assets/images/mockup/mac-placeholder.jpg';
import element1 from '@/assets/images/elements/01.svg';
import element4 from '@/assets/images/elements/04.svg';
import element7 from '@/assets/images/elements/07.svg';

const MainBanner = () => {
  return (
    <section className="pt-5 pb-0 position-relative">
      <Container>
        <Row className="text-center position-relative z-index-1">
          <Col lg={7} className="mx-auto">
            <h1 className="display-3 text-primary">Shiksha<span style={{ color: 'bl' }}>Sangam</span></h1>
           
            <p className="lead">Explore seamless communication, event hosting, and content sharing for alumni and students.</p>
            <div className="d-sm-flex justify-content-center">
              <button className="btn btn-primary">Join Now</button>
              <div className="mt-2 mt-sm-0 ms-sm-3">
                <div className="hstack justify-content-center justify-content-sm-start gap-1">
                  {Array(Math.floor(4.5)).fill(0).map((_star, idx) => (
                    <div key={idx}>
                      <FaStar size={17} className="text-warning" />
                    </div>
                  ))}
                  {!Number.isInteger(4.5) && (
                    <div>
                      <FaStarHalf size={17} className="text-warning" />
                    </div>
                  )}
                  {4.5 < 5 && Array(5 - Math.ceil(4.5)).fill(0).map((_star, idx) => (
                    <div key={idx}>
                      <FaRegStar size={17} className="text-warning" />
                    </div>
                  ))}
                </div>
                <i>&quot;I can't believe it's this easy to stay connected!&quot;</i>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="g-0 align-items-center mt-2 position-relative z-index-1">
          <Col lg={4}>
            <div className="iphone-x iphone-x-small" style={{ background: `url(${appPlaceholder})`, backgroundSize: '100%' }}>
              <i />
              <b />
            </div>
          </Col>
          <Col lg={8}>
            <div className="mac_container ">
              <div className="mac_scaler">
                <div className="mac_holder">
                  <div className="mac_screen">
                    <div className="mac_camera" />
                    <div className="mac_screen_content" style={{ background: `url(${macPlaceholder})`, backgroundSize: '100%' }}></div>
                  </div>
                  <div className="mac_bottom">
                    <div className="mac_bottom_top_half">
                      <div className="mac_thumb_space" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="position-absolute top-0 end-0 mt-5 pt-5">
        <img className="h-300px blur-9 mt-5 pt-5 w-auto" src={element7} alt="image" />
      </div>
      <div className="position-absolute top-0 start-0 mt-n5 pt-n5">
        <img className="h-300px blur-9 w-auto" src={element1} alt="image" />
      </div>
      <div className="position-absolute top-50 start-50 translate-middle">
        <img className="h-300px blur-9 w-auto" src={element4} alt="image" />
      </div>
    </section>
  );
};

export default MainBanner;
