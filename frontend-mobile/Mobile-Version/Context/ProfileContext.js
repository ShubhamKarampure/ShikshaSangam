import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile } from "../api/UserProfile";
import { processImageUrl } from "../Utility/urlUtils"

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
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
      try {
        const storedUser = await AsyncStorage.getItem("_SS_AUTH_KEY_");
        if (!storedUser) throw new Error("User not found");
        
        const parsedUser = JSON.parse(storedUser);
        const profileDetails = await getUserProfile(parsedUser.profile_id);
        setProfile({
          ...profileDetails,
          avatar_image: processImageUrl(profileDetails.avatar_image),
          banner_image: processImageUrl(profileDetails.banner_image),
        });
        console.log(profile);
        
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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