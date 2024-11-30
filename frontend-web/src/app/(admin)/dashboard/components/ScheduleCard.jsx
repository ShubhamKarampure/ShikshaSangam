import React from 'react';
import Calendar from './Calendar';
import { Card, Table } from 'react-bootstrap';

const ScheduleCard = ({ events }) => (
    <>  
        <h1>Event Schedule</h1>
        <Calendar events={events}/>
    </>
);

export default ScheduleCard;

