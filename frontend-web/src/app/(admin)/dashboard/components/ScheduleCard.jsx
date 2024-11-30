import React from 'react';
import { Card, Table } from 'react-bootstrap';

const ScheduleCard = ({ events }) => (
  <Card>
    <Card.Header>
      <h2>Upcoming Events</h2>
    </Card.Header>
    <Card.Body>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

export default ScheduleCard;

