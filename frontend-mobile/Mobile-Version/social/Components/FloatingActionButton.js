import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const FloatingActionButton = ({ isDarkMode, onPress }) => (
  <TouchableOpacity
    style={[styles.fab, isDarkMode && styles.fabDark]}
    onPress={onPress}
  >
    <Text style={styles.fabText}>+</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  fabDark: { backgroundColor: "#555" },
  fabText: { color: "#fff", fontSize: 24 },
});

export default FloatingActionButton;
