import React, { useState } from "react";
import { Card, Button, Row, Col, Container, Form } from "react-bootstrap";
import AdminSetup from "./components/AdminSetup";
import UserSetup from "./components/UserSetup";
import PageMetaData from "@/components/PageMetaData";
import SetUpLayout from "./SetupLayout";
import { School, User, GraduationCap, BookOpen } from 'lucide-react';

const RoleCard = ({ title, description, icon: Icon, onClick, buttonText, selected }) => (
  <Col md={3} className="mb-4"> {/* Change md={3} to fit 4 items in a row */}
    <Card 
      className={`h-100 shadow transition-all ${selected ? 'border-primary' : 'border-light'}`}
      onClick={onClick}
    >
      <Card.Header className={`${selected ? 'bg-primary' : 'bg-light'} text-center`}>
        <h5 className={selected ? 'text-white' : 'text-primary'}>{title}</h5>
      </Card.Header>
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <div className="my-3">
          <Icon className={`${selected ? 'text-primary' : 'text-secondary'}`} size={64} />
        </div>
        <p className="text-center">{description}</p>
      </Card.Body>
      <Card.Footer className="bg-transparent border-0">
        <Button 
          variant={selected ? "primary" : "outline-primary"} 
          className="w-100"
        >
          {buttonText}
        </Button>
      </Card.Footer>
    </Card>
  </Col>
);

export default function Setup() {
  const [role, setRole] = useState(null);

  const handleBackClick = () => {
    setRole(null);
  };

  if (role === "admin") {
    return <AdminSetup onBackClick={handleBackClick} />;
  }

  if (role === "student" || role === "alumni" || role === "college_staff") {
    return <UserSetup role={role} onBackClick={handleBackClick} />;
  }

  return (
    <>
      <PageMetaData title="Profile Setup" />
      <Container className="py-5">
        <Card className="shadow-lg border-0">
          <Card.Header className="bg-primary text-white text-center py-4">
            <h1 className="h3 mb-0">Profile Setup</h1>
            <p className="mb-0 mt-2">Choose your role to get started</p>
          </Card.Header>
          <Card.Body className="p-4">
            <Form>
              <Row className="g-4">
                {/* College Admin Role Card */}
                <RoleCard
                  title="College Admin"
                  description="Manage alumni data, organize events, and oversee mentorship programs."
                  icon={School}
                  onClick={() => setRole("admin")}
                  buttonText="Choose Admin Role"
                  selected={role === "admin"}
                />
                {/* Student Role Card */}
                <RoleCard
                  title="Student"
                  description="Build your profile, connect with alumni, and apply for mentorship and events."
                  icon={User}
                  onClick={() => setRole("student")}
                  buttonText="Choose Student Role"
                  selected={role === "student"}
                />
                {/* Alumni Role Card */}
                <RoleCard
                  title="Alumni"
                  description="Mentor students, share career advice, and engage in discussions and events."
                  icon={GraduationCap}
                  onClick={() => setRole("alumni")}
                  buttonText="Choose Alumni Role"
                  selected={role === "alumni"}
                />
                {/* Faculty Role Card */}
                <RoleCard
                  title="Faculty"
                  description="Guide students, manage assignments, and participate in alumni-student events."
                  icon={BookOpen}
                  onClick={() => setRole("college_staff")}
                  buttonText="Choose Faculty Role"
                  selected={role === "faculty"}
                />
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
