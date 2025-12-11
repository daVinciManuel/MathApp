import { useNewGame } from "@core/hooks/context";
import AnswersInput from "../AnswersInput/AnswersInput";
import ComplexExercise from "../ComplexExercise/ComplexExercise";
import NavBar from "../NavBar/NavBar";
import SimpleExercise from "../SimpleExercise/SimpleExercise";
import styles from "./Card.module.css";

const Card = () => {
  const { index } = useNewGame();
  return (
    <div className={styles.card}>
      <h2>Ejercicio {index + 1}</h2>

      <p>Elige un tipo de enunciado:</p>
      <div className={styles.typeExercise}>
        <SimpleExercise className={styles.exerciseOption} />
        <ComplexExercise className={styles.exerciseOption} />
      </div>

      <h3>Respuesta:</h3>
      <AnswersInput />
      <NavBar />
    </div>
  );
};

export default Card;