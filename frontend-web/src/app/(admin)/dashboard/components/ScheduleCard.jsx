import React from "react";
import Calendar from "./Calendar";
import { Card, Table } from "react-bootstrap";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ScheduleCard = ({ events }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Event Schedule</h3>
        <Button variant="outlined" onClick={() => navigate("/admin/eventschedule")}>
          More
        </Button>
      </div>
      <Calendar events={events} />
    </>
  );
};

export default ScheduleCard;
