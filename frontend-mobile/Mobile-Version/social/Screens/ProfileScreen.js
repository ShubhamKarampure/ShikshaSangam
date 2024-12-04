
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, TextInput, Button } from 'react-native';
// import { useAuthContext } from '../../Context/useAuthContext';
// const ProfileScreen = () => {
//   // Dummy profile data
//   const initialProfileData = {
//     name: 'John Doe',
//     tagline: 'Software Developer | Tech Enthusiast',
//     profilePicture: 'https://via.placeholder.com/150', // Add a real URL for the profile image
//     posts: 120,
//     followers: 350,
//     following: 180,
//     email: 'johndoe@example.com',
//     phone: '+1 123 456 7890',
//     address: '123 Main St, Springfield, IL',
//     bio: 'Passionate about coding, solving problems, and continuous learning.',
//     skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
//   };

//   const [profileData, setProfileData] = useState(initialProfileData);
//   const [isEditing, setIsEditing] = useState(false);
//   const [newSkill, setNewSkill] = useState('');
//   const {user,isAuthenticated} = useAuthContext();

  
//   // Function to handle adding a new skill
//   const handleAddSkill = () => {
//     if (newSkill) {
//       setProfileData(prevData => ({
//         ...prevData,
//         skills: [...prevData.skills, newSkill],
//       }));
//       setNewSkill('');
//     }
//   };

//   // Function to toggle the editing state for personal information
//   const handleEditToggle = () => {
//     setIsEditing(prev => !prev);
//   };
//   if (!isAuthenticated) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>You are not logged in.</Text>
//       </View>
//     );
//   }
//   return (
//     <ScrollView style={styles.container}>
//       {/* Profile Header */}
//       <View style={styles.header}>
//         <Image
//           source={{ uri: profileData.profilePicture }}
//           style={styles.profilePicture}
//         />
//         <View style={styles.nameContainer}>
//           <Text style={styles.name}>{user.username}</Text>
//           <Text style={styles.tagline}>{user.role}</Text>
//         </View>
//       </View>

//       {/* Profile Statistics Section */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>Profile Statistics</Text>
//         <View style={styles.statsContainer}>
//           <View style={styles.statItem}>
//             <Text style={styles.statValue}>{profileData.posts}</Text>
//             <Text style={styles.statLabel}>Posts</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statValue}>{profileData.followers}</Text>
//             <Text style={styles.statLabel}>Followers</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statValue}>{profileData.following}</Text>
//             <Text style={styles.statLabel}>Following</Text>
//           </View>
//         </View>
//       </View>

//       {/* Personal Information Section */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>Personal Information</Text>
//         {isEditing ? (
//           // If editing, display input fields
//           <>
//             <View style={styles.infoItem}>
//               <TextInput
//                 style={styles.input}
//                 value={profileData.email}
//                 onChangeText={(text) =>
//                   setProfileData({ ...profileData, email: text })
//                 }
//               />
//             </View>
//             <View style={styles.infoItem}>
//               <TextInput
//                 style={styles.input}
//                 value={profileData.phone}
//                 onChangeText={(text) =>
//                   setProfileData({ ...profileData, phone: text })
//                 }
//               />
//             </View>
//             <View style={styles.infoItem}>
//               <TextInput
//                 style={styles.input}
//                 value={profileData.address}
//                 onChangeText={(text) =>
//                   setProfileData({ ...profileData, address: text })
//                 }
//               />
//             </View>
//             <View style={styles.infoItem}>
//               <TextInput
//                 style={styles.input}
//                 value={profileData.bio}
//                 onChangeText={(text) =>
//                   setProfileData({ ...profileData, bio: text })
//                 }
//               />
//             </View>
//           </>
//         ) : (
//           // If not editing, display text
//           <>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoText}>Email: {user.email}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoText}>Phone: {profileData.phone}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoText}>
//                 Address: {profileData.address}
//               </Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoText}>Bio: {profileData.bio}</Text>
//             </View>
//           </>
//         )}
//         <Button
//           title={isEditing ? "Save" : "Edit"}
//           onPress={handleEditToggle}
//           color="#0375ad"
//         />
//       </View>

