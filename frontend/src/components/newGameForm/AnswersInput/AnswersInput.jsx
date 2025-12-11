import { useNewGame } from "@core/hooks/context";
import styles from "./AnswersInput.module.css";

const AnswersInput = () => {
  const { updateExercise, payload, index, fieldError } = useNewGame();
  return (
    <div className={styles.wrapper}>
      <input
        className={
          fieldError === "answers" ? styles.inputError : styles.input}
        type="text"
        name="answers"
        id="answers"
        placeholder="Respuestas separadas por comas"
        onChange={(e) => updateExercise("answers", e.target.value)}
        value={
          (payload.exercises[index] && payload.exercises[index].answers) || ""}
      />

      {fieldError === "answers" && (
        <p className={styles.errorMsg}>
          Solo números, letras y símbolos permitidos. (La coma está permitida)
        </p>
      )}
    </div>
  );
};

export default AnswersInput;