import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const SettingScreen = () => {

  const initialProfileData = {
    firstName: "John",
    lastName: "Doe",
    userName: "kelocks",
    dob: "17/01/2004",
    phone: "123 456 7890",
    email: "johndoe@example.com",
    address: "123 Main St, Springfield, IL",
    about: "Passionate about coding, solving problems, and continuous learning.",
  };

  const [profileData, setProfileData] = useState(initialProfileData);

  const handleSaveChanges = () => {
    const updatedProfileData = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      userName: userNameInput,
      dob: dobInput,
      phone: phoneInput,
      email: emailInput,
      address: addressInput,
      about: aboutInput,
    };
    setProfileData(updatedProfileData);
  };

  // Local refs for inputs
  let firstNameInput = profileData.firstName;
  let lastNameInput = profileData.lastName;
  let userNameInput = profileData.userName;
  let dobInput = profileData.dob;
  let phoneInput = profileData.phone;
  let emailInput = profileData.email;
  let addressInput = profileData.address;
  let aboutInput = profileData.about;

  // console.log(profileData);

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.pageTitle}>Settings</Text> */}
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        {/** Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>First Name</Text>
          <TextInput
            style={styles.textInputField}
            defaultValue={profileData.firstName}
            onChangeText={(text) => (firstNameInput = text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>Last Name</Text>
          <TextInput
            style={styles.textInputField}
            defaultValue={profileData.lastName}
            onChangeText={(text) => (lastNameInput = text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>User Name</Text>
          <TextInput
            style={styles.textInputField}
            defaultValue={profileData.userName}
            onChangeText={(text) => (userNameInput = text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>Date Of Birth</Text>
          <TextInput
            style={styles.textInputField}
            defaultValue={profileData.dob}
            onChangeText={(text) => (dobInput = text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>Phone No.</Text>
          <TextInput
            style={styles.textInputField}
            defaultValue={profileData.phone}
            onChangeText={(text) => (phoneInput = text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>Email</Text>
          <TextInput
            style={styles.textInputField}
            defaultValue={profileData.email}
            onChangeText={(text) => (emailInput = text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>Address</Text>
          <TextInput
            style={[styles.textInputField, styles.largeTextInputField]}
            defaultValue={profileData.address}
            onChangeText={(text) => (addressInput = text)}
            multiline
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>About</Text>
          <TextInput
            style={[styles.textInputField, styles.largeTextInputField]}
            defaultValue={profileData.about}
            onChangeText={(text) => (aboutInput = text)}
            multiline
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Button
            title="Save Changes"
            color="#0375ad"
            onPress={handleSaveChanges}
          />
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>Current Password</Text>
          <TextInput
            style={styles.textInputField}
            placeholder="Current password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>New  Password</Text>
          <TextInput
            style={styles.textInputField}
            placeholder="New password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>Confirm Password</Text>
          <TextInput
            style={styles.textInputField}
            placeholder="Confirm password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Button title="Update Password" color="#0375ad" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#121212",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  settingsContainer: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1DA1F2",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  textField: {
    fontSize: 16,
    color: "#aaa",
    width: 120,
  },
  textInputField: {
    flex: 1,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: "#fff",
  },
  largeTextInputField: {
    height: 80,
    textAlignVertical: "top",
  },
});

export default SettingScreen;
