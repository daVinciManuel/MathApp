import Modal from "@/components/Modal";
import Card from "@/components/newGameForm/Card/Card.jsx";
import { useNewGame } from "@/core/context/newGameContext";
import styles from "../css/NewGame.module.css";

const NewGame = () => {
  const { updateName, onSave, showModal, setShowModal, message } = useNewGame();

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
          onChange={(e) => updateName(e.target.value)}
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