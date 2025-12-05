// Validación para el texto del ejercicio complejo (no permite coma)
import { useNewGame } from "@core/context/newGameContext";
import styles from "./ComplexExercise.module.css";

const ComplexExercise = ({ containerStyles  }) => {
  const { updateExercise, payload, index, fieldError } = useNewGame();
  
  return (
    <div className={styles.container} style={containerStyles}>
      <input
        type="radio"
        className={styles.radio}
        name="typeExer"
        id="complexExer"
        value="complex"
        checked={payload.exercises[index].type === "complex"}
        onChange={() => updateExercise("type", "complex")}
      />

      <input
        type="text"
        name="customExercise"
        id="customExercise"
        placeholder="Escribe el ejercicio"
        disabled={payload.exercises[index].type !== "complex"}
        className={fieldError === "customExercise" ? styles.inputError : styles.input}
        onChange={(e) => updateExercise("customExercise", e.target.value)}
        value={
          (payload.exercises[index] &&
            payload.exercises[index].customExercise) || ""}
      />

      {fieldError === "customExercise" && (
        <p className={styles.errorMsg}>
          Solo números, letras y símbolos permitidos. (La coma no está permitida)
        </p>
      )}
    </div>
  );
};

export default ComplexExercise;