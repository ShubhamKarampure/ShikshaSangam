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
import { getUserByCollege } from "@/api/users";
import { getCollegeSummary } from "@/api/college";

// Mock data for users


// Mock data for events
const events = [
  { id: 1, title: "Alumni Networking Event", date: "2024-03-15" },
  { id: 2, title: "Career Fair", date: "2024-03-22" },
  { id: 3, title: "Workshop: Resume Building", date: "2024-04-05" },
];

const AdminDashboard = () => {
  // Calculate statistics
  const [stats,setStats]=useState(null)
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
    const fetchCollegeSummary=async ()=>{
      const res=await getCollegeSummary()
      if(res){
        setStats(res)
      }else{
        console.log(res);
        
      }
    }
    fetchCollegeSummary()
    fetchUserByCollege()
  },[])
  return (
    <div className="py-4 w-100">
      <h1 className="mb-4">Admin Dashboard</h1>
    
      {/* Summary Cards */}
      <Row className="mb-4 d-flex" style={{"justifyContent":"center"}}>
        <Col md={3}>
          <SummaryCard
            title="Total Users"
            value={stats?.total_users}
            icon={<PeopleIcon style={{ color: "#1976d2" }} />}
            percentage={'1'}
          />
        </Col>
        {/* <Col md={3}>
          <SummaryCard
            title="College"
            value={stats?.total_users}
            icon={<PendingActionsIcon style={{ color: "#f57c00" }} />}
            percentage={'3'}
          />
        </Col> */}
        <Col md={3}>
          <SummaryCard
            title="Alumni"
            value={stats?.total_alumni}
            icon={<SchoolIcon style={{ color: "#388e3c" }} />}
            percentage={'-2'}
          />
        </Col>
        <Col md={3}>
          <SummaryCard
            title="Students"
            value={stats?.total_students}
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
