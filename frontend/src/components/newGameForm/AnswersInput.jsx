import { useNewGame } from "../../core/context/newGameContext";
const AnswersInput = () => {
  const { updateExercise, exercises, index } = useNewGame();
  return (
    <div>
      <input
        type="text"
        name="answers"
        id="answers"
        onChange={(e) => {
          updateExercise("answers", e.target.value);
        }}
        value={(exercises[index] && exercises[index].answers) || ""}
      />
    </div>
  );
};

export default AnswersInput;

// TODO: VALIDACIONES
// valid chars:
// - numbers
// - lettters
// - spaces
// - chars: . , ^ ( )
