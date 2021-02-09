import { shuffleArray } from "../utils/utils";

// Categorías de la API
export const categories = [
  { description: "Any Category", value: "any" },
  { description: "General Knowledge", value: "9" },
  { description: "Entertainment: Books", value: "10" },
  { description: "Entertainment: Film", value: "11" },
  { description: "Entertainment: Music", value: "12" },
  { description: "Entertainment: Musicals &amp; Theatres", value: "13" },
  { description: "Entertainment: Television", value: "14" },
  { description: "Entertainment: Video Games", value: "15" },
  { description: "Entertainment: Board Games", value: "16" },
  { description: "Science & Nature", value: "17" },
  { description: "Science: Computers", value: "18" },
  { description: "Science: Mathematics", value: "19" },
  { description: "Mythology", value: "20" },
  { description: "Sports", value: "21" },
  { description: "Geography", value: "22" },
  { description: "History", value: "23" },
  { description: "Politics", value: "24" },
  { description: "Art", value: "25" },
  { description: "Celebrities", value: "26" },
  { description: "Animals", value: "27" },
  { description: "Vehicles", value: "28" },
  { description: "Entertainment: Comics", value: "29" },
  { description: "Science: Gadgets", value: "30" },
  { description: "Entertainment: Japanese Anime & Manga", value: "31" },
  { description: "Entertainment: Cartoon &amp; Animations", value: "32" },
];

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
