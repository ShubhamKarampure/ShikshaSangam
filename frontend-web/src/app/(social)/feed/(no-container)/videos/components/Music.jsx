import TinySlider from '@/components/TinySlider';
import { Card, CardBody, Col } from 'react-bootstrap';
import { renderToString } from 'react-dom/server';
import { BsPlayFill } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';
import { musicData } from '../data';
import { Link } from 'react-router-dom';
const MusicCard = ({
  music
}) => {
  const {
    title,
    views,
    time,
    image,
    iframe
  } = music;
  return <Card className="position-relative h-100">
      <div className="card-image">
        {image && <>
            <img className="card-img-top" src={image} alt="image" />

            <div className="position-absolute top-50 start-50 translate-middle">
              <span className="icon-md bg-danger text-white rounded-circle" role="button">
                
                <BsPlayFill size={20} />
              </span>
            </div>

            <div className="position-absolute bottom-0 start-0 p-3 d-flex w-100">
              <span className="bg-dark bg-opacity-50 px-2 rounded text-white small">{time}</span>
              <span className="bg-dark bg-opacity-50 px-2 rounded text-white small ms-auto">
                <FaHeart />
              </span>
            </div>
          </>}
        {iframe && <div className="ratio ratio-16x9 card-img-top overflow-hidden">
            <iframe src={iframe} title="Vimeo video" allowFullScreen />
          </div>}
      </div>

      <CardBody>
        <h6>
          
          <Link className="stretched-link" to="/feed/videos/details">
            
            {title}
          </Link>
        </h6>
        <span className="small">{views} views</span>
      </CardBody>
    </Card>;
};
const Music = () => {
  const musicSliderSettings = {
    arrowKeys: true,
    gutter: 12,
    autoplayButton: false,
    autoplayButtonOutput: false,
    nested: 'inner',
    mouseDrag: true,
    controlsText: [renderToString(<FaChevronLeft size={16} />), renderToString(<FaChevronRight size={16} />)],
    autoplay: false,
    controls: true,
    edgePadding: 0,
    items: 5,
    nav: false,
    responsive: {
      1: {
        items: 1
      },
      576: {
        items: 3
      },
      768: {
        items: 4
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  };
  return <>
      <Col xs={12} className="mt-4">
        <h5>Music </h5>
      </Col>

      <div className="tiny-slider arrow-hover overflow-hidden">
        <TinySlider className="d-flex" settings={musicSliderSettings}>
          {musicData.map((music, idx) => <div key={idx}>
              <MusicCard music={music} />
            </div>)}
        </TinySlider>
      </div>
    </>;
};
export default Music;