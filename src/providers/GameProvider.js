import React, { createContext } from "react";
import { useState } from "react";

// Crear el contexto para el juego
export const GameContext = createContext({});

export const GameProvider = (props) => {
  const { children } = props;
  // Mantener el estado del juego y pasarlo por el árbol de componentes
  const [question, setQuestion] = useState(10);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  // Crear un objeto que se pasa al contexto
  const gameContext = {
    question,
    category,
    difficulty,
    setQuestion,
    setCategory,
    setDifficulty,
  };

  return (
    <GameContext.Provider value={gameContext}>{children}</GameContext.Provider>
  );
};
