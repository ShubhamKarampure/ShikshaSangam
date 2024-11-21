import clsx from 'clsx';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { FaStarHalfStroke } from 'react-icons/fa6';
import { FaRegStar, FaStar, FaThumbsUp } from 'react-icons/fa';
import { counterData, relatableEvents } from './data';
import { getEventById } from '@/helpers/data';
import { BsGeoAlt, BsHandThumbsUpFill } from 'react-icons/bs';
import event6 from '@/assets/images/events/06.jpg';
import avatar1 from '@/assets/images/avatar/01.jpg';
import avatar3 from '@/assets/images/avatar/03.jpg';
import avatar4 from '@/assets/images/avatar/04.jpg';
import avatar5 from '@/assets/images/avatar/05.jpg';
import avatar6 from '@/assets/images/avatar/06.jpg';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
const RelatedEvents = () => {
  return <Card>
      <CardHeader className="border-0">
        <CardTitle>Related events</CardTitle>
      </CardHeader>
      <CardBody className="pt-0">
        {relatableEvents.map((event, idx) => <div className={clsx('d-sm-flex flex-wrap align-items-center', {
        'mb-3': relatableEvents.length - 1 != 0
      })} key={idx}>
            <div className="avatar avatar-md">
              <img className="avatar-img rounded-circle border border-white border-3" src={event.image} alt="" />
            </div>
            <div className="ms-sm-2 my-2 my-sm-0">
              <h6 className="mb-0">{event.title}</h6>
              <p className="small mb-0">
                
                <BsGeoAlt className="pe-1" />
                {event.location}
              </p>
            </div>
            <div className="ms-sm-auto mt-2 mt-sm-0">
              <input type="checkbox" className="btn-check" id={`Interested${idx}`} />
              <label className="btn btn-sm btn-outline-success" htmlFor={`Interested${idx}`}>
                <FaThumbsUp className="me-1" /> Interested
              </label>
            </div>
          </div>)}
      </CardBody>
    </Card>;
};
const EventDetails = () => {
  const [event, setEvent] = useState();
  const {
    eventId
  } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (eventId) {
        const data = await getEventById(eventId);
        if (data) setEvent(data);else navigate('/not-found');
      }
    })();
  }, []);
  const attendees = [avatar1, avatar3, avatar4, avatar5, avatar6];
  return <>
    <PageMetaData title={event?.id ?? "Event Details"} />
    <Col md={8} lg={9} className="vstack gap-4">
      <Card className="card-body card-overlay-bottom border-0" style={{
        backgroundImage: `url(${event6})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <Row className="g-3 justify-content-between">
          <Col lg={2}>
            <div className="bg-mode text-center rounded overflow-hidden p-1 d-inline-block">
              <div className="bg-primary p-2 text-white rounded-top small lh-1">Wednesday</div>
              <h5 className="mb-0 py-2 lh-1">Dec 08</h5>
            </div>
          </Col>
        </Row>
        <Row className="g-3 justify-content-between align-items-center mt-5 pt-5 position-relative z-index-9">
          <Col lg={9}>
            <h1 className="h3 mb-1 text-white">The learning conference </h1>
            <a className="text-white" href="https://themes.getbootstrap.com/store/webestica" target="_blank">
              https://themes.getbootstrap.com/store/webestica
            </a>
          </Col>
          <Col lg={3} className="text-lg-end">
            <Button variant="primary"> Buy ticket </Button>
          </Col>
        </Row>
      </Card>
      <Card className="card-body">
        <Row className="g-4">
          <Col xs={12}>
            <p className="mb-0">
              He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of
              compliment alteration to. Place voice no arises along to. Parlors waiting so against me no.
            </p>
          </Col>
          <Col sm={6} lg={4}>
            <h5>Timings</h5>
            <p className="small mb-0">09:00 AM - 05:00 PM (Business)</p>
            <p className="small mb-0"> 09:00 AM - 03:00 PM (Business)</p>
          </Col>
          <Col sm={6} lg={4}>
            <h5>Entry fees</h5>
            <p className="small mb-0">
              
              <a href=""> Free Ticket </a>For photography professionals check official website
            </p>
          </Col>
          <Col sm={6} lg={4}>
            <h5>Category &amp; type</h5>
            <p className="small mb-0">Trade Show</p>
            <p className="small mb-0"> Photography &amp; Prewedding</p>
          </Col>
          <Col sm={6} lg={4}>
            <h5>Estimated turnout</h5>
            <p className="small mb-0">140000 Visitors</p>
            <p className="small mb-0"> 1800 Exhibitors</p>
            <span className="badge bg-danger text-danger bg-opacity-10 small">Estimated Count</span>
          </Col>
          <Col sm={6} lg={4}>
            <ul className="d-flex list-unstyled mb-1">
              <li className="me-2">4.5</li>
              {Array(Math.floor(4.5)).fill(0).map((_star, idx) => <div key={idx}>
                    <FaStar size={16} className="text-warning" />
                  </div>)}
              {!Number.isInteger(4.5) && <div>
                  
                  <FaStarHalfStroke size={16} className="text-warning" />
                </div>}
              {4.5 < 5 && Array(5 - Math.ceil(4.5)).fill(0).map((_star, idx) => <div key={idx}>
                      <FaRegStar size={16} className="text-warning" />
                    </div>)}
              <li className="ms-1 small">132 Ratings</li>
            </ul>
            <p className="mb-0 small">
              
              <strong> #2 of 3506</strong> Events in Photography &amp; Prewedding
            </p>
          </Col>
          <Col sm={6} lg={4}>
            <div className="d-flex">
              <h6>
                
                <BsHandThumbsUpFill className="text-success" /> 50
              </h6>
              <p className="small">People have shown interest recently</p>
            </div>
            <button className="btn btn-success-soft btn-sm">Interested?</button>
          </Col>
        </Row>
        <hr className="mt-4" />
        <Row className="align-items-center">
          <Col lg={6}>
            <h5>Attendees</h5>
            <ul className="avatar-group list-unstyled align-items-center">
              {attendees.map((avatar, idx) => <li className="avatar avatar-xs" key={idx}>
                  <img className="avatar-img rounded-circle" src={avatar} alt="avatar" />
                </li>)}
              <li className="ms-4">
                <small> 148.9K people responded</small>
              </li>
            </ul>
          </Col>
          <Col lg={6}>
            <Row className="g-2">
              {counterData.map(({
                icon: Icon,
                count,
                title
              }, idx) => <Col sm={4} key={idx}>
                  <div className="d-flex">
                    <Icon className="fs-4 mt-1" />
                    <div className="ms-3">
                      <h5 className="mb-0">{count}</h5>
                      <p className="mb-0">{title}</p>
                    </div>
                  </div>
                </Col>)}
            </Row>
          </Col>
        </Row>
      </Card>
      <Row className="g-4">
        <Col lg={6}>
          <RelatedEvents />
        </Col>
        <Col lg={6}>
          <Card>
            <CardHeader className="border-0 pb-0">
              <CardTitle className="mb-0">Event location</CardTitle>
              <p className="small">
                
                <BsGeoAlt className="pe-1" />
                750 Sing Sing Rd, Horseheads, NY, 14845
              </p>
            </CardHeader>
            <CardBody className="pt-0">
              <iframe className="w-100 d-block rounded-bottom grayscale" height={230} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sin!4v1586000412513!5m2!1sen!2sin" style={{
                border: 0
              }} aria-hidden="false" tabIndex={0} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Col>
    </>;
};
export default EventDetails;