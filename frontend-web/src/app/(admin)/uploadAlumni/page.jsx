import React from "react";
import FileUploadComponent from "./components/FileUploadComponent";
import { Col, Container, Nav, Row } from "react-bootstrap";
import TopHeader from "@/components/layout/TopHeader";
import Sidebar from "@/components/layout/SideBar";

function page() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="d-flex flex-column w-100">
        <TopHeader />
        <Container className="py-4" style={{ width: "60%"}}>
          <FileUploadComponent />
        </Container>
      </div>
    </div>
  );
}

export default page;
