import { Button, Col, Container, Row } from 'react-bootstrap';
import backgroundImg7 from '@/assets/images/bg/07.jpg';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import DateFormInput from '@/components/form/DateFormInput';
const Hero = () => {
  return <section className="pt-5 pb-0 position-relative" style={{
    backgroundImage: `url(${backgroundImg7})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center'
  }}>
      <div className="bg-overlay bg-dark opacity-8" />
      <Container>
        <div className="py-5">
          <Row className="position-relative">
            <Col lg={9} className="mx-auto">
              <div className="text-center">
                <h1 className="text-white">Find events near you</h1>
                <p className="text-white">Let&apos;s uncover the best places to eat, drink, and shop nearest to you.</p>
              </div>
              <div className="mx-auto bg-mode shadow rounded p-4 mt-5">
                <form className="row align-items-end g-4">
                  <Col sm={6} lg={3}>
                    <label className="form-label">Select genre</label>
                    <ChoicesFormInput className="form-select js-choice choice-select-text-none" data-position="bottom" data-search-enabled="false">
                      <option value="category">Category</option>
                      <option value="comedy">Comedy</option>
                      <option value="dance">Dance</option>
                      <option value="family">Family</option>
                      <option value="music">Music</option>
                      <option value="workshop">Workshop</option>
                    </ChoicesFormInput>
                  </Col>
                  <Col sm={6} lg={3}>
                    <label className="form-label">Date form</label>
                    <DateFormInput className="form-control" placeholder="12/10/2022" options={{
                    enableTime: false
                  }} />
                  </Col>
                  <Col sm={6} lg={3}>
                    <label className="form-label">Date to</label>
                    <DateFormInput className="form-control" placeholder="14/10/2022" options={{
                    enableTime: false
                  }} />
                  </Col>
                  <Col sm={6} lg={3}>
                    <Button variant="primary" className="w-100">
                      Filters Dates
                    </Button>
                  </Col>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>;
};
export default Hero;