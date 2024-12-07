import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuthContext } from '../../Context/useAuthContext'; // Adjust the path to your AuthContext
import AsyncStorage from '@react-native-async-storage/async-storage';
import BACKEND_URL from '../../constants';
const NewPostScreen = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const { user, isAuthenticated } = useAuthContext(); // Access user and authentication state
  
 

  // Function to pick an image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Use the URI of the selected image
    }
  };


const handlePost = async () => {
  if (!isAuthenticated) {
    alert('Please log in to post!');
    return;
  }

  if (!postContent.trim() && !selectedImage) {
    alert('Post content or an image is required!');
    return;
  }

  const formData = new FormData();

  // Add text content and user profile ID
  formData.append('content', postContent);
  formData.append('userprofile', user.profile_id);

  //console.log("SelectedImage = ",selectedImage);

  // Fetch file from URI and append to FormData
  if (selectedImage) {
    try {
      const response = await fetch(selectedImage);
      //console.log("response = ",response);
      const blob = await response.blob();
      //console.log("blob = ",blob);

      const imageName = selectedImage.split('/').pop(); // Extract file name
      const fileType = blob.type || 'image/jpeg'; // Get MIME type, default to 'image/jpeg'

      formData.append('media', {
        uri: selectedImage,
        type: fileType,
        name: imageName || 'image.jpg',
      });

      //console.log("form = ",formData);

    } catch (error) {
      console.error('Error fetching file:', error);
      alert('Failed to load the image. Please try again.');
      return;
    }
  }

  try {
    const accessToken = await AsyncStorage.getItem('access_token');

    if (!accessToken) {
      alert('Authentication failed. Please log in again.');
      return;
    }

    const response = await fetch(`${BACKEND_URL}/social/posts/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the auth token
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    const data = await response.json();
    alert('Post uploaded successfully!');
    setPostContent('');
    setSelectedImage(null);
  } catch (error) {
    console.error('Error uploading post:', error);
    alert('Failed to upload post. Please try again.');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Create New Post</Text>

      {/* Text Input for Post Content */}
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        placeholderTextColor="#666"
        multiline
        value={postContent}
        onChangeText={setPostContent}
      />

      {/* Image Preview */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      )}

      {/* Select Image Button */}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>
          {selectedImage ? 'Change Image' : 'Upload Image'}
        </Text>
      </TouchableOpacity>

      {/* Post Button */}
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  imageButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  postButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default NewPostScreen;


  // Function to handle post submission
  // const handlePost = async () => {
  //   if (!isAuthenticated) {
  //     alert('Please log in to post!');
  //     return;
  //   }

  //   if (!postContent.trim() && !selectedImage) {
  //     alert('Post content or an image is required!');
  //     return;
  //   }

  //   const formData = new FormData();

  //   // Add text content
  //   formData.append('content', postContent);
  //   formData.append('userprofile',user.profile_id)
  //   // Add the image file
  //   if (selectedImage) {
  //     formData.append('media', {
  //       uri: selectedImage,
  //       type: 'image/jpeg', // Adjust type based on image format
  //       name: 'post-image.jpg', // Name for the uploaded file
  //     });
  //   }

  //   try {
  //     // Retrieve access token from AsyncStorage via context
  //     const accessToken = await AsyncStorage.getItem('access_token');

  //     if (!accessToken) {
  //       alert('Authentication failed. Please log in again.');
  //       return;
  //     }

  //     const response = await fetch(`${BACKEND_URL}/social/posts`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`, // Include the auth token
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log('Post created:', data);
  //     alert('Post uploaded successfully!');
  //     setPostContent('');
  //     setSelectedImage(null);
  //   } catch (error) {
  //     console.error('Error uploading post:', error);
  //     alert('Failed to upload post. Please try again.');
  //   }
  // };