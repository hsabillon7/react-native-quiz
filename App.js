import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import fetchQuizQuestion from "./src/api";

export default function App() {
  const [questions, setQuestions] = useState([]);

  // componentDidMount
  useEffect(() => {
    const getQuestions = async () => {
      const questions = await fetchQuizQuestion(10, "easy");

      return questions;
    };

    const newQuestions = getQuestions();
    setQuestions(newQuestions);
  }, []);

  if (questions.length) {
    return (
      <View style={styles.container}>
        <Text>React Native Quiz App</Text>
        <Text>{questions[0].question}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>React Native Quiz App</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
