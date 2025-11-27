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
  const { updateExercise, payload, index } = useNewGame();
  return (
    <div style={styles}>
      <input
        type="radio"
        name="typeExer"
        id="complexExer"
        value="complex"
        checked={payload.exercises[index].type === "complex"}
        onChange={() => {
          updateExercise("type", "complex");
        }}
      />
      <input
        type="text"
        name="customExercise"
        id="customExercise"
        disabled={payload.exercises[index].type !== "complex"}
        onChange={(e) => updateExercise("customExercise", e.target.value)}
        value={
          (payload.exercises[index] &&
            payload.exercises[index].customExercise) ||
          ""
        }
      />
    </div>
  );
};

export default ComplexExercise;
