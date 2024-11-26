import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';

const UserSetup = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  const [collegeInfo, setCollegeInfo] = useState({ college: '', instituteCode: '' });
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    department: '',
    graduationYear: '',
  });

  const handleCollegeInfoSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    console.log('User setup submitted:', { ...collegeInfo, ...userInfo, userType });
    // Here you would typically send this data to your backend
  };

  const renderCollegeInfoForm = () => (
    <Form onSubmit={handleCollegeInfoSubmit}>
      <Form.Group className="mb-3" controlId="formCollege">
        <Form.Label>Select College</Form.Label>
        <Form.Control
          as="select"
          value={collegeInfo.college}
          onChange={(e) => setCollegeInfo({ ...collegeInfo, college: e.target.value })}
          required
        >
          <option value="">Choose...</option>
          <option value="college1">College 1</option>
          <option value="college2">College 2</option>
          <option value="college3">College 3</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formInstituteCode">
        <Form.Label>Institute Code</Form.Label>
        <Form.Control
          type="text"
          value={collegeInfo.instituteCode}
          onChange={(e) => setCollegeInfo({ ...collegeInfo, instituteCode: e.target.value })}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Next
      </Button>
    </Form>
  );

  const renderUserInfoForm = () => (
    <Form onSubmit={handleUserInfoSubmit}>
      <Form.Group className="mb-3" controlId="formUserType">
        <Form.Label>User Type</Form.Label>
        <Form.Control
          as="select"
          value={userType || ''}
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="">Choose...</option>
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
          <option value="faculty">Faculty</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={userInfo.fullName}
          onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          value={userInfo.phoneNumber}
          onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          required
        />
      </Form.Group>

      {userType === 'faculty' && (
        <Form.Group className="mb-3" controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            value={userInfo.department}
            onChange={(e) => setUserInfo({ ...userInfo, department: e.target.value })}
            required
          />
        </Form.Group>
      )}

      {(userType === 'student' || userType === 'alumni') && (
        <Form.Group className="mb-3" controlId="formGraduationYear">
          <Form.Label>{userType === 'student' ? 'Expected Graduation Year' : 'Graduation Year'}</Form.Label>
          <Form.Control
            type="number"
            value={userInfo.graduationYear}
            onChange={(e) => setUserInfo({ ...userInfo, graduationYear: e.target.value })}
            required
          />
        </Form.Group>
      )}

      <Button variant="primary" type="submit" className="w-100">
        Submit
      </Button>
    </Form>
  );

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">User Setup</Card.Title>
          {step === 1 ? renderCollegeInfoForm() : renderUserInfoForm()}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserSetup;

