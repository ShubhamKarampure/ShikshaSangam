import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import the left arrow icon from react-icons
import SetUpLayout from "./SetUpLayout";

export default function AdminSetup({ onBackClick }) {
  const [collegeName, setCollegeName] = useState("");
  const collegeOptions = [
    "GOVT. POLYTECHNIC COLLEGE, AJMER",
    "GOVT. POLYTECHNIC COLLEGE, ALWAR",
    "GOVT. POLYTECHNIC COLLEGE, BANSWARA",
    "GOVT. POLYTECHNIC COLLEGE, BARMER",
    "SHRI GOKUL VERMA GOVT. POLYTECHNIC COLLEGE, BHARATPUR",
    "GOVT. POLYTECHNIC COLLEGE, BIKANER",
    "GOVT. POLYTECHNIC COLLEGE, CHITTORGARH",
    "GOVT. RAM CHANDRA KHAITAN POLYTECHNIC COLLEGE, JAIPUR",
    "GOVT. POLYTECHNIC COLLEGE, JODHPUR",
    "GOVT. POLYTECHNIC COLLEGE, KOTA",
    "GOVT. POLYTECHNIC COLLEGE, PALI",
    "GOVT. POLYTECHNIC COLLEGE, SAWAIMADHOPUR"
  ];

  return (
    <SetUpLayout>
      <div className="card border-primary shadow-lg">
        {/* Header with the back button */}
        <div className="card-header position-relative">
          <button
            className="btn btn-link position-absolute top-0 end-0 p-2"
            onClick={onBackClick}
            style={{ zIndex: 10 }}
          >
            <FaArrowLeft className="text-primary" size={20} />
          </button>
          <h2 className="h5 font-weight-semibold text-primary">Admin Setup</h2>
          <p className="text-secondary">Complete your college admin profile</p>
        </div>
        
        {/* Card Body */}
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="collegeName" className="form-label">College Name</label>
            <select
              id="collegeName"
              className="form-control border-primary"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
            >
              <option value="">Select a college</option>
              {collegeOptions.map((college, index) => (
                <option key={index} value={college}>
                  {college}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            {collegeName === "Other" && (
              <input
                type="text"
                id="collegeNameOther"
                placeholder="Enter your college name"
                className="form-control border-primary mt-2"
              />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="collegeCode" className="form-label">College AISHE Code</label>
            <input
              type="text"
              id="collegeCode"
              placeholder="Enter your college AISHE code"
              className="form-control border-primary"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactEmail" className="form-label">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              placeholder="Enter contact email address"
              className="form-control border-primary"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactPhone" className="form-label">Contact Phone</label>
            <input
              type="tel"
              id="contactPhone"
              placeholder="Enter contact phone number"
              className="form-control border-primary"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              id="address"
              placeholder="Enter the address"
              className="form-control border-primary"
            />
          </div>
        </div>
        
        {/* Card Footer */}
        <div className="card-footer">
          <button className="btn btn-primary w-100">Complete Admin Setup</button>
        </div>
      </div>
    </SetUpLayout>
  );
}
