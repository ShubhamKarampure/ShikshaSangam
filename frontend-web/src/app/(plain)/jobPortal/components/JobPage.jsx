import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Modal,
  Form,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import { useProfileContext } from "../../../../context/useProfileContext";

const JobPage = () => {
  const { profile } = useProfileContext();

  const [jobs, setJobs] = useState(() => {
    // Retrieve jobs from localStorage or initialize with default jobs
    const savedJobs = localStorage.getItem("jobPostings");
    return savedJobs
      ? JSON.parse(savedJobs)
      : [
          {
            title: "Frontend Developer",
            company: "Tech Innovators Inc.",
            location: "San Francisco, CA",
            description: "Develop and maintain the front end of our web applications.",
            skills_required: "JavaScript, React, CSS",
            postedBy: "Alice Johnson",
          },
          {
            title: "Data Scientist",
            company: "Data Wizards LLC",
            location: "New York, NY",
            description: "Analyze large datasets to derive meaningful insights.",
            skills_required: "Python, Machine Learning, SQL",
            postedBy: "Bob Smith",
          },
          {
            title: "Backend Developer",
            company: "CodeCraft Solutions",
            location: "Austin, TX",
            description: "Build and maintain server-side applications and databases.",
            skills_required: "Node.js, Express, MongoDB",
            postedBy: "Charlie Davis",
          },
        ];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    skills_required: "",
    postedBy: profile?.full_name || "",
  });

  useEffect(() => {
    // Save jobs to localStorage whenever jobs state changes
    localStorage.setItem("jobPostings", JSON.stringify(jobs));
  }, [jobs]);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobForm({ ...jobForm, [name]: value });
  };

  const handlePostJob = () => {
    if (!profile) {
      console.error("Profile not available.");
      return;
    }

    const newJob = { ...jobForm, postedBy: profile.full_name };
    setJobs([...jobs, newJob]);

    setJobForm({
      title: "",
      company: "",
      location: "",
      description: "",
      skills_required: "",
      postedBy: profile.full_name,
    });

    toggleModal();
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Job Postings</h1>

      {/* Vertical Cards */}
      <div className="d-flex flex-column" style={{ gap: "16px" }}>
        {jobs.map((job, idx) => (
          <Card key={idx} className="shadow-sm">
            <CardHeader>
              <h5>{job.title}</h5>
              <small>{job.company}</small>
            </CardHeader>
            <CardBody>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>{job.description}</p>
              <p>
                <strong>Skills Required:</strong> {job.skills_required}
              </p>
              <p>
                <strong>Posted By:</strong> {job.postedBy}
              </p>
            </CardBody>
            <CardFooter>
              <Button variant="primary" size="sm">
                Apply Now
              </Button>
              <Button variant="secondary" size="sm" className="ms-2">
                Ask for Referral
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Post Job Button */}
      <Button variant="success" onClick={toggleModal} disabled={!profile}>
        Post a Job
      </Button>

      {/* Modal for Posting Jobs */}
      <Modal show={modalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>Post a New Job</Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <Form.Label>Job Title</Form.Label>
              <FormControl
                type="text"
                name="title"
                value={jobForm.title}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Company Name</Form.Label>
              <FormControl
                type="text"
                name="company"
                value={jobForm.company}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Location</Form.Label>
              <FormControl
                type="text"
                name="location"
                value={jobForm.location}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Job Description</Form.Label>
              <FormControl
                as="textarea"
                name="description"
                value={jobForm.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Skills Required</Form.Label>
              <FormControl
                type="text"
                name="skills_required"
                value={jobForm.skills_required}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handlePostJob}>
            Post Job
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobPage;
