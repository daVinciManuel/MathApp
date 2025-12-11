import { useState, useContext } from "react";
import { saveCustomGame } from "../../services/newGameService"; // <-- your API service
import {
  objectArraysAreEqual,
  removeEmptyObjectsFromArray,
  validarTextoBasico,
  validarTextoConComa
} from "../../utils/validations";
import { NewGameContext } from "./newGameContext.js";

export const NewGameProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [fieldError, setFieldError] = useState("");
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

  // Actualiza el nombre del juego
  const updateName = (name) => {
    setPayload((prev) => ({ ...prev, gameName: name }));
    console.log("Game name updated to:", name);
  };

  // 1) Actualiza un campo del ejercicio actual
  const updateExercise = (field, value) => {
    console.log("Updating field:", field, "with value:", value);
    console.log("Current index:", index);

    let isValid = true;

    // Validaciones
    if (field === "customExercise") isValid = validarTextoBasico(value);
    if (field === "answers") isValid = validarTextoConComa(value);

    // Si no es válido, guardamos error y no actualizamos
    if (!isValid) {
      setFieldError(field);
      return;
    } else {
      setFieldError(""); // Borramos error si es válido
    }
    
    // Actualiza el payload con el nuevo valor
    setPayload((prev) => {
      const updatedExercises = [...prev.exercises];
      updatedExercises[index] = { ...updatedExercises[index], [field]: value };
      return { ...prev, exercises: updatedExercises };
    });
  };

  // 2) Guarda la info del ejercicio actual
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

  // Comprueba si el ejercicio actual está completo
  const isCardValid = () => {
    const current = payload.exercises[index];

    // Ejercicio simple
    if (current.type === "simple") {
      return (
        current.num1 !== "" &&
        current.operation !== "" &&
        current.num2 !== ""
      );
    }

    // Ejercicio personalizado
    if (current.type === "complex") {
      return (
        current.customExercise.trim() !== "" &&
        current.answers.trim() !== ""
      );
    }

    // Si no tiene type, no está completo
    return false;
  };

  // 3) Funciones de navegación
  const onNext = () => {
    saveCurrentCard(); // Guarda antes de pasar
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
      return { ...prev, exercises: copy };
    });
    setIndex((prev) => prev + 1);
  };

  // 4) Guarda todos los ejercicios en backend
  const onSave = async () => {
    saveCurrentCard();
    try {
      let payloadValidated = payload;
      let exercises = removeEmptyObjectsFromArray(payload.exercises);
      
      if (objectArraysAreEqual(exercises, payload.exercises) === false) {
        payloadValidated = { ...payload, exercises: exercises };
        console.log(payloadValidated);
      }
      
      await saveCustomGame(payloadValidated);
      
      setMessage("Juego guardado correctamente.");
      setShowModal(true);
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
        isCardValid,
        fieldError,
        setFieldError,
      }}
    >
      {children}
    </NewGameContext.Provider>
  );
};

export const useNewGame = () => useContext(NewGameContext);