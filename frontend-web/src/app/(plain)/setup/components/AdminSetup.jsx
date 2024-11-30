import React, { useState } from "react";
import { FaArrowLeft, FaUser, FaBuilding } from "react-icons/fa";
import { useAuthContext } from "@/context/useAuthContext";
import { useNotificationContext } from "@/context/useNotificationContext";
import { useProfileContext } from "@/context/useProfileContext";
import { createUserProfile } from "@/api/profile";
import CollegeSetup from "./CollegeSetup";

export default function AdminSetup({ onBackClick }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotificationContext();
  const { user } = useAuthContext();
  const { saveProfileData, saveProfileStatus } = useProfileContext();
  const [fullName, setFullName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [profileCreated, setProfileCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const data = {
      user: user.id,
      full_name: fullName,
      phone_number: contactPhone,
      role:'college_admin',
    };
    // Loop through data and append to formData
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    try {
      setLoading(true);
      const response = await createUserProfile(formData);
      setLoading(false);
      console.log(response);

      showNotification({
        message: "Admin profile created successfully.",
        variant: "success",
      });

      saveProfileStatus("true");
      saveProfileData(response);

      setStep(2);
    } catch (error) {
      setLoading(false);
      console.error("Error creating profile:", error);
      showNotification({
        message: "Error creating admin profile.",
        variant: "error",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSubmit}>
            <h3 className="mb-4">Admin Information</h3>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactPhone" className="form-label">
                Contact Phone
              </label>
              <input
                type="tel"
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Enter contact phone number"
                className="form-control"
                required
              />
            </div>
            <div className="d-grid gap-2 mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Complete Admin Setup"}
              </button>
            </div>
          </form>
        );
      case 2:
       return <CollegeSetup/>
      default:
        return null;
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg border-0">
                {step === 1 && (
              <div className="card-header bg-primary text-white position-relative py-4">
                  <button
                    className="btn btn-link position-absolute top-0 end-0 p-3"
                    onClick={onBackClick}
                    style={{ zIndex: 10 }}
                  >
                    <FaArrowLeft className="text-white" size={20} />
                  </button>
                <h2 className="h4 mb-0">Admin Setup</h2>
                <p className="mb-0 mt-1 text-white-50">
                  Complete your college admin profile
                </p>
              </div>
              )}

              {step === 2 && (
              <div className="card-header bg-primary text-white position-relative py-4">
                  <button
                    className="btn btn-link position-absolute top-0 end-0 p-3"
                    onClick={onBackClick}
                    style={{ zIndex: 10 }}
                  >
                    <FaArrowLeft className="text-white" size={20} />
                  </button>
                <h2 className="h4 mb-0"> College Portal Setup</h2>
                <p className="mb-0 mt-1 text-white-50">
                Create College Portal.
                </p>
              </div>
              )}
              

              <div className="card-body p-4">
                <div className="btn-group w-100 mb-4" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="setupStep"
                    id="adminInfo"
                    checked={step === 1}
                    onChange={() => setStep(1)}
                    disabled={profileCreated}
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="adminInfo"
                  >
                    <FaUser className="me-2" /> Admin Info
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="setupStep"
                    id="collegeInfo"
                    checked={step === 2}
                    onChange={() => setStep(2)}
                    disabled={!profileCreated}
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="collegeInfo"
                  >
                    <FaBuilding className="me-2" /> College Info
                  </label>
                </div>

                <>
                  {renderStep()}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
