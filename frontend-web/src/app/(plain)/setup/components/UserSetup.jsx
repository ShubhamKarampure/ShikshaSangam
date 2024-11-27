import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaUser, FaGraduationCap, FaBookOpen } from "react-icons/fa"; // Import left arrow icon
import SetUpLayout from './SetUpLayout';

function UserSetup({ role: initialRole, onBackClick }) {
  const [role, setRole] = useState(initialRole);
  const [colleges, setColleges] = useState([]);  // State to hold the list of colleges
  const [selectedCollege, setSelectedCollege] = useState(""); // State for selected college
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [department, setDepartment] = useState("");
  
  // New states for file uploads
  const [resume, setResume] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    setColleges(['spce', 'spit']);    
  }, []);

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

  return (
    <SetUpLayout>
      <div className="container mt-4">
        {/* Card with Back Button */}
        <div className="card shadow-lg border-primary">
          <div className="card-header position-relative">
            {/* Back Button */}
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
            {/* Role Selection */}
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
                id="faculty"
                value="faculty"
                checked={role === 'faculty'}
                onChange={() => handleRoleChange('faculty')}
              />
              <label className="form-check-label" htmlFor="faculty">
                <FaBookOpen className="mr-2" /> Faculty
              </label>
            </div>

            {/* Common Fields */}
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

              {/* College Dropdown */}
              <div className="mb-3">
                <label htmlFor="college" className="form-label">Select College</label>
                <select
                  id="college"
                  className="form-control"
                  value={selectedCollege}
                  onChange={handleCollegeChange}
                  required
                >
                  <option value="">Select your college</option>
                  {colleges.map((college, index) => (
                    <option key={index} value={college}>{college}</option>
                  ))}
                </select>
              </div>

              {/* Conditional Fields Based on Role */}
              {role === 'student' && (
                <>
                  <div className="mb-3">
                    <label htmlFor="expectedGraduationYear" className="form-label">Expected Graduation Year</label>
                    <input
                      type="text"
                      id="expectedGraduationYear"
                      className="form-control"
                      placeholder="Enter your expected graduation year"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="currentProgram" className="form-label">Current Program</label>
                    <input
                      type="text"
                      id="currentProgram"
                      className="form-control"
                      placeholder="Enter your current program"
                    />
                  </div>
                </>
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
                    required
                  />
                </div>
              )}
              {role === 'faculty' && (
                <>
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
                  <div className="mb-3">
                    <label htmlFor="position" className="form-label">Position</label>
                    <input
                      type="text"
                      id="position"
                      className="form-control"
                      placeholder="Enter your position"
                    />
                  </div>
                </>
              )}

              {/* Resume Upload */}
              <div className="mb-3">
                <label htmlFor="resume" className="form-label">Upload Resume (PDF)</label>
                <input
                  type="file"
                  id="resume"
                  className="form-control"
                  accept="application/pdf"
                  onChange={handleResumeChange}
                />
              </div>

              {/* Avatar Image Upload */}
              <div className="mb-3">
                <label htmlFor="avatar" className="form-label">Upload Avatar Image</label>
                <input
                  type="file"
                  id="avatar"
                  className="form-control"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <div className="card-footer">
            <button className="btn btn-primary w-100">Complete Setup</button>
          </div>
        </div>
      </div>
    </SetUpLayout>
  );
}

export default UserSetup;
