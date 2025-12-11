import { useNewGame } from "@core/hooks/context";
import styles from "./SimpleExercise.module.css";

const SimpleExercise = ({ containerStyles }) => {
  const { updateExercise, index, payload } = useNewGame();
  
  return (
    <div style={containerStyles}>
      <input
        type="radio"
        className={styles.radio}
        name="typeExer"
        id="simpleExer"
        value="simple"
        checked={payload.exercises[index].type === "simple"}
        onChange={() => {
          updateExercise("type", "simple");
        }}
      />
      <input
        type="number"
        name="num1"
        id="num1"
        style={{ width: "50px" }}
        disabled={payload.exercises[index].type !== "simple"}
        onChange={(e) => updateExercise("num1", e.target.value)}
        value={
          (payload.exercises[index] && payload.exercises[index].num1) || ""
        }
      />
      <select
        name="operation"
        id="operation"
        style={{ margin: "0 10px" }}
        disabled={payload.exercises[index].type !== "simple"}
        onChange={(e) => updateExercise("operation", e.target.value)}
        value={
          (payload.exercises[index] && payload.exercises[index].operation) ||
          "+"
        }
      >
        <option value="+" selected>
          +
        </option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input
        type="number"
        name="num2"
        id="num2"
        style={{ width: "50px" }}
        disabled={payload.exercises[index].type !== "simple"}
        onChange={(e) => updateExercise("num2", e.target.value)}
        value={
          (payload.exercises[index] && payload.exercises[index].num2) || ""
        }
      />
    </div>
  );
};

export default SimpleExercise;
