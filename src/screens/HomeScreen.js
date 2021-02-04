import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Button title="Start" />
      <Button title="Options" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252c4a",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
