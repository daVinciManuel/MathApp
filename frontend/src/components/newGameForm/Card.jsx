import { useNewGame } from "@core/hooks/context";
import AnswersInput from "./AnswersInput";
import ComplexExercise from "./ComplexExercise";
import NavBar from "./NavBar";
import SimpleExercise from "./SimpleExercise";

const Card = () => {
  const { index } = useNewGame();
  return (
    <div style={newGameCard()}>
      <h3>Ejercicio {index + 1}</h3>
      <p>Elige un tipo de enunciado:</p>
      <div style={typeExerciseStyle()}>
        <SimpleExercise styles={exerciseOptionStyle()} />
        <ComplexExercise styles={exerciseOptionStyle()} />
      </div>
      <h3>Respuestas:</h3>
      <AnswersInput />
      <NavBar />
    </div>
  );
};

export default Card;

// styles
function newGameCard() {
  return {
    width: "380px",
    height: "auto",
    margin: "0 auto",
    padding: "20px",

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",

    backgroundColor: "violet",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
  };
}

function typeExerciseStyle() {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "10px",
    gap: "10px",
  };
}

function exerciseOptionStyle() {
  return {
    width: "304px",
    height: "40px",
    padding: "5px",

    display: "flex",
    alignItems: "center",
    gap: "10px",

    border: "1px solid #555",
    borderRadius: "4px",
  };
}
