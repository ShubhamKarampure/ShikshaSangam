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
  const { user } = useAuthContext();

  // Retrieve profile setup status
  const getProfileStatus = () => getCookie("_PROFILE_SETUP_") === "true";

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

  // Fetch profile data
  const getProfileData = async () => {
    const profileData = getCookie("_PROFILE_DATA_");
    if (profileData && JSON.parse(profileData)?.user === user?.id) {
      return JSON.parse(profileData); // Return from cookies if data exists
    }

    if (user?.profile_id) {
      try {
        const response = await fetch(API_ROUTES.USERPROFILE + user.profile_id, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        saveProfileData(data); // Save profile data
        saveProfileStatus(true); // Mark profile as setup
        return data;
      } catch (error) {
        console.error("Error fetching profile data:", error);
        return null;
      }
    }
    return null;
  };

  // Redirect logic
  useEffect(() => {
    const checkAndFetchProfile = async () => {
      if (user && isAuthenticated()) {
        const data = await getProfileData();
        if (!data && !getProfileStatus()) {
          // Redirect to profile-setup only if no profile data and not set up
          navigate("/profile-setup");
        }
      }
    };

    checkAndFetchProfile();
  }, [user]); // Run when `user` changes

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user && !profile) {
        const data = await getProfileData();
        if (data) {
          setProfile(data); // Update state with profile data
        }
      }
    };

    fetchProfileData();
  }, [user, profile]); // Trigger when `user` or `profile` changes

  const isAuthenticated = () => !!getCookie("_SS_AUTH_KEY_");

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
