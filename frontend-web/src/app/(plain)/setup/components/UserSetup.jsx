import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaUser, FaGraduationCap, FaBookOpen } from "react-icons/fa";
import SetUpLayout from '../SetupLayout';
import { useAuthContext } from "@/context/useAuthContext";
import { useNotificationContext } from "@/context/useNotificationContext";
import { useProfileContext } from "@/context/useProfileContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createUserProfile, createStudentProfile, createAlumnusProfile, createCollegeStaffProfile } from '@/api/profile';
import { updateUser } from "@/api/users";
import { getColleges } from "@/api/college";

function UserSetup({ role: initialRole, onBackClick }) {
  const { user } = useAuthContext();
  const { saveProfileStatus, saveProfileData } = useProfileContext();
  const { showNotification } = useNotificationContext();
  
  const [role, setRole] = useState(initialRole);
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [fullName, setFullName] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [department, setDepartment] = useState("");
  const [program, setProgram] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState("");
  const [resume, setResume] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('full_name', fullName);
      if (avatar) {
        formData.append('avatar_image', avatar);
      }
      if (resume) {
        formData.append('resume', resume);
      }
      formData.append('user', user.id);
      formData.append('college', selectedCollege);

      const userprofile = await createUserProfile(formData);

      let roleProfileData = {};
      if (role === 'student') {
        roleProfileData = {
          profile: userprofile.id,
          enrollment_year: enrollmentYear || null,
          current_program: program || null,
          expected_graduation_year: graduationYear || null,
          specialization: specialization || null,
          is_verified: false,
        };
      } else if (role === 'alumni') {
        roleProfileData = {
          profile: userprofile.id,
          graduation_year: graduationYear,
          current_employment: {},
          career_path: "",
          specialization: specialization,
          is_verified: false,
        };
      } else if (role === 'college_staff') {
        roleProfileData = {
          profile: userprofile.id,
          position: "",
          department: department,
          is_verified: false,
        };
      }

      let response;
      if (role === 'student') {
        response = await createStudentProfile(roleProfileData);
      } else if (role === 'alumni') {
        response = await createAlumnusProfile(roleProfileData);
      } else if (role === 'college_staff') {
        response = await createCollegeStaffProfile(roleProfileData);
      }

      // Update user role
      const response_update_user = await updateUser(user.id, { role: role });

      showNotification({
        message: "Profile created successfully!",
        variant: "success",
      });

      saveProfileStatus("true");
      saveProfileData(response);

      redirectUser();

    } catch (error) {
      console.error('Error creating profile:', error);
      showNotification({
        message: "There was an error creating your profile.",
        variant: "danger",
      });
    }
  };

  return (
    <SetUpLayout>
      <div className="container mt-4">
        <div className="card shadow-lg border-primary">
          <div className="card-header position-relative">
            <button
              className="btn btn-link position-absolute top-0 end-0 p-2"
              onClick={onBackClick}
              style={{ zIndex: 10 }}
            >
              <FaArrowLeft className="text-primary" size={20} />
            </button>
            <h2 className="h5 font-weight-semibold text-primary">User Setup</h2>
            <p className="text-secondary">Complete your profile</p>
          </div>

          <div className="card-body">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="student"
                value="student"
                checked={role === 'student'}
                onChange={() => handleRoleChange('student')}
              />
              <label className="form-check-label" htmlFor="student">
                <FaUser className="mr-2" /> Student
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="alumni"
                value="alumni"
                checked={role === 'alumni'}
                onChange={() => handleRoleChange('alumni')}
              />
              <label className="form-check-label" htmlFor="alumni">
                <FaGraduationCap className="mr-2" /> Alumni
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="college_staff"
                value="college_staff"
                checked={role === 'college_staff'}
                onChange={() => handleRoleChange('college_staff')}
              />
              <label className="form-check-label" htmlFor="college_staff">
                <FaBookOpen className="mr-2" /> Faculty
              </label>
            </div>

            <div className="mt-4">
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="college" className="form-label">Select College</label>
                <select
                  id="college"
                  className="form-control"
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
                <label htmlFor="avatar" className="form-label">Upload Avatar</label>
                <input
                  type="file"
                  className="form-control"
                  id="avatar"
                  onChange={handleAvatarChange}
                />
              </div>

              {role === 'student' && (
                <div className="mb-3">
                  <label htmlFor="enrollmentYear" className="form-label">Enrollment Year</label>
                  <input
                    type="text"
                    id="enrollmentYear"
                    className="form-control"
                    placeholder="Enter your enrollment year"
                    value={enrollmentYear}
                    onChange={(e) => setEnrollmentYear(e.target.value)}
                  />
                </div>
              )}

              {role === 'alumni' && (
                <div className="mb-3">
                  <label htmlFor="graduationYear" className="form-label">Graduation Year</label>
                  <input
                    type="text"
                    id="graduationYear"
                    className="form-control"
                    placeholder="Enter your graduation year"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                  />
                </div>
              )}

              {role === 'college_staff' && (
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">Department</label>
                  <input
                    type="text"
                    id="department"
                    className="form-control"
                    placeholder="Enter your department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              )}

            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </SetUpLayout>
  );
}

export default UserSetup;
