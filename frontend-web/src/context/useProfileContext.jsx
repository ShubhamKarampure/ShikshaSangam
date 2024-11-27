import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "cookies-next";

const ProfileContext = createContext(undefined);

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const navigate = useNavigate();

  // Retrieve authentication status
  const isAuthenticated = () => !!getCookie("_SS_AUTH_KEY_");

  // Retrieve profile setup status and profile data from cookies
  const getProfileStatus = () => getCookie("_PROFILE_SETUP_") === "true";
  const getProfileData = () => {
    const profileData = getCookie("_PROFILE_DATA_");
    return profileData ? JSON.parse(profileData) : null;
  };

  const [isProfileSetUp, setIsProfileSetUp] = useState(getProfileStatus());
  const [profile, setProfile] = useState(getProfileData());

  // Save profile setup status
  const saveProfileStatus = (status) => {
    setCookie("_PROFILE_SETUP_", status.toString());
    setIsProfileSetUp(status);
  };

  // Save profile data
  const saveProfileData = (data) => {
    setCookie("_PROFILE_DATA_", JSON.stringify(data));
    setProfile(data);
  };

  // Redirect logic
  useEffect(() => {
    if (isAuthenticated()) {
      if (!isProfileSetUp) {
        navigate("/profile-setup");
      }
    } 
  }, [isProfileSetUp, navigate]);

  return (
    <ProfileContext.Provider
      value={{
        isProfileSetUp,
        profile,
        saveProfileStatus,
        saveProfileData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
