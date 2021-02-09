import React from "react";
import { StyleSheet, Dimensions, View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { categories } from "../api";
import Button from "../components/Button";

const { width } = Dimensions.get("screen");

const OptionsScreen = () => {
  // Ordenar el arreglo
  categories.sort((a, b) => (a.description > b.description ? 1 : -1));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Number of questions</Text>
      <TextInput
        placeholder={10}
        keyboardType="number-pad"
        style={styles.input}
      />
      <Text style={styles.label}>Category</Text>
      <Picker style={styles.select}>
        {categories.map((category) => (
          <Picker.Item
            key={category.value}
            label={category.description}
            value={category.value}
          />
        ))}
      </Picker>
      <Text style={styles.label}>Difficulty</Text>
      <Picker style={styles.select}>
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>
      <Button title="Save" callback={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252c4a",
    justifyContent: "center",
    width: width,
  },
  label: {
    color: "#8a93bb",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: width * 0.1,
  },
  input: {
    color: "#fff",
    fontSize: 16,
    borderColor: "#21486a",
    borderWidth: 3,
    width: width * 0.8,
    marginBottom: 10,
    alignSelf: "center",
  },
  select: {
    color: "#fff",
    backgroundColor: "#252c4a",
    fontSize: 16,
    borderColor: "#21486a",
    borderWidth: 3,
    width: width * 0.8,
    marginBottom: 10,
    alignSelf: "center",
    padding: 5,
  },
});

export default OptionsScreen;
