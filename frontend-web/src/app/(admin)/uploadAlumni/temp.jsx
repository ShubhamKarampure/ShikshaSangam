import React, { lazy, Suspense } from "react";
import FileUploadComponent from "./components/FileUploadComponent";
import { profilePanelLinksData1 } from "@/assets/data/layout";
import ProfilePanel from "@/components/layout/ProfilePanel";
import { useLayoutContext } from "@/context/useLayoutContext";
import useViewPort from "@/hooks/useViewPort";
import {
  Col,
  Container,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
} from "react-bootstrap";
import { FaSlidersH } from "react-icons/fa";
import FallbackLoading from "@/components/FallbackLoading";
import Preloader from "@/components/Preloader";

const TopHeader = lazy(() => import("@/components/layout/TopHeader"));

function Page() {
  const { messagingOffcanvas, startOffcanvas } = useLayoutContext();
  const { width } = useViewPort();

  return (
    <>
      {/* Top Header */}
      <Suspense fallback={<Preloader />}>
        <TopHeader />
      </Suspense>

      {/* Main Layout */}
      <main className="d-flex flex-column">
        <Container fluid>
          <Row className="g-4">
            {/* Sidebar */}
            

            {/* Main Content */}
            <Col lg={9} className="main-content">
              <Suspense fallback={<FallbackLoading />}>
                <FileUploadComponent />
              </Suspense>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default Page;
