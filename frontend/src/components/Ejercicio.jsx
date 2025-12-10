import { useState } from "react";
const Ejercicio = ({ ejercicio, onRespuesta, indiceActual, totalEjercicios }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    // Verificar si es ejercicio personalizado o normal
    const correctAnswer = ejercicio.result || parseInt(ejercicio.answers);

    const isCorrect = parseInt(answer) === correctAnswer;
    onRespuesta(isCorrect);
    setAnswer("");
  };

   // Si es ejercicio personalizado tipo "complex"
  if (ejercicio.type === "complex") {
    return (
      <>
        <p className="exercise-counter">Ejercicio {indiceActual} de {totalEjercicios}</p>
        <div className="operation">{ejercicio.customExercise}</div>
        <p>Resultado:</p>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <br />
        <button onClick={handleSubmit}>Siguiente ➜</button>
      </>
    );
  }

  // Si es ejercicio personalizado tipo "simple"
  if (ejercicio.type === "simple") {
    return (
      <>
        <p className="exercise-counter">Ejercicio {indiceActual} de {totalEjercicios}</p>
        <div className="operation">
          {ejercicio.num1} {ejercicio.operation} {ejercicio.num2}
        </div>
        <p>Resultado:</p>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <br />
        <button onClick={handleSubmit}>Siguiente ➜</button>
      </>
    );
  }

  // Ejercicios normales (suma, resta, multiplicación, división)
  let signo =
    ejercicio.operador === "suma"
      ? "+"
      : ejercicio.operador === "resta"
      ? "-"
      : ejercicio.operador === "multiplicacion"
      ? "×"
      : "÷";
  return (
    <>
      <p className="exercise-counter">Ejercicio {indiceActual} de {totalEjercicios}</p>
      <div className="operation">
        {ejercicio.num1} {signo}
        {ejercicio.num2 < 0
          ? " (" + ejercicio.num2 + ")"
          : " " + ejercicio.num2}
      </div>
      <p>Resultado:</p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Siguiente ➜</button>
    </>
  );
};

export default Ejercicio;
