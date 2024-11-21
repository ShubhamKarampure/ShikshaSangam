import bg06Img from '@/assets/images/bg/06.jpg';
import { Col, Container, FormControl, Row } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
const Hero = () => {
  return <div className="py-5" style={{
    backgroundImage: `url(${bg06Img})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }}>
      <Container>
        <Row className="justify-content-center py-5">
          <Col md={6} className="text-center">
            <h1 className="text-white">Change your social presence.</h1>
            <p className="mb-4 text-white">For who thoroughly her boy estimating conviction.</p>

            <form className="rounded position-relative">
              <FormControl className="form-control-lg ps-5" type="search" placeholder="Search..." aria-label="Search" />
              <button className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y" type="button">
                <BsSearch size={22} className="fs-5 ps-1">
                  
                </BsSearch>
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>;
};
export default Hero;