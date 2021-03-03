import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import fetchQuizQuestion from "../api";
import QuestionCard from "../components/QuestionCard";
import Button from "../components/Button";
import { GameContext } from "../providers/GameProvider";

const GameScreen = ({ route, navigation }) => {
  const { question, category, difficulty } = useContext(GameContext);
  const { start } = route.params;
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [restart, setRestart] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    handlerStart();
  }, [start, restart]);

  const handlerStart = () => {
    // Reiniciar a los valores por defecto
    setScore(0);
    setNumber(0);
    setGameOver(false);

    const getQuestions = async () => {
      const newQuestions = await fetchQuizQuestion(
        question,
        difficulty,
        category
      );

      if (!newQuestions.length) setError(true);

      setQuestions(newQuestions);
    };

    getQuestions();
  };

  // Maneja el incremento de las preguntas disponibles
  const handlerNextQuestion = () => {
    const nextNumber = number + 1;

    if (nextNumber === Number(question)) setGameOver(true);

    setNumber(nextNumber);
    setUserAnswer("");
  };

  // Verificar si la respuesta seleccionada es la correcta
  const handlerCheckAnswer = (answer) => {
    const correct = questions[number].correct_answer === answer;

    if (correct) setScore(score + 1);

    setUserAnswer(answer);
  };

  const handlerRestart = () => {
    setRestart(!restart);
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.category}>
          The API doesn't have questions for this configuration
        </Text>
        <Button
          title="Back"
          callback={() => {
            navigation.goBack();
          }}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!gameOver && questions.length ? (
        <View>
          <View style={styles.categoryContainer}>
            <LinearGradient
              style={styles.categoryGradient}
              colors={["#fc506d", "#b46ff9"]}
              start={{ x: -1, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.category}>{questions[number].category}</Text>
            </LinearGradient>
          </View>
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            questionNumber={number + 1}
            totalQuestions={question}
            correctAnswer={questions[number].correct_answer}
            callback={handlerCheckAnswer}
            userAnswer={userAnswer}
          />
          <View>
            <Text style={styles.correctAnswer}>Correct answers: {score}</Text>
            <Button title="Next" callback={handlerNextQuestion} />
          </View>
        </View>
      ) : null}
      {gameOver && questions.length ? (
        <View>
          <Text style={styles.correctAnswer}>Correct answers: {score}</Text>
          <Button title="Restart" callback={handlerRestart} />
          <Button
            title="Back"
            callback={() => {
              navigation.goBack();
            }}
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252c4a",
    alignItems: "center",
    justifyContent: "center",
  },
  correctAnswer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8a93bb",
    textAlign: "center",
    marginBottom: 10,
  },
  categoryContainer: {
    padding: 20,
  },
  categoryGradient: {
    borderWidth: 4,
    borderColor: "#414a6b",
    borderRadius: 30,
  },
  category: {
    padding: 10,
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default GameScreen;
