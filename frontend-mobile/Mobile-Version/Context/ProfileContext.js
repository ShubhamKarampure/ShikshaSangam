import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile } from "../api/UserProfile";
import { processImageUrl } from "../Utility/urlUtils"
import { useAuthContext } from "./useAuthContext";
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useAuthContext(); // Get the current user from AuthContext
    const [profile, setProfile] = useState({
        full_name: "",
        bio: "",
        avatar_image: null,
        banner_image: null,
        contact_number: "",
        location: "",
        social_links: {},
        id: "",
      });
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null); // Reset profile when user is null
        setLoading(false);
        return;
      }
      setLoading(true)
      try {
        

        const profileDetails = await getUserProfile(user.profile_id);
        setProfile({
          ...profileDetails,
          avatar_image: processImageUrl(profileDetails.avatar_image),
          banner_image: processImageUrl(profileDetails.banner_image),
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      setLoading(true);
      fetchProfile();
    } else {
      // Reset profile data if no user is logged in
      setProfile({
        full_name: "",
        bio: "",
        avatar_image: null,
        banner_image: null,
        contact_number: "",
        location: "",
        social_links: {},
        id: "",
      });
      setLoading(false);
    }
  }, [user]); // Re-fetch when `user` changes

  const updateProfile = (updatedProfile) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedProfile,
    }));
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile: updateProfile, loading,setLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);