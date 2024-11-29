import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaUser,
  FaGraduationCap,
  FaBookOpen,
  FaUpload,
} from "react-icons/fa";
import { useAuthContext } from "@/context/useAuthContext";
import { useNotificationContext } from "@/context/useNotificationContext";
import { useProfileContext } from "@/context/useProfileContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createUserProfile,
  createStudentProfile,
  createAlumnusProfile,
  createCollegeStaffProfile,
} from "@/api/profile";
import { updateUser } from "@/api/users";
import { getColleges } from "@/api/college";
import { OnboardingProfileLayout } from "@/layouts/ProfileLayout";
import Loader from "@/components/layout/loadingAnimation";

function UserSetup({ role: initialRole, onBackClick }) {
  const { user } = useAuthContext();
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
  const [preferences, setPreferences] = useState({});
  const [enrollmentYear, setEnrollmentYear] = useState("2024");
  const [currentProgram, setCurrentProgram] = useState("");
  const [expectedGraduationYear, setExpectedGraduationYear] = useState("2028");
  const [graduationYear, setGraduationYear] = useState("2020");
  const [currentEmployment, setCurrentEmployment] = useState({});
  const [careerPath, setCareerPath] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isCustomSpecialization, setIsCustomSpecialization] = useState(false);

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
    setSelectedCollege(e.target.value);
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
    setloading(true);
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
        preferences: JSON.stringify(preferences),
        role:role
      };

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
          career_path: careerPath,
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
      for (let [key, value] of formData.entries()) {
  console.log(key, value);
}


      // Send the form data to create a user profile
      const userprofile = await createUserProfile(formData);

      showNotification({
        message: "User Profile created successfully!",
        variant: "success",
      });

      saveProfileStatus("true");
      saveProfileData(userprofile);

      redirectUser();
    } catch (error) {
      console.error("Error creating profile:", error);
      showNotification({
        message: "There was an error creating your profile.",
        variant: "danger",
      });
    }
    setloading(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="mb-4">Personal Information</h3>
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

              {/* If 'Other' is selected, show the custom specialization input */}
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
              <div className="mb-3">
                <label htmlFor="careerPath" className="form-label">
                  Career Path
                </label>
                <textarea
                  id="careerPath"
                  className="form-control"
                  placeholder="Describe your career path"
                  value={careerPath}
                  onChange={(e) => setCareerPath(e.target.value)}
                />
              </div>
            </>
          );
        } else if (role === "college_staff") {
          return (
            <>
              <h3 className="mb-4">Faculty Information</h3>
              <div className="mb-3">
                <label htmlFor="position" className="form-label">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  className="form-control"
                  placeholder="Enter your position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  className="form-control"
                  placeholder="Enter your department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.v)}
                />
              </div>
            </>
          );
        }
        return null;
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
                  {step < 4 ? (
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
