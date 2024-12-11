import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaUpload } from "react-icons/fa";
import { useAuthContext } from "@/context/useAuthContext";
import { useNotificationContext } from "@/context/useNotificationContext";
import { useProfileContext } from "@/context/useProfileContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getColleges } from "@/api/college";
import { OnboardingProfileLayout } from "@/layouts/ProfileLayout";
import Loader from "@/components/layout/loadingAnimation";
import {
  createUserProfile,
  createStudentProfile,
  createAlumnusProfile,
  createCollegeStaffProfile,
} from "@/api/profile";
import { scrapeLinkedIn } from "@/api/users";

function UserSetup({ role: initialRole, onBackClick }) {
  const { user ,setUser} = useAuthContext();
  const { saveProfileData, saveProfileStatus } = useProfileContext();
  const { showNotification } = useNotificationContext();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState(initialRole);
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");
  const [socialLinks, setSocialLinks] = useState({});
  const [resume, setResume] = useState(null);
  const [department, setDepartment] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState("2024");
  const [currentProgram, setCurrentProgram] = useState("");
  const [expectedGraduationYear, setExpectedGraduationYear] = useState("2028");
  const [graduationYear, setGraduationYear] = useState("2020");
  const [currentEmployment, setCurrentEmployment] = useState({});
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [skillsList, setSkillsList] = useState([]); // Manage a list of skills
  // Add these state variables near the other state declarations
  const [experience, setExperience] = useState([]);
  const [scrapedData, setScrapedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showLinkedinInput, setShowLinkedinInput] = useState(false);

  const [isCustomSpecialization, setIsCustomSpecialization] = useState(false);

  const [currentExperience, setCurrentExperience] = useState({
    company_name: "",
    duration: "",
    logo: "",
    designations: [
      {
        designation: "",
        duration: "",
        location: "",
        projects: "",
      },
    ],
  });

  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    project_name: "",
    duration: "",
    description: "",
  });

  const handleLinkedInScrape = async () => {
  try {
    // Show spinner
    setLoading(true);

    const scrapedData = await scrapeLinkedIn(linkedinUrl);
    
    // Update states with scraped data
    setFullName(scrapedData.fullName);
    setBio(scrapedData.bio);
    setPosition(scrapedData.position);

    // Handle avatar and banner image
    if (scrapedData.avatar) {
      // Check if avatar is a URL or a file
      if (typeof scrapedData.avatar === 'string' && scrapedData.avatar.startsWith('http')) {
        // If it's a URL, download and send as file
        const response = await fetch(scrapedData.avatar);
        const blob = await response.blob();
        setAvatar(blob); // Set avatar as a Blob
      } else {
        setAvatar(scrapedData.avatar); // If it's already a file, set it directly
      }
    }

    if (scrapedData.bannerImage) {
      if (typeof scrapedData.avatar === 'string' && scrapedData.bannerImage.startsWith('http')) {
        // If it's a URL, download and send as file
        const response = await fetch(scrapedData.bannerImage);
        const blob = await response.blob();
        setBannerImage(blob); // Set avatar as a Blob
      } else {
        setBannerImage(scrapedData.blob); // If it's already a file, set it directly
      }
    }

    // Update experience, projects, and skills if available
    if (scrapedData.experience) {
      setExperience(scrapedData.experience);
    }

    if (scrapedData.projects) {
      setProjects(scrapedData.projects);
    }

    if (scrapedData.skills) {
      setSkillsList(scrapedData.skills);
    }

  } catch (error) {
    console.error('Error scraping LinkedIn profile:', error);
    // Optionally, show an error message to the user
  } finally {
    // Hide spinner once the scraping is done
    setLoading(false);
  }
};



  const addProject = (e) => {
    e.preventDefault();

    // Validate minimal required fields
    if (!currentProject.project_name) {
      showNotification({
        message: "Please enter a project name",
        variant: "danger",
      });
      return;
    }

    setProjects([...projects, currentProject]);

    // Reset current project
    setCurrentProject({
      project_name: "",
      duration: "",
      description: "",
    });
  };

  const removeProject = (indexToRemove) => {
    setProjects(projects.filter((_, index) => index !== indexToRemove));
  };

  const updateCurrentProject = (field, value) => {
    setCurrentProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add these functions near other similar helper functions
  const addExperience = (e) => {
    e.preventDefault();

    // Validate minimal required fields
    if (!currentExperience.company_name) {
      showNotification({
        message: "Please enter a company name",
        variant: "danger",
      });
      return;
    }

    setExperience([...experience, currentExperience]);

    // Reset current experience
    setCurrentExperience({
      company_name: "",
      duration: "",
      logo: "",
      designations: [
        {
          designation: "",
          duration: "",
          location: "",
          projects: "",
        },
      ],
    });
  };

  const removeExperience = (indexToRemove) => {
    setExperience(experience.filter((_, index) => index !== indexToRemove));
  };

  const updateCurrentExperience = (field, value) => {
    setCurrentExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateDesignation = (designationIndex, field, value) => {
    const updatedDesignations = [...currentExperience.designations];
    updatedDesignations[designationIndex][field] = value;

    setCurrentExperience((prev) => ({
      ...prev,
      designations: updatedDesignations,
    }));
  };

  const addDesignation = () => {
    setCurrentExperience((prev) => ({
      ...prev,
      designations: [
        ...prev.designations,
        {
          designation: "",
          duration: "",
          location: "",
          projects: "",
        },
      ],
    }));
  };

  const removeDesignation = (indexToRemove) => {
    if (currentExperience.designations.length > 1) {
      const updatedDesignations = currentExperience.designations.filter(
        (_, index) => index !== indexToRemove
      );
      setCurrentExperience((prev) => ({
        ...prev,
        designations: updatedDesignations,
      }));
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    const trimmedSkill = skills.trim();
    if (trimmedSkill && !skillsList.includes(trimmedSkill)) {
      setSkillsList([...skillsList, trimmedSkill]);
      setSkills("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter((skill) => skill !== skillToRemove));
  };

  
  // List of common specializations
  const commonSpecializations = [
    "Software Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "Web Development",
    "DevOps",
    "Cloud Computing",
    "UI/UX Design",
    "Product Management",
  ];

  const handleSpecializationChange = (e) => {
    const value = e.target.value;
    setSpecialization(value);

    // If 'Other' is selected, allow the user to enter their own specialization
    if (value === "Other") {
      setIsCustomSpecialization(true);
    } else {
      setIsCustomSpecialization(false);
    }
  };

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await getColleges();
        // console.log(response);

        setColleges(response);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };
    fetchColleges();
  }, []);

  const redirectUser = () => {
    const redirectLink = searchParams.get("redirectTo");
    if (redirectLink) {
      navigate(redirectLink);
    } else {
      navigate("/");
    }
  };

  
  const handleCollegeChange = (e) => {
    console.log("here");

    setSelectedCollege(() => e.target.value);
    console.log(selectedCollege);
  };

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSocialLinksChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentEmploymentChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      // Define the common fields for all roles
      const commonFields = {
        full_name: fullName,
        bio: bio,
        user: user.id,
        college: selectedCollege,
        contact_number: phoneNumber,
        specialization: specialization,
        location: location,
        social_links: JSON.stringify(socialLinks),
        experience: JSON.stringify(experience),
        project: JSON.stringify(projects),
        linkedin_url: linkedinUrl,
        skills: JSON.stringify(skillsList),
        role: role,
      };
      console.log(commonFields);

      // Loop through and append common fields
      for (const [key, value] of Object.entries(commonFields)) {
        formData.append(key, value);
      }

      // Handle file uploads (optional fields)
      if (avatar) formData.append("avatar_image", avatar);
      if (bannerImage) formData.append("banner_image", bannerImage);
      if (resume) formData.append("resume", resume);

      // Handle role-specific fields
      let roleProfileData = {};
      if (role === "student") {
        roleProfileData = {
          enrollment_year: enrollmentYear,
          current_program: currentProgram,
          expected_graduation_year: expectedGraduationYear,
          specialization: specialization,
          is_verified: false,
        };
      } else if (role === "alumni") {
        roleProfileData = {
          graduation_year: graduationYear,
          current_employment: currentEmployment,
          specialization: specialization,
          is_verified: false,
        };
      } else if (role === "college_staff") {
        roleProfileData = {
          position: position,
          department: department,
          is_verified: false,
        };
      }

      // Loop through and append role-specific fields
      for (const [key, value] of Object.entries(roleProfileData)) {
        formData.append(key, value);
      }
      // console.log("Formdata values");
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      // Send the form data to create a user profile
      const userprofile = await createUserProfile(formData);

      showNotification({
        message: "User Profile created successfully!",
        variant: "success",
      });
      if (role === "student") {
        const studentProfile = await createStudentProfile({
          ...roleProfileData,
          profile: userprofile.id,
        });
      } else if (role === "alumni") {
        const alumni = await createAlumnusProfile({
          ...roleProfileData,
          profile: userprofile.id,
        });
      } else if (role === "college_staff") {
        const collegeStaff = await createCollegeStaffProfile({
          ...roleProfileData,
          profile: userprofile.id,
        });
      }
      saveProfileStatus("true");
      saveProfileData(userprofile);
      setUser((prev)=> {return {...prev,"profile_id":userprofile.id,"role":userprofile.role}})
      redirectUser();
    } catch (error) {
      console.error("Error creating profile:", error);
      showNotification({
        message: "There was an error creating your profile.",
        variant: "danger",
      });
    }
    setLoading(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Personal Information</h3>
              {!showLinkedinInput ? (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowLinkedinInput(true)}
      >
        Connect with LinkedIn
      </button>
    ) : (
      <div className="d-flex align-items-center">
        <input
          type="url"
          className="form-control me-2"
          placeholder="Enter your LinkedIn URL"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          required
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={handleLinkedInScrape}
        >
          Submit
        </button>
      </div>
    )}
            </div>

            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bio" className="form-label">
                Bio
              </label>
              <textarea
                id="bio"
                className="form-control"
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="college" className="form-label">
                Select College
              </label>
              <select
                id="college"
                className="form-select"
                value={selectedCollege}
                onChange={handleCollegeChange}
                required
              >
                <option value="">Select a College</option>
                {colleges.map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.college_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="form-control"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h3 className="mb-4">Profile Details</h3>
            <OnboardingProfileLayout
              name={fullName}
              avatar={avatar}
              banner={bannerImage}
            />
            <div className="mb-3">
              <label htmlFor="avatar" className="form-label">
                Upload Avatar
              </label>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="avatar"
                  onChange={(e) => handleFileChange(e, setAvatar)}
                />
                <label className="input-group-text" htmlFor="avatar">
                  <FaUpload />
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="bannerImage" className="form-label">
                Upload Banner Image
              </label>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="bannerImage"
                  onChange={(e) => handleFileChange(e, setBannerImage)}
                />
                <label className="input-group-text" htmlFor="bannerImage">
                  <FaUpload />
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="specialization" className="form-label">
                Specialization
              </label>
              <select
                id="specialization"
                className="form-control"
                value={specialization}
                onChange={handleSpecializationChange}
              >
                <option value="">Select a specialization</option>
                {commonSpecializations.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              {isCustomSpecialization && (
                <input
                  type="text"
                  id="customSpecialization"
                  className="form-control mt-3"
                  placeholder="Enter your specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                id="location"
                className="form-control"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h3 className="mb-4">Social & Professional</h3>
            <div className="mb-3">
              <label className="form-label">Social Links</label>
              <input
                type="url"
                name="linkedin"
                className="form-control mb-2"
                placeholder="LinkedIn URL"
                onChange={handleSocialLinksChange}
              />
              <input
                type="url"
                name="github"
                className="form-control mb-2"
                placeholder="GitHub URL"
                onChange={handleSocialLinksChange}
              />
              <input
                type="url"
                name="twitter"
                className="form-control"
                placeholder="Twitter URL"
                onChange={handleSocialLinksChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="resume" className="form-label">
                Upload Resume
              </label>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="resume"
                  onChange={(e) => handleFileChange(e, setResume)}
                />
                <label className="input-group-text" htmlFor="resume">
                  <FaUpload />
                </label>
              </div>
            </div>
          </>
        );

      case 4:
        if (role === "student") {
          return (
            <>
              <h3 className="mb-4">Student Information</h3>
              <div className="mb-3">
                <label htmlFor="enrollmentYear" className="form-label">
                  Enrollment Year
                </label>
                <input
                  type="number"
                  id="enrollmentYear"
                  className="form-control"
                  placeholder="Enter your enrollment year"
                  value={enrollmentYear}
                  onChange={(e) => setEnrollmentYear(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="currentProgram" className="form-label">
                  Current Program
                </label>
                <input
                  type="text"
                  id="currentProgram"
                  className="form-control"
                  placeholder="Enter your current program"
                  value={currentProgram}
                  onChange={(e) => setCurrentProgram(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="expectedGraduationYear" className="form-label">
                  Expected Graduation Year
                </label>
                <input
                  type="number"
                  id="expectedGraduationYear"
                  className="form-control"
                  placeholder="Enter your expected graduation year"
                  value={expectedGraduationYear}
                  onChange={(e) => setExpectedGraduationYear(e.target.value)}
                  required
                />
              </div>
            </>
          );
        } else if (role === "alumni") {
          return (
            <>
              <h3 className="mb-4">Alumni Information</h3>
              <div className="mb-3">
                <label htmlFor="graduationYear" className="form-label">
                  Graduation Year
                </label>
                <input
                  type="number"
                  id="graduationYear"
                  className="form-control"
                  placeholder="Enter your graduation year"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Current Employment</label>
                <input
                  type="text"
                  name="company"
                  className="form-control mb-2"
                  placeholder="Company"
                  onChange={handleCurrentEmploymentChange}
                />
                <input
                  type="text"
                  name="position"
                  className="form-control mb-2"
                  placeholder="Position"
                  onChange={handleCurrentEmploymentChange}
                />
                <input
                  type="text"
                  name="startDate"
                  className="form-control"
                  placeholder="Start Date (YYYY-MM-DD)"
                  onChange={handleCurrentEmploymentChange}
                />
              </div>
            </>
          );
        }
        break;

      case 5:
        return (
          <>
            <h3 className="mb-4">Skills & Interests</h3>

            {/* Skills Section */}
            <div className="mb-3">
              <label htmlFor="skills" className="form-label">
                Skills
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="skills"
                  className="form-control"
                  placeholder="Enter your skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <button className="btn btn-outline-primary" onClick={addSkill}>
                  +
                </button>
              </div>
            </div>

            <div className="mb-3">
              {skillsList.map((skill, index) => (
                <span
                  key={index}
                  className="badge rounded-pill bg-primary me-2 mb-2"
                >
                  {skill}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    onClick={() => removeSkill(skill)}
                    aria-label="Remove skill"
                  />
                </span>
              ))}
            </div>

            <div className="mb-3">
              {skillsList.map((skill, index) => (
                <span
                  key={index}
                  className="badge rounded-pill bg-primary me-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </>
        );

      case 6:
        return (
          <>
            <h3 className="mb-4">Professional Experience</h3>

            {/* Experience Input Section */}
            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="form-control"
                placeholder="Enter company name"
                value={currentExperience.company_name}
                onChange={(e) =>
                  updateCurrentExperience("company_name", e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="companyDuration" className="form-label">
                Company Duration
              </label>
              <input
                type="text"
                id="companyDuration"
                className="form-control"
                placeholder="e.g., Full-time · 4 yrs 10 mos"
                value={currentExperience.duration}
                onChange={(e) =>
                  updateCurrentExperience("duration", e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="companyLogo" className="form-label">
                Company Logo URL
              </label>
              <input
                type="url"
                id="companyLogo"
                className="form-control"
                placeholder="Enter company logo URL"
                value={currentExperience.logo}
                onChange={(e) =>
                  updateCurrentExperience("logo", e.target.value)
                }
              />
            </div>

            <h4 className="mb-3">Designations</h4>
            {currentExperience.designations.map((designation, desIndex) => (
              <div key={desIndex} className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter designation"
                        value={designation.designation}
                        onChange={(e) =>
                          updateDesignation(
                            desIndex,
                            "designation",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Designation Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Oct 2023 to Sep 2024"
                        value={designation.duration}
                        onChange={(e) =>
                          updateDesignation(
                            desIndex,
                            "duration",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter work location"
                      value={designation.location}
                      onChange={(e) =>
                        updateDesignation(desIndex, "location", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Projects</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Describe your projects and achievements"
                      value={designation.projects}
                      onChange={(e) =>
                        updateDesignation(desIndex, "projects", e.target.value)
                      }
                    />
                  </div>

                  {currentExperience.designations.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeDesignation(desIndex)}
                    >
                      Remove Designation
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between mb-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={addDesignation}
              >
                Add Another Designation
              </button>
            </div>

            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={addExperience}
              >
                Add Experience
              </button>
            </div>

            {/* Display added experiences */}
            <div className="mt-4">
              <h4>Added Experiences</h4>
              {experience.map((exp, index) => (
                <div key={index} className="card mb-2">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{exp.company_name}</strong>
                      <span className="text-muted ms-2">({exp.duration})</span>
                      <p className="text-muted mb-0">
                        {exp.designations.map((d) => d.designation).join(", ")}
                      </p>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeExperience(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 7:
        return (
          <>
            <h3 className="mb-4">Project Details</h3>

            {/* Project Input Section */}
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                className="form-control"
                placeholder="Enter project name"
                value={currentProject.project_name}
                onChange={(e) =>
                  updateCurrentProject("project_name", e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="projectDuration" className="form-label">
                Project Duration
              </label>
              <input
                type="text"
                id="projectDuration"
                className="form-control"
                placeholder="e.g., May 2015 - Present"
                value={currentProject.duration}
                onChange={(e) =>
                  updateCurrentProject("duration", e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label">
                Project Description
              </label>
              <textarea
                id="projectDescription"
                className="form-control"
                rows="4"
                placeholder="Provide a detailed description of your project"
                value={currentProject.description}
                onChange={(e) =>
                  updateCurrentProject("description", e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={addProject}
              >
                Add Project
              </button>
            </div>

            {/* Display added projects */}
            <div className="mt-4">
              <h4>Added Projects</h4>
              {projects.map((proj, index) => (
                <div key={index} className="card mb-2">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{proj.project_name}</strong>
                      <span className="text-muted ms-2">({proj.duration})</span>
                      <p className="text-muted mb-0">{proj.description}</p>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeProject(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return loading === true ? (
    <Loader />
  ) : (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white position-relative py-4">
              <button
                className="btn btn-link position-absolute top-0 end-0 p-3"
                onClick={onBackClick}
                style={{ zIndex: 10 }}
              >
                <FaArrowLeft className="text-white" size={20} />
              </button>
              <h2 className="h4 mb-0">User Setup</h2>
              <p className="mb-0 mt-1 text-white-50">Complete your profile</p>
            </div>

            <div className="card-body p-4">
              {step === 1}

              <form onSubmit={handleSubmit}>
                {renderStep()}

                <div className="d-flex justify-content-between mt-4">
                  {step > 1 && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setStep(step - 1)}
                    >
                      Previous
                    </button>
                  )}
                  {step < 7 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setStep(step + 1)}
                    >
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSetup;