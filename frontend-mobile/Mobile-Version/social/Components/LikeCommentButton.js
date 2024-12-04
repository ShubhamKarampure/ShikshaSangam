import React, { useState } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
  RollInLeft,
} from "react-native-reanimated";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LikeButtonComp = ({ onLikeToggle, likes }) => {
  const liked = useSharedValue(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Lock for preventing rapid taps

  const outlineStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
      },
    ],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    transform: [{ scale: liked.value }],
    opacity: liked.value,
  }));

  const toggleLike = async () => {
    if (isProcessing) return; // Prevent further taps during processing

    setIsProcessing(true);
    const currentLiked = liked.value === 1;

    // Update the animation
    liked.value = withSpring(currentLiked ? 0 : 1);

    // Update the state after the animation
    setTimeout(() => {
      setIsLiked(!currentLiked);
      onLikeToggle(currentLiked ? -1 : 1);
      setTimeout(()=>{
        setIsProcessing(false);
      }, 350);
      // setIsProcessing(false);
    }, 200); // Match animation duration
  };

  function stall(){
    return;
  }

  return (
    <Pressable onPress={isProcessing?stall:toggleLike} style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <MaterialCommunityIcons
          name={"heart-outline"}
          size={25}
          color={"#fff"}
        />
      </Animated.View>

      <Animated.View style={fillStyle}>
        <MaterialCommunityIcons name={"heart"} size={25} color={"#24a0ed"} />
      </Animated.View>
      <Text
        style={[
          styles.likeCount,
          isLiked ? styles.likedColor : styles.notLikedColor,
        ]}
      >
        {likes} {likes>1?"Likes":"Like"}
      </Text>
    </Pressable>
  );
};

export default function LikeCommentButton({ initialLikeCount }) {
  if(!initialLikeCount) initialLikeCount=0;
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLikeToggle = (change) => {
    setLikeCount((prevCount) => prevCount + change);
  };

  return (
    <View style={styles.mainContainer}>
      <LikeButtonComp onLikeToggle={handleLikeToggle} likes={likeCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    //flex:1,
    //borderRadius:2,
    width:120,
    marginTop:4,
    //marginRight:16,
    //backgroundColor:'purple',
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems:'flex-start'
    //padding:8,
    //borderWidth: 2,
    //backgroundColor:'grey'
  },
  likeCount: {
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: "500",
    textAlignVertical: "center",
  },
  likedColor: {
    color: "#24a0ed",
  },
  notLikedColor: {
    color: "#c2c0c0",
  },
});
