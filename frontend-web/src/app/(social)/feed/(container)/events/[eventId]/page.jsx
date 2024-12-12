import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
} from "react-bootstrap";
import { BsGeoAlt, BsHandThumbsUpFill, BsClock, BsGlobe, BsPeople, BsPersonPlus } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import PageMetaData from "@/components/PageMetaData";
import { getEventDetails } from "@/api/events";
import MapComponent from "./components/GoogleMap";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  (async () => {
    if (eventId) {
      try {
        const data = await getEventDetails(eventId);
        if (data) {
          // Add a null check for location before splitting
          const coordinates = data.location 
            ? data.location.split(',').map(coord => parseFloat(coord.trim()))
            : null;
          
          setEvent({
            ...data,
            coordinates: coordinates 
              ? { lat: coordinates[0], lng: coordinates[1] } 
              : null
          });
        } else {
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Failed to fetch event details:", error);
        navigate("/not-found");
      }
    }
  })();
}, [eventId, navigate]);

// Update the MapComponent rendering to handle null coordinates
    
  if (!event) {
    return <div>Loading...</div>;
  }

  const counterData = [
    {
      title: "Registered",
      count: event.registrations_count,
      icon: BsPersonPlus,
    },
    {
      title: "Mode",
      count: event.mode,
      icon: BsGlobe,
    },
    {
      title: "Time to Event",
      count: event.time_to_event,
      icon: BsClock,
    },
  ];

  return (
    <>
      <PageMetaData title={event.name} />
      <Col md={8} lg={9} className="vstack gap-4">
        <Card
          className="card-body card-overlay-bottom border-0"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/${cloudName}/${event.poster})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Row className="g-3 justify-content-between">
            <Col lg={2}>
              <div className="bg-mode text-center rounded overflow-hidden p-1 d-inline-block">
                <div className="bg-primary p-2 text-white rounded-top small lh-1">
                  {new Date(event.date_time).toLocaleString("en-US", {
                    weekday: "short",
                  })}
                </div>
                <h5 className="mb-0 py-2 lh-1">
                  {new Date(event.date_time).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })}
                </h5>
              </div>
            </Col>
          </Row>
          <Row className="g-3 justify-content-between align-items-center mt-5 pt-5 position-relative z-index-9">
            <Col lg={9}>
              <h1 className="h3 mb-1 text-white">{event.name}</h1>
              {event.tags?.map((tag, index) => (
                <span 
                  key={index} 
                  className="badge bg-danger text-danger bg-opacity-10 small m-1"
                >
                  {tag}
                </span>
              ))}
            </Col>
            <Col lg={3} className="text-lg-end">
              <Button variant="primary">Register</Button>
            </Col>
          </Row>
        </Card>

        <Card className="card-body">
          <Row className="g-4">
            <Col xs={12}>
              <p className="mb-0">{event.summary}</p>
            </Col>

            <Col sm={6} lg={4}>
              <h5>Timings</h5>
              <p className="small mb-0">
                {new Date(event.date_time).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </Col>

            <Col sm={6} lg={4}>
              <h5>Entry fees</h5>
              <p className="small mb-0">
                {event.registration_fee === 0 ? "Free" : `₹${event.registration_fee}`}
              </p>
            </Col>

            <Col sm={6} lg={4}>
              <h5>Category &amp; Type</h5>
              <p className="small mb-0">{event.type}</p>
            </Col>

            <Col sm={6} lg={4}>
              <h5>Prizes Worth</h5>
              {event.prizes && (
                <>
                  <p className="small mb-0">First Prize: ₹{event.prizes.first}</p>
                  <p className="small mb-0">Second Prize: ₹{event.prizes.second}</p>
                  <p className="small mb-0">Third Prize: ₹{event.prizes.third}</p>
                </>
              )}
            </Col>

            <Col sm={6} lg={4}>
              <h5>Organised by</h5>
              <p className="small mb-0">{event.organising_committee}</p>
            </Col>

            <Col sm={6} lg={4}>
              <h5>Location</h5>
              <p className="small mb-0">
                <BsGeoAlt className="me-2" />
                {event.location}
              </p>
            </Col>

            <Col xs={12}>
              <h5>Description</h5>
              <p className="small mb-0">{event.description}</p>
            </Col>

            <Col xs={12}>
              <h5>Organizer Contacts</h5>
              {event.organiser_contacts.Organizers.map((organizer, index) => (
                <div key={index} className="mb-2">
                  <p className="small mb-0"><strong>{organizer.Name}</strong> - {organizer.Role}</p>
                  <p className="small mb-0">Contact: {organizer.Contact}</p>
                </div>
              ))}
            </Col>

            <Col xs={12}>
              <h5>Event Plan</h5>
              {Object.entries(event.event_plan).map(([day, details]) => (
                <div key={day} className="mb-3">
                  <h6>{day}</h6>
                  {details.Time && <p className="small mb-1">Time: {details.Time}</p>}
                  {details.Activities && (
                    <ul className="small mb-0">
                      {details.Activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  )}
                  {details.Mentorship && <p className="small mb-0">Mentorship: {details.Mentorship}</p>}
                  {details.VenueSetup && <p className="small mb-0">Venue Setup: {details.VenueSetup}</p>}
                  {details.Communication && <p className="small mb-0">Communication: {details.Communication}</p>}
                  {details.SafetySecurity && <p className="small mb-0">Safety & Security: {details.SafetySecurity}</p>}
                </div>
              ))}
            </Col>

            <Col xs={12}>
              <h5>Event Location</h5>
              { event.coordinates && <MapComponent location={event.coordinates} /> }
    
            </Col>
          </Row>

          <hr className="mt-4" />

          <Row className="align-items-center">
            <Col lg={12}>
              <Row className="g-2">
                {counterData.map(({ icon: Icon, count, title }, idx) => (
                  <Col sm={4} key={idx}>
                    <div className="d-flex">
                      <Icon className="fs-4 mt-1" />
                      <div className="ms-3">
                        <h5 className="mb-0">{count}</h5>
                        <p className="mb-0">{title}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default EventDetails;

