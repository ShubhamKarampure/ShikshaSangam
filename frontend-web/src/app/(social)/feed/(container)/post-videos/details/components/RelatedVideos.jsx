import TinySlider from '@/components/TinySlider';
import { getAllPostVideos } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import { timeSince } from '@/utils/date';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import { renderToString } from 'react-dom/server';
import { BsPatchCheckFill, BsPlayFill } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const VideoCard = ({
  video
}) => {
  const {
    title,
    views,
    image,
    user,
    isVerified,
    time,
    uploadTime
  } = video;
  return <Card className="p-0 shadow-none border-0 position-relative">
      <div className="position-relative">
        {image && <img className="rounded" src={image} alt="image" />}
        <div className="position-absolute top-0 end-0 p-3">
          <span role="button" className="icon-md bg-danger text-white rounded-circle">
            
            <BsPlayFill className="fs-5" />
          </span>
        </div>
        <div className="position-absolute bottom-0 start-0 p-3 d-flex w-100">
          <span className="bg-dark bg-opacity-50 px-2 rounded text-white small">{time}</span>
          {uploadTime && <span className="bg-dark bg-opacity-50 px-2 rounded text-white small ms-auto">{timeSince(uploadTime)}</span>}
        </div>
      </div>
      <CardBody className="pb-0 px-0">
        <div className="d-flex align-items-center mb-3">
          <div className="avatar avatar-xxs me-2">
            {user?.avatar && <img className="avatar-img rounded-circle" src={user.avatar} alt="avatar1" />}
          </div>
          <h6 className="mb-0">
            
            <Link to="">
              
              {user?.name} {isVerified && <BsPatchCheckFill className="text-success small" />}
            </Link>
          </h6>
          <span className="ms-auto small"> {views}</span>
        </div>
        <h6 className="mb-0">
          
          <Link className="stretched-link" to="/feed/post-videos">
            
            {title}
          </Link>
        </h6>
      </CardBody>
    </Card>;
};
const RelatedVideos = () => {
  const allVideos = useFetchData(getAllPostVideos);
  const videosSliderSettings = {
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
    items: 3,
    nav: false,
    responsive: {
      1: {
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 3
      }
    }
  };
  return <Card>
      <CardHeader className="border-0 pb-0">
        <CardTitle>Related Videos</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="tiny-slider arrow-hover">
          {allVideos && <TinySlider settings={videosSliderSettings} className="tiny-slider-inner">
            {allVideos.map((video, idx) => <div key={idx}>
                <VideoCard video={video} />
              </div>)}
          </TinySlider>}
        </div>
      </CardBody>
    </Card>;
};
export default RelatedVideos;