//       {/* Skills Section */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>Skills</Text>
//         {profileData.skills.map((skill, index) => (
//           <Text key={index} style={styles.skillItem}>
//             {skill}
//           </Text>
//         ))}
//         <View style={styles.addSkillContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Add a new skill"
//             value={newSkill}
//             onChangeText={setNewSkill}
//           />
//           <Button title="Add" onPress={handleAddSkill} color="#0375ad"/>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212', // Dark background
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 25,
//     backgroundColor: '#1e1e1e',
//     borderRadius: 8,
//     padding: 10,
//   },
//   profilePicture: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     marginRight: 15,
//   },
//   nameContainer: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   tagline: {
//     fontSize: 16,
//     color: '#aaa',
//   },
//   sectionContainer: {
//     backgroundColor: '#1e1e1e', // Dark background for each section
//     borderRadius: 8,
//     marginBottom: 25,
//     padding: 15,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 10,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   statItem: {
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   statValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#bbb',
//   },
//   infoItem: {
//     marginBottom: 12,
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#1DA1F2',
//   },
//   input: {
//     backgroundColor: '#fff',
//     color: '#2a2a2a',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   addSkillContainer: {
//     marginTop: 15,
//   },
//   skillItem: {
//     fontSize: 16,
//     color: '#fff',
//     marginBottom: 8,
//     paddingVertical: 4,
//     borderBottomWidth: 1,
//     borderBottomColor: '#444',
//   },
// });

// export default ProfileScreen;
 
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TextInput,
//   Button,
//   Alert,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { getUserProfile, updateUserProfile } from "../../api/UserProfile";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useAuthContext } from "../../Context/useAuthContext";

// const ProfileScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [profileData, setProfileData] = useState({
//     bio: '',
//     avatar_image: null,
//     banner_image: null,
//     full_name: '',
//     contact_number: '',
//     location: '',
//     social_links: {},
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuthContext();  // Get user data from AuthContext

//   // Fetch user profile on initial load
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem("_SS_AUTH_KEY_");
//         if (!storedUser) throw new Error("User data not found");

//         const parsedUser = JSON.parse(storedUser);
//         console.log("Parsed User Profile ID:", parsedUser.profile_id);

//         setUserData(parsedUser);

//         // Fetch profile details using the profile_id from user data
//         const profileDetails = await getUserProfile(parsedUser.profile_id);
//         setProfileData(profileDetails);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         Alert.alert("Error", "Failed to fetch profile data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   // Handle image update (avatar or banner)
//   const handleImageUpdate = async (type) => {
//     try {
//       const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!permissionResult.granted) {
//         Alert.alert("Permission Denied", "Gallery access is required to update images.");
//         return;
//       }

//       const pickerResult = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 1,
//       });

//       if (!pickerResult.canceled) {
//         const newImageUri = pickerResult.assets[0].uri;
//         setProfileData((prev) => ({
//           ...prev,
//           [type]: newImageUri,
//         }));
//       }
//     } catch (error) {
//       console.error("Error updating image:", error);
//       Alert.alert("Error", "Failed to update the image. Please try again.");
//     }
//   };

//   // Handle profile update
//   const handleUpdate = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('bio', profileData.bio);

//       if (profileData.avatar_image) {
//         formData.append('avatar_image', {
//           uri: profileData.avatar_image,
//           name: 'avatar_image.jpg',
//           type: 'image/jpeg',
//         });
//       }

//       if (profileData.banner_image) {
//         formData.append('banner_image', {
//           uri: profileData.banner_image,
//           name: 'banner_image.jpg',
//           type: 'image/jpeg',
//         });
//       }

//       // Check if user and profile_id exist, then proceed with the update
//       if (user && user.profile_id) {
//         await updateUserProfile(user.profile_id, formData);  // Use profile_id for the update
//         Alert.alert("Success", "Profile updated successfully!");
//       } else {
//         Alert.alert("Error", "Profile ID not found.");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       Alert.alert("Error", "Failed to update profile.");
//     }
//   };

//   // Show loading indicator while fetching data
//   if (loading) {
//     return <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* Banner Image */}
//       <TouchableOpacity onPress={() => handleImageUpdate("banner_image")}>
//         <Image
//           source={{ uri: profileData?.banner_image || "https://via.placeholder.com/300" }}
//           style={styles.bannerImage}
//         />
//       </TouchableOpacity>

