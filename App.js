import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import fetchQuizQuestion from "./src/api";
import QuestionCard from "./src/components/QuestionCard";

export default function App() {
  const [questions, setQuestions] = useState([]);

  // componentDidMount
  useEffect(() => {
    const getQuestions = async () => {
      const newQuestions = await fetchQuizQuestion(10, "easy");

      setQuestions(newQuestions);
    };

    getQuestions();
  }, []);

  if (questions.length) {
    return (
      <View style={styles.container}>
        <Text>React Native Quiz App</Text>
        <QuestionCard
          question={questions[0].question}
          answers={questions[0].answers}
          questionNumber={1}
          totalQuestions={10}
          correctAnswer={questions[0].correct_answer}
        />
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
    backgroundColor: "#252c4a",
    alignItems: "center",
    justifyContent: "center",
  },
});
