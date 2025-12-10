import { useContext } from "react";
import { NewGameContext } from "./newGameContext";

export const useNewGame = () => useContext(NewGameContext);
