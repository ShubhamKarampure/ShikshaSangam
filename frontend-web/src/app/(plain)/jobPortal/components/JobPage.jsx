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
import { createJob,fetchJobs } from "../../../../api/job";

const JobPage = () => {
  const { profile } = useProfileContext();

  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    skills_required: "",
    posted_by: profile?.id || "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch jobs from the API
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobForm({ ...jobForm, [name]: value });
  };

  const handlePostJob = async () => {
    if (!profile) {
      console.error("Profile not available.");
      return;
    }

    const newJob = { ...jobForm, posted_by: profile.id };

    try {
      const createdJob = await createJob(newJob);
      setJobs([...jobs, createdJob]);

      setJobForm({
        title: "",
        company: "",
        location: "",
        description: "",
        skills_required: "",
        posted_by: profile.id,
      });

      toggleModal();
    } catch (err) {
      console.error("Error creating job:", err);
      setError("Failed to post job.");
    }
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

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
                <strong>Posted By:</strong> {job.posted_by}
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
