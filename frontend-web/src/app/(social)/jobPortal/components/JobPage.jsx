import React, { useState, useEffect, useMemo } from "react";
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
  Dropdown,
  InputGroup,
  Badge,
  Alert
} from "react-bootstrap";
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  Star, 
  X, 
  CheckCircle 
} from "lucide-react";
import { useProfileContext } from "../../../../context/useProfileContext";
import { createJob, fetchJobs, uploadResume } from "../../../../api/job";
import { useNavigate } from "react-router-dom";

const JobPage = () => {
  const { profile } = useProfileContext();
  const navigate = useNavigate();

  // State Management
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  
  // New state for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterSkills, setFilterSkills] = useState("");

  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    skills_required: "",
    posted_by: profile?.id || "",
  });

  // Enhanced state for tracking job application status
  const [jobApplications, setJobApplications] = useState({});
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch jobs from API
  // useEffect(() => {
  //   const loadJobs = async () => {
  //     try {
  //       const fetchedJobs = await fetchJobs();
  //       setJobs(fetchedJobs);
        
  //       // Initialize job application tracking
  //       const initialApplicationStatus = fetchedJobs.reduce((acc, job) => {
  //         acc[job.id] = false;
  //         return acc;
  //       }, {});
  //       setJobApplications(initialApplicationStatus);
  //     } catch (err) {
  //       console.error("Error fetching jobs:", err);
  //       setError("Failed to load jobs.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadJobs();
  // }, []);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
  
        // Retrieve application state from localStorage
        const savedApplications = JSON.parse(localStorage.getItem("jobApplications")) || {};
  
        // Initialize application status
        const initialApplicationStatus = fetchedJobs.reduce((acc, job) => {
          acc[job.id] = savedApplications[job.id] || false;
          return acc;
        }, {});
  
        setJobApplications(initialApplicationStatus);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
  
    loadJobs();
  }, []);

  const handleApply = (jobId) => {
    setJobApplications((prev) => { 
      const updatedApplications = { ...prev, [jobId]: true };
  
      // Save updated state to localStorage
      localStorage.setItem("jobApplications", JSON.stringify(updatedApplications));
  
      return updatedApplications;
    });
  
    setSelectedJobId(jobId);
    toggleResumeModal();
  };
  

  // Memoized filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !filterLocation || 
        job.location.toLowerCase().includes(filterLocation.toLowerCase());
      const matchesSkills = !filterSkills || 
        job.skills_required.toLowerCase().includes(filterSkills.toLowerCase());
      
      return matchesSearch && matchesLocation && matchesSkills;
    });
  }, [jobs, searchTerm, filterLocation, filterSkills]);

  // Toggle Modals
  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleResumeModal = () => setResumeModalOpen(!resumeModalOpen);

  // Handle Job Form Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobForm({ ...jobForm, [name]: value });
  };

  // Post Job to Backend
  const handlePostJob = async () => {
    if (!profile) {
      console.error("Profile not available.");
      return;
    }

    const newJob = { ...jobForm, posted_by: profile.id };

    try {
      const createdJob = await createJob(newJob);
      setJobs([...jobs, createdJob]);

      // Reset job form and update job applications tracking
      setJobForm({
        title: "",
        company: "",
        location: "",
        description: "",
        skills_required: "",
        posted_by: profile.id,
      });

      // Update job applications state
      setJobApplications(prev => ({
        ...prev,
        [createdJob.id]: false
      }));

      toggleModal();
    } catch (err) {
      console.error("Error creating job:", err);
      setError("Failed to post job.");
    }
  };

  

  // Handle Resume File Change
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleAskForReferral = () => {
    navigate("/messaging");
  };

  // Upload Resume to Backend
  const handleUploadResume = async () => {
    if (!resumeFile) {
      alert("Please select a file to upload.");
      return;
    }
  
    if (!selectedJobId || !profile?.id) {
      alert("Job or applicant information is missing.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("job", selectedJobId); // Adding job ID
      formData.append("applicant", profile.id); // Adding applicant ID (from context)
      formData.append("resume", resumeFile); // Adding the resume file
  
      await uploadResume(formData); // Call API function to upload
  
      // Update job application status
      setJobApplications((prev) => ({
        ...prev,
        [selectedJobId]: true,
      }));
  
      alert("Resume uploaded successfully!");
      toggleResumeModal();
      setResumeFile(null);
    } catch (err) {
      console.error("Error uploading resume:", err);
      alert("Failed to upload resume.");
    }
  };
  

  // Render loading and error states
  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        {error}
      </Alert>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <h1 className="mb-0">Job Postings</h1>
        </div>
        <div className="col-md-6 text-end">
          <Button 
            variant="success" 
            onClick={toggleModal} 
            disabled={!profile}
          >
            Post a Job
          </Button>
        </div>
      </div>

      Search and Filter Section
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <InputGroup>
            <InputGroup.Text><Search size={18} /></InputGroup.Text>
            <FormControl 
              placeholder="Search jobs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-md-4 mb-2">
          <InputGroup>
            <InputGroup.Text><MapPin size={18} /></InputGroup.Text>
            <FormControl 
              placeholder="Filter by Location" 
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-md-4 mb-2">
          <InputGroup>
            <InputGroup.Text><Briefcase size={18} /></InputGroup.Text>
            <FormControl 
              placeholder="Filter by Skills" 
              value={filterSkills}
              onChange={(e) => setFilterSkills(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      {/* Job Cards */}
      <div className="row g-3">
        {filteredJobs.length === 0 ? (
          <div className="col-12">
            <Alert variant="info" className="text-center">
              No jobs match your search criteria.
            </Alert>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="col-md-6 col-lg-4">
              <Card className="h-100 shadow-sm">
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{job.title}</h5>
                    <small className="text-muted">{job.company}</small>
                  </div>
                  <Badge 
                    bg={jobApplications[job.id] ? "success" : "secondary"}
                    className="d-flex align-items-center"
                  >
                    {jobApplications[job.id] ? <CheckCircle size={16} className="me-1" /> : <X size={16} className="me-1" />}
                    {jobApplications[job.id] ? "Applied" : "Not Applied"}
                  </Badge>
                </CardHeader>
                <CardBody>
                  <div className="d-flex align-items-center mb-2">
                    <MapPin size={16} className="me-2 text-muted" />
                    <span>{job.location || "Not specified"}</span>
                  </div>
                  <p className="text-truncate">{job.description}</p>
                  <div className="skills-tags mb-2">
  {job.skills_required.split(',').map((skill, idx) => (
    <Badge 
      key={idx} 
      style={{
        backgroundColor: '#0d6efd', // Use the primary color of the Apply Now button
        color: 'white',
      }}
      className="me-1 mb-1"
    >
      {skill.trim()}
    </Badge>
  ))}
</div>

                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <Star size={16} className="me-1" />
                      Posted by: {job.posted_by_name || "Unknown"}
                    </small>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => handleApply(job.id)}
                    disabled={jobApplications[job.id]}
                    className="me-2"
                  >
                    {jobApplications[job.id] ? "Applied" : "Apply Now"}
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={handleAskForReferral}
                  >
                    Ask for Referral
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Existing Modals remain the same */}
      {/* Job Posting Modal */}
      <Modal show={modalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Post a New Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <FormControl
                type="text"
                name="title"
                value={jobForm.title}
                onChange={handleInputChange}
                required
                placeholder="Enter job title"
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <FormControl
                type="text"
                name="company"
                value={jobForm.company}
                onChange={handleInputChange}
                required
                placeholder="Enter company name"
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Location</Form.Label>
              <FormControl
                type="text"
                name="location"
                value={jobForm.location}
                onChange={handleInputChange}
                required
                placeholder="Enter job location"
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Job Description</Form.Label>
              <FormControl
                as="textarea"
                name="description"
                value={jobForm.description}
                onChange={handleInputChange}
                rows={3}
                required
                placeholder="Describe the job responsibilities"
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
                placeholder="Enter skills (comma-separated)"
              />
              <Form.Text className="text-muted">
                Separate multiple skills with commas
              </Form.Text>
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

      {/* Resume Upload Modal */}
      <Modal show={resumeModalOpen} onHide={toggleResumeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Your Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <Form.Label>Resume</Form.Label>
              <FormControl
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
              />
              <Form.Text className="text-muted">
                Accepted formats: PDF, DOC, DOCX
              </Form.Text>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleResumeModal}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleUploadResume}
            disabled={!resumeFile}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobPage;