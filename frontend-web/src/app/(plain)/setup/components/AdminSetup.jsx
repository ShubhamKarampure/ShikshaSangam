import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import the left arrow icon from react-icons
import SetUpLayout from "./SetUpLayout";
import { collegeAdminProfile } from "@/api/setup";
import { useAuthContext } from "@/context/useAuthContext";

export default function AdminSetup({ onBackClick }) {
  const { user } = useAuthContext();
  const [fullName, setFullName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    const data = {
      user : user.id,
      full_name: fullName,
      phone_number: contactPhone,
    };
    console.log(data)
    try {
      // Call the API to save the data
      const response = await collegeAdminProfile(data);
      // Handle success (you can show a success message or redirect)
      console.log('Profile created successfully:', response);
    } catch (error) {
      // Handle error (you can show an error message)
      console.error('Error creating profile:', error);
    }
  };

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
          <form onSubmit={handleSubmit}> {/* Added form element */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="form-control border-primary"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contactPhone" className="form-label">Contact Phone</label>
              <input
                type="tel"
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Enter contact phone number"
                className="form-control border-primary"
              />
            </div>            
            {/* Submit button */}
            <div className="card-footer">
              <button type="submit" className="btn btn-primary w-100">Complete Admin Setup</button>
            </div>
          </form>
        </div>
      </div>
    </SetUpLayout>
  );
}
