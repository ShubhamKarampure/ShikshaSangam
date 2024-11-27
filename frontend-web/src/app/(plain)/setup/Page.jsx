import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import AdminSetup from "./components/AdminSetup";
import UserSetup from "./components/UserSetup";
import PageMetaData from "@/components/PageMetaData";
import SetUpLayout from "./components/SetUpLayout";
import { School, User } from "lucide-react";

const RoleCard = ({ title, description, icon: Icon, onClick, buttonText }) => (
  <Col md={6}>
    <Card className="shadow-lg border-primary h-100">
      <Card.Header className="bg-primary text-white">
        <h5>{title}</h5>
      </Card.Header>
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <div className="mt-3 mb-3">
          <Icon className="text-white" style={{ width: "80px", height: "80px" }} />
        </div>
        <p className="text-white">{description}</p>
      </Card.Body>
      <Card.Footer className="bg-transparent border-0">
        <Button variant="primary" className="w-100" onClick={onClick}>
          {buttonText}
        </Button>
      </Card.Footer>
    </Card>
  </Col>
);

export default function Setup() {
  const [role, setRole] = useState(null);

  const handleBackClick = () => {
    setRole(null); // Reset the role to null, showing the role selection page again
  };

  if (role === "admin") {
    return (
      <>
        <AdminSetup onBackClick={handleBackClick} />
      </>
    );
  }

  if (role === "student" || role === "alumni" || role === "faculty") {
    return (
      <>
        <UserSetup role={role} onBackClick={handleBackClick} />
      </>
    );
  }

  return (
    <>
      <PageMetaData title="SetUp Page" />
      <SetUpLayout>
        <Card className="text-center p-4 shadow-lg border-0">
          <h1 className="mb-4 text-white">Profile Setup</h1>
          <Row className="g-4">
            <RoleCard
              title="College Admin"
              description="Manage courses, faculty, and college resources"
              icon={School}
              onClick={() => setRole("admin")}
              buttonText="Choose Admin Role"
            />
            <RoleCard
              title="User"
              description="Access courses, assignments, and resources"
              icon={User}
              onClick={() => setRole("student")}
              buttonText="Choose User Role"
            />
          </Row>
        </Card>
      </SetUpLayout>
    </>
  );
}
