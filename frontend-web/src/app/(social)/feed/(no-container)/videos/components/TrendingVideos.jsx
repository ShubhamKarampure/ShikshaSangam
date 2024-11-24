import { getAllTrendingVideos } from '@/helpers/data';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col } from 'react-bootstrap';
import { BsPatchCheckFill, BsPlayFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { useFetchData } from '@/hooks/useFetchData';
const VideoCard = ({
  video
}) => {
  const {
    title,
    views,
    iframe,
    image,
    isVerified,
    time,
    user
  } = video;
  return <Card className="position-relative h-100">
      <div className="card-image">
        {image ? <>
            <img className="card-img-top" src={image} alt="image" />
            <div className="card-element-hover position-absolute top-50 start-50 translate-middle">
              <Link className="icon-md bg-mode text-secondary rounded-circle" to="/feed/videos/details">
                
                <BsPlayFill className="fs-5" />
              </Link>
            </div>
            <div className="position-absolute bottom-0 start-0 p-3 d-flex w-100">
              <span className="bg-dark bg-opacity-50 px-2 rounded text-white small">{time}</span>
              <span className="bg-dark bg-opacity-50 px-2 rounded text-white small ms-auto">
                <FaHeart />
              </span>
            </div>
          </> : <div className="ratio ratio-16x9 card-img-top overflow-hidden">
            <iframe src={iframe} title="YouTube video" allowFullScreen />
          </div>}
      </div>

      <CardBody>
        <h6>
          
          <Link className="stretched-link" to="/feed/videos/details">
            
            {title}
          </Link>
        </h6>
        <div className="d-flex mt-3">
          <div className="avatar avatar-xxs me-2">
            {user?.avatar && <img className="avatar-img rounded-circle" src={user.avatar} alt="image" />}
          </div>

          <div>
            <h6 className="mb-0 lh-1">
              
              <Link to="">
                
                {user?.name}
                {isVerified && <BsPatchCheckFill className="text-success small ms-1" />}
              </Link>
            </h6>
            <span className="ms-auto small"> {views} views</span>
          </div>
        </div>
      </CardBody>
    </Card>;
};
const TrendingVideos = () => {
  const allTrendingVideos = useFetchData(getAllTrendingVideos);
  return <>
      <Col xs={12} className="mt-4">
        <div className="d-sm-flex justify-content-between align-items-center">
          <h5 className="mb-md-0">Trending </h5>
          <Button variant="primary" size="sm">
            View more video
          </Button>
        </div>
      </Col>
      {allTrendingVideos?.slice(0, 6).map((video, idx) => <Col sm={6} md={4} xl={3} xxl={2} key={idx}>
          <VideoCard video={video} />
        </Col>)}
    </>;
};
export default TrendingVideos;