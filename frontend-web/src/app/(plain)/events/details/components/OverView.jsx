import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { getAllEventSchedules } from '@/helpers/data';
import clsx from 'clsx';
import { counterData, faqsData } from '../data';
import event6 from '@/assets/images/events/06.jpg';
import avatar1 from '@/assets/images/avatar/01.jpg';
import avatar2 from '@/assets/images/avatar/02.jpg';
import avatar3 from '@/assets/images/avatar/03.jpg';
import { useFetchData } from '@/hooks/useFetchData';
import { currency } from '@/context/constants';
const OverView = () => {
  const allEventSchedules = useFetchData(getAllEventSchedules);
  return <section className="py-5">
      <Container>
        <Row className="g-4">
          <Col lg={4}>
            <Card className="card-body">
              <Button variant="primary" className="w-100">
                
                Buy ticket
              </Button>
              <div className="mt-4">
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between mb-3">
                    
                    <strong className="w-150px">Show Date &amp; time:</strong> <span className="text-end"> 12 December, 8:20PM </span>
                  </li>
                  <li className="d-flex justify-content-between mb-3">
                    
                    <strong className="w-150px">Ticket Price:</strong> <span className="text-end"> {currency}210.00 </span>
                  </li>
                  <li className="d-flex justify-content-between mb-3">
                    
                    <strong className="w-150px">Entry fees:</strong> <span className="text-end"> {currency}1 per ticket </span>
                  </li>
                  <li className="d-flex justify-content-between mb-3">
                    
                    <strong className="w-150px">Address:</strong> <span className="text-end"> 750 Sing Sing Rd, Horseheads, NY, 14845 </span>
                  </li>
                </ul>
                <iframe className="w-100 d-block rounded-bottom grayscale" height={230} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sin!4v1586000412513!5m2!1sen!2sin" style={{
                border: 0
              }} aria-hidden="false" tabIndex={0} />
              </div>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="card-body">
              <h4>Overview </h4>
              <p>
                Appear third them gathered created divided all years spirit saying for great saying made had fly dry that darkness meat unto Thing
                spirit his fifth likeness divided also seed lesser image dominion sea fifth i god so saw open great Living.
              </p>
              <img className="img-fluid mb-3" src={event6} alt="" />
              <h6>Female saying may multiply upon life</h6>
              <p>
                To don&apos;t may give void forth created fruitful bearing creepeth fish god night you&apos;re brought creeping so you&apos;ll herb
                place blessed creepeth beast Green face fruitful stars man multiply Creepeth upon over darkness There dominion day from man
                doesn&apos;t won&apos;t us two fish a female saying may multiply upon life.
              </p>
              <div className="mt-4 mt-sm-5">
                <h4>Host </h4>
                <Row className="g-4">
                  <Col md={4}>
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-lg me-3">
                        <img className="avatar-img rounded-circle" src={avatar1} alt="avatar" />
                      </div>
                      <div>
                        <h6 className="mb-0">Bryan Knight</h6>
                        <span>Founder</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-lg me-3">
                        <img className="avatar-img rounded-circle" src={avatar2} alt="avatar" />
                      </div>
                      <div>
                        <h6 className="mb-0">Carolyn Ortiz</h6>
                        <span>CEO</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-lg me-3">
                        <img className="avatar-img rounded-circle" src={avatar3} alt="avatar" />
                      </div>
                      <div>
                        <h6 className="mb-0">Dennis Barrett</h6>
                        <span>Manager</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="mt-4 mt-sm-5">
                <h4>Schedule </h4>
                <Accordion defaultActiveKey="0" className="accordion-icon" id="accordionschedules">
                  {allEventSchedules?.map((event, idx) => <AccordionItem eventKey={`${idx}`} className={clsx({
                  'mb-3': allEventSchedules.length - 1 != idx
                })} key={idx}>
                      <AccordionHeader as="h6" id="scheduleOne">
                        <div className="pe-5 flex-wrap mb-0" aria-expanded="true" aria-controls="schedulecollapseOne">
                          <span className="me-2">{event.date.toLocaleString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                          <span className="me-2">{event.date.toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric'
                        })} </span>
                          <strong>{event.title}</strong>
                        </div>
                      </AccordionHeader>
                      <AccordionBody>
                        <p>{event.description}</p>
                        <Row className="g-4">
                          <Col xs={12}>
                            <h5 className="mb-0">Speaker</h5>
                          </Col>
                          {event?.speakers && event.speakers.map((speaker, idx) => <Col sm={4} lg={3} key={idx}>
                                <Card className="card-body text-center">
                                  <div className="avatar avatar-lg mx-auto mb-3">
                                    {speaker?.avatar && <img className="avatar-img rounded-circle" src={speaker.avatar} alt="image" />}
                                  </div>
                                  <div>
                                    <h6 className="mb-0">{speaker?.name}</h6>
                                    <span>Founder</span>
                                  </div>
                                </Card>
                              </Col>)}
                        </Row>
                      </AccordionBody>
                    </AccordionItem>)}
                </Accordion>
              </div>

              <Card className="card-body p-4 mt-5">
                <Row className="g-2">
                  {counterData.map(({
                  count,
                  icon: Icon,
                  title
                }, idx) => <Col sm={4} key={idx}>
                      <div className="d-flex">
                        <Icon size={22} />
                        <div className="ms-3">
                          <h5 className="mb-0">{count}</h5>
                          <p className="mb-0">{title}</p>
                        </div>
                      </div>
                    </Col>)}
                </Row>
              </Card>
              <div className="mt-4 mt-sm-5">
                <h4>FAQ </h4>
                <Accordion defaultActiveKey="0" className="accordion-icon" id="accordionfaq">
                  {faqsData.map((faq, idx) => <AccordionItem eventKey={`${idx}`} className="mb-3" key={idx}>
                      <AccordionHeader as="h6" id="faqOne">
                        <div className="pe-5 flex-wrap fw-bold" data-bs-target="#faqcollapseOne" aria-expanded="true" aria-controls="faqcollapseOne">
                          {faq.question}
                        </div>
                      </AccordionHeader>
                      <AccordionBody>
                        <p className="mb-0">{faq.answer}</p>
                      </AccordionBody>
                    </AccordionItem>)}
                </Accordion>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>;
};
export default OverView;