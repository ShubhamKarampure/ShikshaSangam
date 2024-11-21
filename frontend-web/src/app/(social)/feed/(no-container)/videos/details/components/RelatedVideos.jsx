import { getAllTrendingVideos } from '@/helpers/data';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { BsPlayFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { useFetchData } from '@/hooks/useFetchData';
const VideoCard = ({
  video
}) => {
  const {
    title,
    views,
    iframe,
    time,
    image
  } = video;
  return <Card className="p-0 position-relative h-100">
      <div className="card-image">
        {image && <>
            <img className="card-img-top" src={image} alt="video" />
            <div className="position-absolute top-50 start-50 translate-middle">
              <span className="icon-md bg-danger text-white rounded-circle" role="button">
                
                <BsPlayFill className="fs-5" />
              </span>
            </div>
            <div className="position-absolute bottom-0 start-0 p-3 d-flex w-100">
              <span className="bg-dark bg-opacity-50 px-2 rounded text-white small">{time}</span>
              <span className="bg-dark bg-opacity-50 px-2 rounded text-white small ms-auto">
                <FaHeart />
              </span>
            </div>
          </>}
        {iframe && <div className="ratio ratio-16x9 oveflow-hidden">
            <iframe src="https://player.vimeo.com/video/151500895?h=68ba58e49a" title="Vimeo video" allowFullScreen />
          </div>}
      </div>
      <CardBody>
        <h6>
          
          <Link className="stretched-link" to="/feed/videos/details">
            
            {title}
          </Link>
        </h6>
        <span className="small"> {views} views</span>
      </CardBody>
    </Card>;
};
const RelatedVideos = () => {
  const allVideos = useFetchData(getAllTrendingVideos);
  return <Row className="g-3 mb-4">
      <Col xs={12} className="mt-4">
        <h5>More related video </h5>
      </Col>
      {allVideos?.slice(0, 6).map((video, idx) => <Col sm={6} md={4} xl={3} xxl={2} key={idx}>
          <VideoCard video={video} />
        </Col>)}
    </Row>;
};
export default RelatedVideos;