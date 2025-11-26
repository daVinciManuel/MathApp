// --------------------------------------------------------------------
// TODO: VALIDACIONES
// valid chars:
// - numbers
// - lettters
// - spaces
// - chars: . ^ ( ) + - * ÷ / : |
//
//  comma is NOT allowed
// --------------------------------------------------------------------
import { useNewGame } from "../../core/context/newGameContext";
const ComplexExercise = ({ styles }) => {
  const { updateExercise, exercises, index } = useNewGame();
  return (
    <div style={styles}>
      <input
        type="radio"
        name="typeExer"
        id="complexExer"
        value="complex"
        checked={exercises[index].type === "complex"}
        onChange={() => {
          updateExercise("type", "complex");
        }}
      />
      <input
        type="text"
        name="customExercise"
        id="customExercise"
        disabled={exercises[index].type !== "complex"}
        onChange={(e) => updateExercise("customExercise", e.target.value)}
        value={(exercises[index] && exercises[index].customExercise) || ""}
      />
    </div>
  );
};

export default ComplexExercise;
