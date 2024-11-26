import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import AdminSetup from './AdminSetup';
import UserSetup from './UserSetup';
import PageMetaData from '@/components/PageMetaData';

const Setup = () => {
  const [role, setRole] = useState(null);

  if (role === 'admin') {
    return <AdminSetup />;
  }

  if (role === 'user') {
    return <UserSetup />;
  }

  return (
    <>
      <PageMetaData title="Profile Setup" />
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Card className="w-100 p-4 p-sm-5 shadow-lg" style={{ maxWidth: '400px' }}>
          <Card.Body className="text-center">
            
            <Card.Title className="mb-4" >Select Your Role</Card.Title>
            <div className="d-grid gap-3">
              <Button variant="primary" size="lg" onClick={() => setRole('admin')}>
                Admin
              </Button>
              <Button variant="secondary" size="lg" onClick={() => setRole('user')}>
                User
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Setup;
