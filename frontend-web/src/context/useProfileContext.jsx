import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "cookies-next";
import { useAuthContext } from "@/context/useAuthContext";
import { API_ROUTES } from "../routes/apiRoute";

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
  const { user } = useAuthContext();  // Getting the user context
  
  // Retrieve authentication status
  const isAuthenticated = () => !!getCookie("_SS_AUTH_KEY_");

  // Retrieve profile setup status and profile data from cookies
  const getProfileStatus = () => getCookie("_PROFILE_SETUP_") === "true";

  const getProfileData = async () => {
    const profileData = getCookie("_PROFILE_DATA_");
    if (profileData && profileData.user == user.id) {
      return JSON.parse(profileData); // Return from cookies if data exists
    } else {
      try {
        const response = await fetch(API_ROUTES.USERPROFILE + user.profile_id, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        
        saveProfileData(data); // Save the fetched profile data to cookies
        setCookie("_PROFILE_SETUP_", "true");
        setIsProfileSetUp(true);
        return data;
      } catch (error) {
        console.error("Error fetching profile data:", error);
        return null; // Return null if an error occurs
      }
    }
  };

  const [profile, setProfile] = useState(null);
  const [isProfileSetUp, setIsProfileSetUp] = useState(getProfileStatus());

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
    if (user && isAuthenticated()) {  // Ensure user is authenticated
      getProfileData();
      if (!isProfileSetUp) {
        navigate("/profile-setup");
      }
    }
  }, [user, isProfileSetUp, navigate]);  // Only run when `user` is available

  useEffect(() => {
    const fetchProfileData = async () => {
      const profile = await getProfileData();
      if (profile) {
        setProfile(profile); // Set profile in state if fetched
      }
    };

    if (user && !profile) {  // Fetch profile only if user exists
      fetchProfileData(); // Fetch profile on mount if not already set
    }
  }, [user, profile]);  // Trigger this effect when `user` changes

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
