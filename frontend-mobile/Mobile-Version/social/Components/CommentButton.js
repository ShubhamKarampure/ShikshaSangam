import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CommentButton = ({ item, isDarkMode, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{paddingTop:7}}>
        <MaterialCommunityIcons
          name="comment-text-outline"
          size={32}
          color={isDarkMode ? "#fff" : "#000"}
        />
      </View>
      <Text
        style={[
          styles.actionText,
          isDarkMode ? styles.textDarkSecondary : styles.textLight,
        ]}
      >
        {item.comments_count}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //padding: 8,
    //backgroundColor:'blue'
  },
  actionText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  textDarkSecondary: {
    color: "#aaa",
  },
  textLight: {
    color: "#000",
  },
});

export default CommentButton;
