// like done now we have to do unlike and set the is_liked statte work pending..

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
import { useProfileContext } from "../../Context/ProfileContext";
import { postlike,postunlike } from "../../api/feed";
const LikeButtonComp = ({ onLikeToggle, likes , initialIsLiked,post_id }) => {
  const {profile} = useProfileContext()
  const profile_id = profile.id;
  const liked = useSharedValue(initialIsLiked ? 1 : 0);
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
    if (isProcessing) return;
    setIsProcessing(true);
  
    const currentLiked = liked.value === 1;
    liked.value = withSpring(currentLiked ? 0 : 1);
  
    try {
      if (currentLiked) {
        await postunlike(post_id);
        onLikeToggle(-1);
      } else {
        await postlike(profile_id, post_id);
        onLikeToggle(1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      liked.value = withSpring(currentLiked ? 1 : 0);
    } finally {
      setIsProcessing(false);
    }
  };
  

  // function stall(){
  //   return;
  // }

  return (
    <Pressable onPress={toggleLike} style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <MaterialCommunityIcons
          name={"thumb-up-outline"}
          size={32}
          color={"#fff"}
        />
      </Animated.View>

      <Animated.View style={fillStyle}>
        <MaterialCommunityIcons name={"thumb-up"} size={32} color={"#24a0ed"} />
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

export default function LikeButton({ initialLikeCount, post_id,initialIsLiked }) {
  const {profile} = useProfileContext()
  const profile_id = profile.id;
  // if(!initialLikeCount) initialLikeCount=0;
  const [likeCount, setLikeCount] = useState(initialLikeCount||0);

  // const handleLikeToggle = async (change) => {
  //   try {
  //     if (change === 1) {
  //       await postlike(post_id, profile_id);
  //     } else if (change === -1) {
  //       await postunlike(post_id, profile_id);
  //     }
  
  //     setLikeCount((prevCount) => prevCount + change);
  //   } catch (error) {
  //     console.error("Error toggling like:", error);
  //   }
  // };
  const handleLikeToggle = async (change) => {
    try {
      setLikeCount((prevCount) => prevCount + change);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };


  
  

  return (
    <View style={styles.mainContainer}>
      <LikeButtonComp onLikeToggle={handleLikeToggle} likes={likeCount} initialIsLiked={initialIsLiked} post_id={post_id}/>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    //borderRadius:2,
    marginTop:4,
    //marginRight:16,
    //backgroundColor:'pink',
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
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


// import React, { useState } from "react";
// import Animated, {
//   useSharedValue,
//   withSpring,
//   useAnimatedStyle,
//   Extrapolate,
//   interpolate,
// } from "react-native-reanimated";
// import { Pressable, View, StyleSheet, Text } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const LikeButtonComp = ({ onLikeToggle }) => {
//   const liked = useSharedValue(0);
//   const [isProcessing, setIsProcessing] = useState(false); // Lock for preventing rapid taps

//   const outlineStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
//         },
//       ],
//     };
//   });

//   const fillStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           scale: liked.value,
//         },
//       ],
//       opacity: liked.value,
//     };
//   });

//   const toggleLike = async () => {
//     if (isProcessing) return; // Prevent further taps during processing

//     setIsProcessing(true);
//     const isLiked = liked.value === 1;

//     // Update the animation
//     liked.value = withSpring(isLiked ? 0 : 1);

//     // Simulate slight delay to allow the animation to stabilize
//     setTimeout(() => {
//       onLikeToggle(isLiked ? -1 : 1);
//       setIsProcessing(false);
//     }, 200); // Adjust delay to match animation duration
//   };

//   return (
//     <Pressable onPress={toggleLike}>
//       <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
//         <MaterialCommunityIcons
//           name={"thumb-up-outline"}
//           size={32}
//           color={"#c2c0c0"}
//         />
//       </Animated.View>

//       <Animated.View style={fillStyle}>
//         <MaterialCommunityIcons name={"thumb-up"} size={32} color={"#24a0ed"} />
//       </Animated.View>
//     </Pressable>
//   );
// };

// export default function LikeButton({ initialLikeCount }) {
//   const [likeCount, setLikeCount] = useState(initialLikeCount);

//   const handleLikeToggle = (change) => {
//     setLikeCount((prevCount) => prevCount + change);
//     // Optionally, make an API call here to sync the like count
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "flex-start",
//         flexDirection: "row",
//         borderWidth: 2,
//         padding: 8,
//       }}
//     >
//       <LikeButtonComp onLikeToggle={handleLikeToggle} />
//       <Text style={styles.likeCount}>{likeCount} Likes</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   likeCount: {
//     paddingLeft: 12,
//     fontSize: 16,
//     color: "#24a0ed",
//     fontWeight: "500",
//   },
// });

