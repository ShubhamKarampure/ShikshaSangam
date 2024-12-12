import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";
import { BsGeoAlt, BsHandThumbsUpFill } from "react-icons/bs";
import { BsGlobe, BsPeople, BsPersonPlus } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import PageMetaData from "@/components/PageMetaData";
import { getEventDetails } from "@/api/events";

import event6 from "@/assets/images/events/06.jpg";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (eventId) {
        try {
          const data = await getEventDetails(eventId);
          if (data) {
            setEvent(data);
            // Set initial mode based on event data
            setSelectedMode(data.mode || 'online');
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

  if (!event) {
    return <div>Loading...</div>;
  }

  const counterData = [
    {
      title: "Registered",
      count: event.registrations_count ?? 0,
      icon: BsPersonPlus,
    },
    {
      title: "Event Mode",
      count: selectedMode === 'online' ? "Online" : "Offline",
      icon: BsGlobe,
    },
  ];

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <>
      <PageMetaData title={event.name ?? "Event Details"} />
      <Col md={8} lg={9} className="vstack gap-4">
        <Card
          className="card-body card-overlay-bottom border-0"
          style={{
            backgroundImage: event.poster
              ? `url(https://res.cloudinary.com/${cloudName}/${event.poster})`
              : `url(${event6})`,
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
                  }) || "Wed"}
                </div>
                <h5 className="mb-0 py-2 lh-1">
                  {new Date(event.date_time).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                  }) || "Dec 08"}
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
          {/* Mode Selection Buttons */}
          <div className="d-flex justify-content-center mb-4">
            <Button
              variant={selectedMode === 'online' ? 'primary' : 'outline-primary'}
              className="me-2"
              onClick={() => handleModeChange('online')}
            >
              Online
            </Button>
            <Button
              variant={selectedMode === 'offline' ? 'primary' : 'outline-primary'}
              onClick={() => handleModeChange('offline')}
            >
              Offline
            </Button>
          </div>

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
                <a href="">
                  {event.registration_fee === 0 ? "Free" : `₹${event.registration_fee}`}
                </a>
              </p>
            </Col>

            <Col sm={6} lg={4}>
              <h5>Event Mode</h5>
              <p className="small mb-0">{selectedMode}</p>
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
              <div className="d-flex">
                <h6 style={{ margin: "0px 8px 0px 0px" }}>
                  <BsHandThumbsUpFill className="text-success" />{" "}
                  {event.likes_count ?? 0}
                </h6>
                <p className="small">People have shown interest recently</p>
              </div>
              <button className="btn btn-success-soft btn-sm">
                Interested?
              </button>
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