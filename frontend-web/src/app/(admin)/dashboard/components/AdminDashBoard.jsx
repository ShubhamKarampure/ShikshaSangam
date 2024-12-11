import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import SummaryCard from './SummaryCard';
import ScheduleCard from "./ScheduleCard";
import ApprovalCard from "./ApprovalCard";
import { LineChart } from "@mui/x-charts/LineChart";
import SummaryCard from "./SummaryCard";

import PeopleIcon from "@mui/icons-material/People";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getUserByCollege } from "../../../../api/users";

// Mock data for users


// Mock data for events
const events = [
  { id: 1, title: "Alumni Networking Event", date: "2024-03-15" },
  { id: 2, title: "Career Fair", date: "2024-03-22" },
  { id: 3, title: "Workshop: Resume Building", date: "2024-04-05" },
];

const AdminDashboard = () => {
  // Calculate statistics
  const [users,setUsers]=useState([])
  useEffect(()=>{
    const fetchUserByCollege=async()=>{
      const res=await getUserByCollege()
      console.log(res);
      
      if(res){
        setUsers(res)
      }else{
        console.log(res);
        
      }
    }
    fetchUserByCollege()
  },[])
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
      <Row className="mb-4">
        <Col md={3}>
          <SummaryCard
            title="Total Users"
            value={totalUsers}
            icon={<PeopleIcon style={{ color: "#1976d2" }} />}
            percentage={'1'}
          />
        </Col>
        <Col md={3}>
          <SummaryCard
            title="Pending Approval"
            value={pendingApproval}
            icon={<PendingActionsIcon style={{ color: "#f57c00" }} />}
            percentage={'3'}
          />
        </Col>
        <Col md={3}>
          <SummaryCard
            title="Approved Alumni"
            value={approvedAlumni}
            icon={<SchoolIcon style={{ color: "#388e3c" }} />}
            percentage={'-2'}
          />
        </Col>
        <Col md={3}>
          <SummaryCard
            title="Approved Students"
            value={approvedStudents}
            icon={<CheckCircleIcon style={{ color: "#1976d2" }} />}
            percentage={'5'}
          />
        </Col>
      </Row>
      <h4>User growth and approval</h4>
      <LineChart
        series={[
          { curve: "natural", data: [0, 5, 2, 6, 3, 9.3] },
          { curve: "natural", data: [6, 3, 7, 9.5, 4, 2] },
        ]}
        height={400}
      />
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
