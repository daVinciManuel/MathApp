import { useEffect, useState } from "react";
import "./css/GameMenu.css";
function GameMenu({ onSelected }) {
  const [nivel, setNivel] = useState();
  const [operacion, setOperacion] = useState();

  const handleSubmitNivel = (nivel) => {
    setNivel(nivel);
  };
  const handleSubmitOperacion = (operacion) => {
    setOperacion(operacion);
  };
  useEffect(() => {
    if (nivel && operacion) {
      onSelected(nivel, operacion);
    }
  }, [nivel, operacion, onSelected]);
  const opValues = ["suma", "resta", "multiplicacion", "division"];
  const nivelValues = [1, 2, 3];
  return (
    <>
      {!operacion ? (
        <menu className="game-menu menu-operaciones">
          <li
            onClick={() => {
              {
                handleSubmitOperacion(opValues[0]);
              }
            }}
          >
            Suma
          </li>
          <li
            onClick={() => {
              {
                handleSubmitOperacion(opValues[1]);
              }
            }}
          >
            Resta
          </li>
          <li
            onClick={() => {
              {
                handleSubmitOperacion(opValues[2]);
              }
            }}
          >
            Multiplicaci&oacute;n
          </li>
          <li
            onClick={() => {
              {
                handleSubmitOperacion(opValues[3]);
              }
            }}
          >
            Divisi&oacute;n
          </li>
        </menu>
      ) : (
        <menu className="game-menu menu-niveles">
          <li
            onClick={() => {
              {
                handleSubmitNivel(nivelValues[0]);
              }
            }}
          >
            Nivel 1
          </li>
          <li
            onClick={() => {
              {
                handleSubmitNivel(nivelValues[1]);
              }
            }}
          >
            Nivel 2
          </li>
          <li
            onClick={() => {
              {
                handleSubmitNivel(nivelValues[2]);
              }
            }}
          >
            Nivel 3
          </li>
        </menu>
      )}
    </>
  );
}

export default GameMenu;
