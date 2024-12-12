import Plyr from "plyr-react";
import { Col, Container, Row } from "react-bootstrap";
import { BsMicMute, BsXLg } from "react-icons/bs";
import element4 from "@/assets/images/elements/04.svg";
import element6 from "@/assets/images/elements/06.svg";
import element10 from "@/assets/images/elements/10.svg";
import post7 from "@/assets/images/post/1by1/07.jpg";
import post2 from "@/assets/images/post/4by3/02.jpg";
import "plyr-react/plyr.css";

const Video = () => {
  return (
    <section className="py-4 py-sm-5 position-relative">
      <div className="position-absolute top-0 start-0 mt-n5 pt-n5">
        <img className="h-300px blur-9 w-auto" src={element6} alt="image" />
      </div>
      <Container>
        <Row>
          <Col lg={10} className="mx-auto">
            <Row className="g-4 align-items-center position-relative z-index-1">
              <Col md={6}>
                <div className="me-4">
                  <h2 className="h1 mb-4">Video call</h2>
                  <div className="mb-3 d-flex align-items-start">
                    <img
                      width={44}
                      height={40}
                      className="h-40px w-auto"
                      src={element4}
                      alt="image"
                    />
                    <div className="ms-4">
                      <h5 className="mt-2">Meet Alumni</h5>
                      <p className="mb-0">
                        Connect with alumni from various batches and foster
                        meaningful relationships.
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 d-flex align-items-start">
                    <img
                      className="h-40px w-auto"
                      src={element10}
                      alt="image"
                    />
                    <div className="ms-4">
                      <h5 className="mt-2">Collaborate & Share</h5>
                      <p className="mb-0">
                        Share experiences, ideas, and support one another in
                        professional growth and networking.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={5} className="position-relative">
             
                <div className="position-absolute top-50 start-100 translate-middle d-none d-lg-block">
                  <div className="position-absolute top-0 end-0 m-3 z-index-1">
                    <div className="avatar avatar-lg">
                      <span role="button">
                        <img
                          className="avatar-img rounded border border-white border-1"
                          src={post7}
                          alt="image"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="position-absolute bottom-0 start-50 translate-middle-x z-index-1">
                    <button className="btn btn-white icon-md rounded-circle mb-3 me-1">
                      <span>
                        <BsMicMute />
                      </span>
                    </button>
                    <button className="btn btn-danger icon-md rounded-circle mb-3">
                      <span>
                        <BsXLg />
                      </span>
                    </button>
                  </div>
                  <div className="player-wrapper plyr__controls-none rounded-3">
                    <Plyr
                      options={{
                        autoplay: true,
                        loop: { active: true },
                        muted: true,
                      }}
                      crossOrigin="anonymous"
                      controls
                      source={{
                        type: "video",
                        sources: [{ src: "/videos/video-call.mp4" }],
                      }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Video;
