import { useState } from "react";
const Ejercicio = ({ ejercicio, onRespuesta }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    const isCorrect = parseInt(answer) === ejercicio.result;
    console.log(isCorrect);
    onRespuesta(isCorrect);
    setAnswer("");
  };
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
        {ejercicio.num1} {signo} {ejercicio.num2}
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
