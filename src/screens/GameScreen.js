import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import fetchQuizQuestion from "../api";
import QuestionCard from "../components/QuestionCard";
import Button from "../components/Button";

const GameScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  // componentDidMount
  useEffect(() => {
    const getQuestions = async () => {
      const newQuestions = await fetchQuizQuestion(10, "easy");

      setQuestions(newQuestions);
    };

    getQuestions();
  }, []);

  // Maneja el incremento de las preguntas disponibles
  const handlerNextQuestion = () => {
    const nextNumber = number + 1;

    if (nextNumber === 10) setGameOver(true);

    setNumber(nextNumber);
    setUserAnswer("");
  };

  // Verificar si la respuesta seleccionada es la correcta
  const handlerCheckAnswer = (answer) => {
    const correct = questions[number].correct_answer === answer;

    if (correct) setScore(score + 1);

    setUserAnswer(answer);
  };

  return (
    <View style={styles.container}>
      {!gameOver && questions.length ? (
        <View>
          <Text>React Native Quiz App</Text>
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            questionNumber={number + 1}
            totalQuestions={10}
            correctAnswer={questions[number].correct_answer}
            callback={handlerCheckAnswer}
            userAnswer={userAnswer}
          />
          <Button title="Next" callback={handlerNextQuestion} />
        </View>
      ) : null}
      {gameOver ? (
        <View>
          <Text>Correct answers: {score}</Text>
          <Button title="Restart" />
        </View>
      ) : null}
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

export default GameScreen;
