import { useNewGame } from "../../core/context/newGameContext";

const SimpleExercise = ({ styles }) => {
  const { updateExercise, index, payload } = useNewGame();
  console.log(payload);
  return (
    <div style={styles}>
      <input
        type="radio"
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
        disabled={payload.exercises[index].type !== "simple"}
        onChange={(e) => updateExercise("operation", e.target.value)}
        value={
          (payload.exercises[index] && payload.exercises[index].operation) ||
          "+"
        }
      >
        <option value="+" default>
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
