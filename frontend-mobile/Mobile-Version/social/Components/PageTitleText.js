import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";

const PageTitleText = ({children}) => {
  return (
    <Text style={styles.pageTitle}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default PageTitleText;
