import { useNewGame } from "@core/hooks/context";
const AnswersInput = () => {
  const { updateExercise, payload, index } = useNewGame();
  return (
    <div>
      <input
        type="text"
        name="answers"
        id="answers"
        onChange={(e) => {
          updateExercise("answers", e.target.value);
        }}
        value={
          (payload.exercises[index] && payload.exercises[index].answers) || ""
        }
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
