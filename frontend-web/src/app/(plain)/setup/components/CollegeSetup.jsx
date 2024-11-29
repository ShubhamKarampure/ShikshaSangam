import React, { useState } from "react";
import { useNotificationContext } from "@/context/useNotificationContext";
import { useProfileContext } from "@/context/useProfileContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createCollege } from "@/api/college";
import { updateCollegeAdminProfile } from "@/api/profile";
import { updateUser } from "@/api/users";
import { useAuthContext } from "@/context/useAuthContext";

export default function CollegeSetup() {
  const { saveProfileStatus, saveProfileData, profile } = useProfileContext();
  const { showNotification } = useNotificationContext();
  const { user } = useAuthContext();
  // State to store the form data
  const [collegeName, setCollegeName] = useState("");
  const [collegeCode, setCollegeCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // For handling submission state
  const [errorMessage, setErrorMessage] = useState(""); // To show errors
  const [searchParams] = useSearchParams();

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
    "GOVT. POLYTECHNIC COLLEGE, SAWAIMADHOPUR",
  ];

  const redirectUser = () => {
    const redirectLink = searchParams.get("redirectTo");
    if (redirectLink) {
      navigate(redirectLink);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('here college');

    // Check if required fields are filled
    if (
      !collegeName ||
      !collegeCode ||
      !contactEmail ||
      !contactPhone ||
      !address
    ) {
      setErrorMessage("Please fill all the required fields.");
      return;
    }

    // If collegeName is "Other", ensure the user filled in the "Other" input field
    if (
      collegeName === "Other" &&
      !document.getElementById("collegeNameOther").value
    ) {
      setErrorMessage("Please enter a custom college name.");
      return;
    }

    const data = {
      college_name:
        collegeName === "Other"
          ? document.getElementById("collegeNameOther").value
          : collegeName,
      college_code: collegeCode,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      address: address,
    };
    console.log(data);
    
    setIsSubmitting(true); // Set submitting to true

    try {
      // Call the API to create the college
      console.log(profile);
      const response_college_create = await createCollege(data);
      console.log("College created:", response_college_create);
      const response_update_admin = await updateCollegeAdminProfile(
        profile.id,
        { college: response_college_create.id }
      );
      console.log("Added college in admin:", response_update_admin);
      const response_update_user = await updateUser(user.id, {
        role: "college_admin",
      });
      console.log("Updated User Profile", response_update_user);

      showNotification({
        message: "College created successfully!",
        variant: "success",
      });

      saveProfileStatus("true");
      saveProfileData(response_update_admin); // Save profile data to context
      navigate("/feed/home");
      redirectUser();
      // Optionally redirect or show success message after successful creation
    } catch (error) {
      console.error("Error creating college:", error);

      showNotification({
        message: "Error creating college.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="card border-primary shadow-lg">
      <div className="card-header position-relative">
        <h2 className="h5 font-weight-semibold text-primary">
          College Portal Setup
        </h2>
        <p className="text-secondary">Create College Portal.</p>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="collegeName" className="form-label">
              College Name
            </label>
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
            <label htmlFor="collegeCode" className="form-label">
              College Setup AISHE Code
            </label>
            <input
              type="text"
              id="collegeCode"
              placeholder="Enter your college AISHE code"
              className="form-control border-primary"
              value={collegeCode}
              onChange={(e) => setCollegeCode(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactEmail" className="form-label">
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              placeholder="Enter contact email address"
              className="form-control border-primary"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactPhone" className="form-label">
              Contact Phone
            </label>
            <input
              type="tel"
              id="contactPhone"
              placeholder="Enter contact phone number"
              className="form-control border-primary"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="address"
              placeholder="Enter the address"
              className="form-control border-primary"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <div className="card-footer">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Complete Admin Setup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
