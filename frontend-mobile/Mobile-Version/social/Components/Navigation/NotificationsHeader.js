import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import Icon for the drawer
import { useNavigation } from "@react-navigation/native";

export default function NotificationsHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {/* Drawer Icon */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      {/* App Name - Centered */}
      <Text style={styles.appName}>Notifications</Text>

      {/* Empty view for spacing (optional, you can replace this if needed) */}
      <View style={styles.emptySpace} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#121212", // Dark background for header
    paddingTop: 20,
    marginTop: 30,
  },
  appName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1, // Ensures the title stays centered
  },
  emptySpace: {
    width: 30, // Space for any future button or just for spacing
  },
});
