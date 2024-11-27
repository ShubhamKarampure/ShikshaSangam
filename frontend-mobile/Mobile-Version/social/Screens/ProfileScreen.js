import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Button } from 'react-native';

const ProfileScreen = () => {
  // Dummy profile data
  const initialProfileData = {
    name: 'John Doe',
    tagline: 'Software Developer | Tech Enthusiast',
    profilePicture: 'https://via.placeholder.com/150', // Add a real URL for the profile image
    posts: 120,
    followers: 350,
    following: 180,
    email: 'johndoe@example.com',
    phone: '+1 123 456 7890',
    address: '123 Main St, Springfield, IL',
    bio: 'Passionate about coding, solving problems, and continuous learning.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  
  // Function to handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill) {
      setProfileData(prevData => ({
        ...prevData,
        skills: [...prevData.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  // Function to toggle the editing state for personal information
  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={{ uri: profileData.profilePicture }} style={styles.profilePicture} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.tagline}>{profileData.tagline}</Text>
        </View>
      </View>

      {/* Profile Statistics Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Profile Statistics</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Personal Information Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {isEditing ? (
          // If editing, display input fields
          <>
            <View style={styles.infoItem}>
              <TextInput
                style={styles.input}
                value={profileData.email}
                onChangeText={(text) => setProfileData({ ...profileData, email: text })}
              />
            </View>
            <View style={styles.infoItem}>
              <TextInput
                style={styles.input}
                value={profileData.phone}
                onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
              />
            </View>
            <View style={styles.infoItem}>
              <TextInput
                style={styles.input}
                value={profileData.address}
                onChangeText={(text) => setProfileData({ ...profileData, address: text })}
              />
            </View>
            <View style={styles.infoItem}>
              <TextInput
                style={styles.input}
                value={profileData.bio}
                onChangeText={(text) => setProfileData({ ...profileData, bio: text })}
              />
            </View>
          </>
        ) : (
          // If not editing, display text
          <>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>Email: {profileData.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>Phone: {profileData.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>Address: {profileData.address}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>Bio: {profileData.bio}</Text>
            </View>
          </>
        )}
        <Button title={isEditing ? 'Save' : 'Edit'} onPress={handleEditToggle} />
      </View>

      {/* Skills Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Skills</Text>
        {profileData.skills.map((skill, index) => (
          <Text key={index} style={styles.skillItem}>{skill}</Text>
        ))}
        <View style={styles.addSkillContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new skill"
            value={newSkill}
            onChangeText={setNewSkill}
          />
          <Button title="Add" onPress={handleAddSkill} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 10,
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 15,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  tagline: {
    fontSize: 16,
    color: '#aaa',
  },
  sectionContainer: {
    backgroundColor: '#1e1e1e', // Dark background for each section
    borderRadius: 8,
    marginBottom: 25,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  statItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: '#bbb',
  },
  infoItem: {
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#1DA1F2',
  },
  input: {
    backgroundColor: '#fff',
    color: '#2a2a2a',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addSkillContainer: {
    marginTop: 15,
  },
  skillItem: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
});

export default ProfileScreen;
