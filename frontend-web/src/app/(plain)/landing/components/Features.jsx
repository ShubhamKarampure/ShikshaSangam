import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import appPlaceholder from '@/assets/images/mockup/app-placeholder3.jpg';
import element5 from '@/assets/images/elements/05.svg';
import { featureData } from '../data';

const FeatureCard = ({ description, image, title }) => {
  return (
    <Card className="card-body bg-mode shadow-none border-0 p-4 p-lg-5">
      <div>
        <img className="h-50px w-auto" src={image} alt="feature image" />
      </div>
      <h4 className="mt-4">{title}</h4>
      <p className="mb-0">{description}</p>
    </Card>
  );
};

const Features = () => {
  return (
    <section className="py-4 py-sm-5">
      <Container>
        <Row className="g-4 g-lg-5 align-items-center">
          <Col lg={4}>
            <h2 className="h1">Take a look at our big set of features</h2>
            <p className="mb-4">Express besides it present if at an opinion visitor.</p>
            <Button variant="dark">Download now</Button>
          </Col>
          <Col lg={8}>
            <Card className="card-body bg-mode shadow-none border-0 p-4 p-sm-5 pb-sm-0 overflow-hidden">
              <Row className="g-4">
                <Col md={6}>
                  <img className="h-50px w-auto" src={element5} alt="element image" />
                  <h4 className="mt-4">Built-in digital wallet</h4>
                  <p className="mb-0">
                    Yet uncommonly his ten who diminution astonished. Demesne new manners savings staying had. Under folly balls.
                  </p>
                </Col>
                <Col md={6} className="text-end">
                  <div className="iphone-x iphone-x-small iphone-x-half mb-n5 mt-0" style={{ background: `url(${appPlaceholder})`, backgroundSize: '100%' }}>
                    <i />
                    <b />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          {featureData.map((feature, idx) => (
            <Col md={4} key={idx}>
              <FeatureCard {...feature} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
