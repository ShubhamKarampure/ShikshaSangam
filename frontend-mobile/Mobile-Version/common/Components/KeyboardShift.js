import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  TextInput,
  Platform,
  StyleSheet,
} from "react-native";

export default function KeyboardShift({ children }) {
  const [shift, setShift] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get("window");
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput();

    if (!currentlyFocusedInputRef) return;

    currentlyFocusedInputRef.measure((x, y, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
      if (gap >= 0) return;

      Animated.timing(shift, {
        toValue: gap,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleKeyboardDidHide = () => {
    Animated.timing(shift, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: shift }] }]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// import React, { useEffect, useState } from "react";
// import {
//   Animated,
//   Dimensions,
//   Keyboard,
//   TextInput,
//   Platform,
//   StyleSheet,
// } from "react-native";

// export default function KeyboardShift({ children }) {
//   const [shift, setShift] = useState(new Animated.Value(0));

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       "keyboardDidShow",
//       handleKeyboardDidShow
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       "keyboardDidHide",
//       handleKeyboardDidHide
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   const handleKeyboardDidShow = (event) => {
//     const { height: windowHeight } = Dimensions.get("window");
//     const keyboardHeight = event.endCoordinates.height;
//     const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput();

//     if (!currentlyFocusedInputRef) return;

//     currentlyFocusedInputRef.measure((x, y, width, height, pageX, pageY) => {
//       const fieldHeight = height;
//       const fieldTop = pageY;
//       const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);

//       if (gap >= -10) return; // Prevent unnecessary shifting when there's enough space

//       const marginPadding = 10; // Optional padding to avoid keyboard crowding
//       Animated.timing(shift, {
//         toValue: gap - marginPadding,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   const handleKeyboardDidHide = () => {
//     Animated.timing(shift, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <Animated.View
//       style={[styles.container, { transform: [{ translateY: shift }] }]}
//     >
//       {children}
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'yellow',
//   },
// });
