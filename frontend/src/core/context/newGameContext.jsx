import { createContext, useContext, useState } from "react";
// import { newGameService } from "../services/newGameService"; // <-- your API service

const NewGameContext = createContext();

export const NewGameProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(0);
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

  const [selectedType, setSelectedType] = useState("");

  // -----------------------------------------
  // 1) Update a field in current card
  // -----------------------------------------
  const updateExercise = (field, value) => {
    console.log("Updating field:", field, "with value:", value);
    console.log("Current index:", index);
    setExercises((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      console.log(updated);
      return updated;
    });
  };

  // -----------------------------------------
  // 2) Save current card info into exercises array
  // -----------------------------------------
  const saveCurrentCard = () => {
    setExercises((prev) => {
      const updated = [...prev];
      if (!updated[index]) {
        updated[index] = {
          type: "",
          num1: "",
          operation: "",
          num2: "",
          customExercise: "",
          answers: "",
        };
      }
      // Save type selected
      //   updated[index].type = selectedType;
      return updated;
    });
  };

  // -----------------------------------------
  // 3) Navigation functions
  // -----------------------------------------
  const onNext = () => {
    saveCurrentCard(); // Save current card first
    console.log("Next pressed. Current index:", index);
    if (!exercises[index + 1]) {
      setExercises((prev) => [
        ...prev,
        {
          type: "",
          num1: "",
          operation: "",
          num2: "",
          customExercise: "",
          answers: "",
        },
      ]);
    }
    setIndex((prev) => prev + 1);
    console.log(exercises);
  };

  const onPrev = () => {
    saveCurrentCard();
    setIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const onDuplicate = () => {
    saveCurrentCard();
    const current = exercises[index];
    setExercises((prev) => {
      const copy = [...prev];
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
      console.log("Saved all exercises:", exercises);
      setShowModal(true);
      setMessage("Ejercicios guardados correctamente.");
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
        selectedType,
        setSelectedType,
        updateExercise,
        onNext,
        onPrev,
        onDuplicate,
        onSave,
        message,
        setMessage,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </NewGameContext.Provider>
  );
};

export const useNewGame = () => useContext(NewGameContext);
