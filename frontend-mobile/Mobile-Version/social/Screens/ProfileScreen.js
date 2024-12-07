import {processImageUrl} from "../../Utility/urlUtils"


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {  updateUserProfile,getUserProfile } from "../../api/UserProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../../Context/useAuthContext";
import { useProfileContext } from "../../Context/ProfileContext";

const ProfileScreen = () => {
  

  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuthContext(); // Get user data from AuthContext
  const {profile,setProfile ,loading,setLoading} = useProfileContext()
  

  const pickImage = async (type) => {
    if (!isEditing) {
      Alert.alert("Info", "Enable editing mode to change images.");
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need media library permissions to change images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === "avatar" ? [1, 1] : [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedField = type === "avatar" ? "avatar_image" : "banner_image";
      setProfile({ ...profile, [updatedField]: result.assets[0].uri });
    } else {
      Alert.alert("Cancelled", "No image was selected.");
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true); // Start loader during update
  
      const formData = new FormData();
  
      // Add images if they need to be uploaded
      if (profile.avatar_image?.startsWith("file://")) {
        const avatarResponse = await fetch(profile.avatar_image);
        const avatarBlob = await avatarResponse.blob();
        formData.append("avatar_image", {
          uri: profile.avatar_image,
          name: "avatar.jpg",
          type: avatarBlob.type,
        });
      }
  
      if (profile.banner_image?.startsWith("file://")) {
        const bannerResponse = await fetch(profile.banner_image);
        const bannerBlob = await bannerResponse.blob();
        formData.append("banner_image", {
          uri: profile.banner_image,
          name: "banner.jpg",
          type: bannerBlob.type,
        });
      }
  
      // Add other fields
      formData.append("full_name", profile.full_name || "");
      formData.append("bio", profile.bio || "");
      formData.append("contact_number", profile.contact_number || "");
      formData.append("location", profile.location || "");
      formData.append("id", user.profile_id); // Explicitly add user ID
      formData.append("role", user.role); // Explicitly add user role
      formData.append("user", user.id); // Add the user ID if required by the backend
  
      // Convert social_links to JSON string
      formData.append("social_links", JSON.stringify(profile.social_links || {}));
  
      // // Log the FormData content for debugging
      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
  
      // Call the backend API
      const updatedProfile = await updateUserProfile(user.profile_id, formData);
      console.log("Updated profile response:", updatedProfile);
      // Update the state with new data from the backend
      setProfile((prev) => ({
        ...prev,
        avatar_image: processImageUrl(updatedProfile.avatar_image),
        banner_image: processImageUrl(updatedProfile.banner_image),
      }));
  
      Alert.alert("Success", "Profile updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  

  
  
  
  

  

  const renderTextInput = (key, label) => (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={profile[key]}
          onChangeText={(text) => setProfile({ ...profile, [key]: text })}
        />
      ) : (
        <Text style={styles.infoText}>{profile[key] || "N/A"}</Text>
      )}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Banner Image */}
      <TouchableOpacity onPress={() => pickImage("banner")}>
      <Image
  source={{ uri: profile.banner_image || "https://via.placeholder.com/300" }}
  style={styles.bannerImage}
/>
      </TouchableOpacity>

      {/* Profile Picture */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => pickImage("avatar")}>
          <Image
            source={{ uri: profile.avatar_image || "https://via.placeholder.com/100" }}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{profile?.full_name || "N/A"}</Text>
      </View>

      {/* Editable Sections */}
      {renderTextInput("bio", "Bio")}
      {renderTextInput("contact_number", "Contact Number")}
      {renderTextInput("location", "Location")}
      <View style={styles.section}>
        <Text style={styles.label}>Social Links</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={profile?.social_links?.facebook || ""}
            onChangeText={(text) =>
              setProfile({
                ...profile,
                social_links: { ...profile.social_links, facebook: text },
              })
            }
            placeholder="Facebook Link"
          />
        ) : (
          <Text style={styles.infoText}>
            {profile?.social_links?.facebook || "No social links provided"}
          </Text>
        )}
      </View>

      {/* Edit/Save Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={isEditing ? "Save Changes" : "Edit Profile"}
          onPress={isEditing ? handleUpdate : () => setIsEditing(true)}
          color={isEditing ? "#28a745" : "#007bff"}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 10,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  section: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    alignItems: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;



// useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem("_SS_AUTH_KEY_");
//         if (!storedUser) throw new Error("User not found");
    
//         const parsedUser = JSON.parse(storedUser);
//         const profileDetails = await getUserProfile(parsedUser.profile_id);
//              // Process image URLs before setting state
//       setProfileData({
//         ...profileDetails,
//         avatar_image: processImageUrl(profileDetails.avatar_image),
//         banner_image: processImageUrl(profileDetails.banner_image),
//       });
//         setUserId(parsedUser.profile_id); // Store id
//         setUserRole(parsedUser.role);     // Store role
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         Alert.alert("Error", "Failed to fetch profile data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);