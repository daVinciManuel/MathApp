import { useState } from "react";
const Ejercicio = ({ ejercicio, onRespuesta}) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    let isCorrect;

    // Si es complex, comparar como strings 
    if (ejercicio.type === "complex") {
      // Limpiar espacios y comparar
      const userAnswer = answer.replace(/\s+/g, '').toLowerCase(); 
      const correctAnswer = ejercicio.answers.replace(/\s+/g, '').toLowerCase();
      isCorrect = userAnswer === correctAnswer;
    } 
    // Si es simple o normal, comparar como números
    else {
      const correctAnswer = ejercicio.result || parseInt(ejercicio.answers);
      isCorrect = parseInt(answer) === correctAnswer;
    }

    onRespuesta(isCorrect);
    setAnswer("");
  };

   // Si es ejercicio personalizado tipo "complex"
  if (ejercicio.type === "complex") {
    return (
      <>
        <div className="operation">{ejercicio.customExercise}</div>
        <p>Resultado:</p>
        <input
          type="text"
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
