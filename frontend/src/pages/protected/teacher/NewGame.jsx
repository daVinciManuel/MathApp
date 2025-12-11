import Modal from "@/components/Modal";
import Card from "@/components/newGameForm/Card";
import { useNewGame } from "@/core/hooks/context";
import styles from "../css/NewGame.module.css";

const NewGame = () => {
  const { updateName, onSave, showModal, setShowModal, message, payload } =
    useNewGame();

  return (
    <>
      <h1>Creaci&oacute;n de juego</h1>
      <Modal
        isOpen={showModal}
        message={message}
        onClose={() => setShowModal(false)}
      />
      <div className={styles.container}>
        <input
          type="text"
          className={styles.inputName}
          placeholder="Nombre del juego"
          onChange={(e) => {
            updateName(e.target.value);
          }}
          value={(payload && payload.gameName) || ""}
        />
        
        <Card />
        <button className={styles.saveButton} onClick={onSave}>
          Guardar todo
        </button>
      </div>
    </>
  );
};
export default NewGame;