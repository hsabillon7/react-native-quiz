import { shuffleArray } from "../utils/utils";

const fetchQuizQuestion = async (amount, difficulty, category = "") => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${category}&type=multiple`;

  const response = await fetch(endpoint);
  const data = await response.json();

  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Map
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Spread_operator
  return data.results.map((question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

export default fetchQuizQuestion;
