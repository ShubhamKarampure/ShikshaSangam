import bg7Img from '@/assets/images/bg/07.jpg';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import { eventCategories } from '../data';
import { Link } from 'react-router-dom';
import { FaCrosshairs } from 'react-icons/fa';
const HeroEvent = () => {
  return <section className="pt-5 pb-0 position-relative" style={{
    backgroundImage: `url(${bg7Img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center'
  }}>
      <div className="bg-overlay bg-dark opacity-8" />

      <Container>
        <div className="pt-5">
          <Row className="position-relative">
            <Col xl={8} lg={10} className="mx-auto pt-sm-5 text-center">
              <h1 className="text-white">Find events near you</h1>
              <p className="text-white">Let&apos;s uncover the best places to eat, drink, and shop nearest to you.</p>
              <div className="mx-auto bg-mode shadow rounded p-4 mt-5">
                <h5 className="mb-3 text-start">We will help you to find all</h5>

                <form className="row g-3 justify-content-center">
                  <Col md={5}>
                    <div className="input-group">
                      <input className="form-control form-control-lg me-1 pe-5" type="text" placeholder="What" />
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="input-group">
                      <FormControl size="lg" className="me-1 pe-5" type="text" placeholder="Where" />
                      <Link className="position-absolute top-50 end-0 translate-middle-y text-secondary px-3 z-index-9" to="">
                        
                        <FaCrosshairs />
                      </Link>
                    </div>
                  </Col>

                  <Col md={2} className="d-grid">
                    <Button variant="primary" size="lg">
                      Search
                    </Button>
                  </Col>
                </form>
              </div>
            </Col>
            <div className="mb-n5 mt-3 mt-lg-5">
              <Col xl={9} lg={11} className="mx-auto">
                <div className="d-md-flex gap-3 mt-5">
                  {eventCategories.map((category, idx) => <Link to="/events" className="card card-body mb-3 mb-lg-0 p-3 text-center" key={idx}>
                      <img className="h-40px mb-3 mx-auto" src={category.image} alt="image" />
                      <h6>{category.name}</h6>
                    </Link>)}
                </div>
              </Col>
            </div>
          </Row>
        </div>
      </Container>
    </section>;
};
export default HeroEvent;