//       {/* Profile Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => handleImageUpdate("avatar_image")}>
//           <Image
//             source={{ uri: profileData?.avatar_image || "https://via.placeholder.com/100" }}
//             style={styles.profilePicture}
//           />
//         </TouchableOpacity>
//         <Text style={styles.name}>{userData?.username || "N/A"}</Text>
//         <Text style={styles.role}>{userData?.role || "N/A"}</Text>
//         <Text style={styles.status}>
//           {userData?.status === "online" ? "🟢 Online" : "🔴 Offline"}
//         </Text>
//       </View>

//       {/* Personal Information Section */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>Personal Information</Text>
//         {isEditing ? (
//           <TextInput
//             style={styles.input}
//             value={profileData?.bio}
//             onChangeText={(text) => setProfileData({ ...profileData, bio: text })}
//           />
//         ) : (
//           <Text style={styles.infoText}>Bio: {profileData?.bio || "N/A"}</Text>
//         )}
//       </View>

//       {/* Save or Edit Button */}
//       <View style={styles.buttonContainer}>
//         {isEditing ? (
//           <Button title="Save Changes" onPress={handleUpdate} />
//         ) : (
//           <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1e1e1e",
//   },
//   bannerImage: {
//     width: "100%",
//     height: 150,
//   },
//   header: {
//     alignItems: "center",
//     padding: 10,
//   },
//   profilePicture: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   role: {
//     fontSize: 16,
//     color: "#c0c0c0",
//   },
//   status: {
//     fontSize: 14,
//     color: "green",
//   },
//   sectionContainer: {
//     margin: 10,
//     padding: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     color: "#fff",
//     marginBottom: 5,
//   },
//   infoText: {
//     fontSize: 14,
//     color: "#c0c0c0",
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   buttonContainer: {
//     margin: 20,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default ProfileScreen;


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
import { getUserProfile, updateUserProfile } from "../../api/UserProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../../Context/useAuthContext";

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState({
    full_name: "",
    bio: "",
    avatar_image: null,
    banner_image: null,
    contact_number: "",
    location: "",
    social_links: {},
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext(); // Get user data from AuthContext

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("_SS_AUTH_KEY_");
        if (!storedUser) throw new Error("User not found");

        const parsedUser = JSON.parse(storedUser);
        const profileDetails = await getUserProfile(parsedUser.profile_id);

        setProfileData(profileDetails);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
      setProfileData({ ...profileData, [updatedField]: result.assets[0].uri });
    } else {
      Alert.alert("Cancelled", "No image was selected.");
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true); // Start loader during update
  
      const updatedData = { ...profileData };
  
      // Process avatar image
      if (profileData.avatar_image && profileData.avatar_image.startsWith("file://")) {
        const response = await fetch(profileData.avatar_image);
        const blob = await response.blob();
        updatedData.avatar_image = new File([blob], "avatar.jpg", { type: blob.type });
      }
  
      // Process banner image
      if (profileData.banner_image && profileData.banner_image.startsWith("file://")) {
        const response = await fetch(profileData.banner_image);
        const blob = await response.blob();
        updatedData.banner_image = new File([blob], "banner.jpg", { type: blob.type });
      }
  
      // Call backend API with the updated data
      await updateUserProfile(user.profile_id, updatedData);
  
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
          value={profileData[key]}
          onChangeText={(text) => setProfileData({ ...profileData, [key]: text })}
        />
      ) : (
        <Text style={styles.infoText}>{profileData[key] || "N/A"}</Text>
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
          source={{ uri: profileData?.banner_image || "https://via.placeholder.com/300" }}
          style={styles.bannerImage}
        />
      </TouchableOpacity>

      {/* Profile Picture */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => pickImage("avatar")}>
          <Image
            source={{ uri: profileData?.avatar_image || "https://via.placeholder.com/100" }}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{profileData?.full_name || "N/A"}</Text>
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
            value={profileData?.social_links?.facebook || ""}
            onChangeText={(text) =>
              setProfileData({
                ...profileData,
                social_links: { ...profileData.social_links, facebook: text },
              })
            }
            placeholder="Facebook Link"
          />
        ) : (
          <Text style={styles.infoText}>
            {profileData?.social_links?.facebook || "No social links provided"}
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
