import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { popularArticles, recommendedTopics } from './data';
import { FaAngleRight, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadMoreButton from './components/LoadMoreButton';
import HelpLayout from './components/HelpLayout';
import PageMetaData from '@/components/PageMetaData';
const PopularQuestions = () => {
  const popularQuestions = ['How can we help?', 'How to edit my Profile?', 'How much should I offer the sellers?', 'Installation Guide?', 'Additional Options and Services?', "What's are the difference between a social?", 'View all question'];
  return <Card className="card-body p-4">
      <div className="text-center mb-4">
        <h4>Popular questions</h4>
      </div>
      <div className="list-group list-group-horizontal gap-2 flex-wrap justify-content-center mb-0 border-0">
        {popularQuestions.map((question, idx) => <Link className="btn btn-light btn-sm fw-light" to="/help/details" key={idx}>
            {question}
          </Link>)}
        <Button variant="primary-soft" size="sm" className="fw-light">
          View all question
        </Button>
      </div>
    </Card>;
};
const TopicCard = ({
  topic
}) => {
  const {
    features,
    icon: Icon,
    title,
    variant
  } = topic;
  return <Card className="h-100">
      <CardHeader className="pb-0 border-0">
        <Icon className={`fs-1 text-${variant}`} />
        <CardTitle className="mb-0 mt-2">{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <ul className="nav flex-column">
          {features.map((feature, idx) => <li className="nav-item" key={idx}>
              <Link className="nav-link d-flex" to="/help/details">
                <FaAngleRight size={22} className="text-primary pt-1 fa-fw me-2" />
                {feature}
              </Link>
            </li>)}
        </ul>
      </CardBody>
    </Card>;
};
const ArticleCard = ({
  description,
  title,
  id
}) => {
  return <Card className="card-body">
      <div className="d-md-flex justify-content-between align-items-start">
        <div className="mb-2 mb-md-0">
          <h5 className="mb-1">

            <Link to="">{title}</Link>
          </h5>
          <p className="small mb-0">{description}</p>
        </div>
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" className="btn-check" name={`article${id}`} id={`articleup${id}`} defaultChecked />
          <label className="btn btn-outline-light btn-sm mb-0" htmlFor={`articleup${id}`}>
            <FaThumbsUp className="me-1" /> {Math.floor(Math.random() * (700 - 200) + 200)}
          </label>
          <input type="radio" className="btn-check" name={`article${id}`} id={`articledown${id}`} />
          <label className="btn btn-outline-light btn-sm mb-0" htmlFor={`articledown${id}`}>

            0{Math.floor(Math.random() * 10)} <FaThumbsDown className="ms-1" />
          </label>
        </div>
      </div>
    </Card>;
};
const Help = () => {
  return <>
      <PageMetaData title='Help' />
      <HelpLayout>
        <Row className="align-items-center">
          <Col xs={12}>
            <PopularQuestions />
          </Col>
        </Row>
        <div className="py-5">
          <h4 className="text-center mb-4">Recommended topics</h4>
          <Row className="g-4">
            {recommendedTopics.map((topic, idx) => <Col md={4} key={idx}>
                <TopicCard topic={topic} />
              </Col>)}
          </Row>
        </div>
        <div className="pb-5">
          <h4 className="text-center mb-4">Popular articles</h4>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="vstack gap-4">
                {popularArticles.map((article, idx) => <ArticleCard {...article} key={idx} />)}
                <div className="text-center">
                  <LoadMoreButton />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </HelpLayout>
    </>;
};
export default Help;