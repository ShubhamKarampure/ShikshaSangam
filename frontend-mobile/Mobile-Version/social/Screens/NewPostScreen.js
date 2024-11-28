import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const NewPostScreen = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

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

  // Function to handle post submission
  const handlePost = () => {
    if (postContent.trim() || selectedImage) {
      console.log('New Post Content:', postContent);
      console.log('Selected Image URI:', selectedImage);
      setPostContent('');
      setSelectedImage(null);
    } else {
      alert('Post content or an image is required!');
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
 