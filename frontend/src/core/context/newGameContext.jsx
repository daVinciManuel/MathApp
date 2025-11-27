import { createContext, useContext, useState } from "react";
// import { newGameService } from "../services/newGameService"; // <-- your API service

const NewGameContext = createContext();

export const NewGameProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [payload, setPayload] = useState({
    gameName: "",
    exercises: [
      {
        type: "",
        num1: "",
        operation: "",
        num2: "",
        customExercise: "",
        answers: "",
      },
    ],
  });
  const [exercises, setExercises] = useState([
    {
      type: "",
      num1: "",
      operation: "",
      num2: "",
      customExercise: "",
      answers: "",
    },
  ]);

  const updateName = (name) => {
    setPayload((prev) => ({ ...prev, gameName: name }));
    console.log("Game name updated to:", name);
    console.log(name);
  };
  // -----------------------------------------
  // 1) Update a field in current card
  // -----------------------------------------
  const updateExercise = (field, value) => {
    console.log("Updating field:", field, "with value:", value);
    console.log("Current index:", index);
    setPayload((prev) => {
      const updatedExercises = [...prev.exercises];
      updatedExercises[index] = { ...updatedExercises[index], [field]: value };
      return { ...prev, exercises: updatedExercises };
    });
  };

  // -----------------------------------------
  // 2) Save current card info into exercises array
  // -----------------------------------------
  const saveCurrentCard = () => {
    setPayload((prev) => {
      const updatedExercises = [...prev.exercises];
      if (!updatedExercises[index]) {
        updatedExercises[index] = {
          type: "",
          num1: "",
          operation: "",
          num2: "",
          customExercise: "",
          answers: "",
        };
      }
      return { ...prev, exercises: updatedExercises };
    });
  };

  // -----------------------------------------
  // 3) Navigation functions
  // -----------------------------------------
  const onNext = () => {
    saveCurrentCard(); // Save current card first
    console.log("Next pressed. Current index:", index);
    if (!payload.exercises[index + 1]) {
      setPayload((prev) => {
        const updatedExercises = [...prev.exercises];
        updatedExercises.push({
          type: "",
          num1: "",
          operation: "",
          num2: "",
          customExercise: "",
          answers: "",
        });
        return { ...prev, exercises: updatedExercises };
      });
    }
    setIndex((prev) => prev + 1);
    console.log(payload);
  };

  const onPrev = () => {
    saveCurrentCard();
    setIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const onDuplicate = () => {
    saveCurrentCard();
    const current = payload.exercises[index];
    setPayload((prev) => {
      const copy = [...prev.exercises];
      copy.splice(index + 1, 0, { ...current });
      return copy;
    });
    setIndex((prev) => prev + 1);
  };

  // -----------------------------------------
  // 4) Save all exercises to backend
  // -----------------------------------------
  const onSave = async () => {
    saveCurrentCard();
    try {
      //   await newGameService.saveExercises(exercises);
      setMessage("Ejercicios guardados correctamente.");
      setShowModal(true);
      console.log("Payload to be sent:", payload);
    } catch (error) {
      setShowModal(true);
      setMessage("Error guardando los ejercicios.");
      console.error("Error saving exercises:", error);
    }
  };

  return (
    <NewGameContext.Provider
      value={{
        index,
        setIndex,
        exercises,
        updateExercise,
        onNext,
        onPrev,
        onDuplicate,
        onSave,
        message,
        setMessage,
        showModal,
        setShowModal,
        updateName,
        payload,
        setPayload,
      }}
    >
      {children}
    </NewGameContext.Provider>
  );
};

export const useNewGame = () => useContext(NewGameContext);
