// Validación para el texto del ejercicio complejo (no permite coma)
import { useNewGame } from "@core/hooks/context";
import styles from "./ComplexExercise.module.css";

const ComplexExercise = ({ containerStyles  }) => {
  const { updateExercise, payload, index } = useNewGame();
  
  const handleChange = (e) => {
    const value = e.target.value;

    if (value.includes(",")) {
      alert("La coma no está permitida en el ejercicio.");
      return;
    }

    updateExercise("customExercise", value);
  };


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
        className={styles.input}
        onChange={handleChange}
        value={
          (payload.exercises[index] &&
            payload.exercises[index].customExercise) || ""}
      />
    </div>
  );
};

export default ComplexExercise;