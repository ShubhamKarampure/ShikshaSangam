import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import SummaryCard from './SummaryCard';
import ScheduleCard from "./ScheduleCard";
import ApprovalCard from "./ApprovalCard";

// Mock data for users
const users = [
  { id: 1, name: "John Doe", role: "Alumni", status: "Approved" },
  { id: 2, name: "Jane Smith", role: "Student", status: "Pending" },
  { id: 3, name: "Bob Johnson", role: "Alumni", status: "Pending" },
  { id: 4, name: "Alice Brown", role: "Student", status: "Approved" },
  { id: 5, name: "Charlie Davis", role: "Student", status: "Pending" },
];

// Mock data for events
const events = [
  { id: 1, title: "Alumni Networking Event", date: "2024-03-15" },
  { id: 2, title: "Career Fair", date: "2024-03-22" },
  { id: 3, title: "Workshop: Resume Building", date: "2024-04-05" },
];

const AdminDashboard = () => {
  // Calculate statistics
  const totalUsers = users.length;
  const pendingApproval = users.filter(
    (user) => user.status === "Pending"
  ).length;
  const approvedAlumni = users.filter(
    (user) => user.status === "Approved" && user.role === "Alumni"
  ).length;
  const approvedStudents = users.filter(
    (user) => user.status === "Approved" && user.role === "Student"
  ).length;

  return (
    <div className="py-4 w-100">
      <h1 className="mb-4">Admin Dashboard</h1>

      {/* Summary Cards */}
      {/* <Row className="mb-4">
        <Col md={3}>
          <SummaryCard title="Total Users" value={totalUsers} />
        </Col>
        <Col md={3}>
          <SummaryCard title="Pending Approval" value={pendingApproval} />
        </Col>
        <Col md={3}>
          <SummaryCard title="Approved Alumni" value={approvedAlumni} />
        </Col>
        <Col md={3}>
          <SummaryCard title="Approved Students" value={approvedStudents} />
        </Col>
      </Row> */}

      {/* Schedule and Approval Cards */}
      <div className="d-flex gap-3 w-100">
        <div style={{ width: "70%" }}>
          <ApprovalCard users={users} />
        </div>
        <div style={{ width: "30%" }}>
          <ScheduleCard events={events} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
