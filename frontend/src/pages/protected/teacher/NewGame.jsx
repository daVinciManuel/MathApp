import Modal from "@/components/Modal";
import Card from "@/components/newGameForm/Card/Card.jsx";
import { useNewGame } from "@/core/context/newGameContext";

const NewGame = () => {
  const { updateName, onSave, showModal, setShowModal, message } = useNewGame();

  return (
    <>
      <h1>Creaci&oacute;n de juego</h1>
      <Modal
        isOpen={showModal}
        message={message}
        onClose={() => {
          setShowModal(false);
        }}
      />
      <center>
        <input
          type="text"
          style={{
      width: "80%",
      maxWidth: "350px",
      padding: "10px 14px",
      border: "2px solid #ccc",
      borderRadius: "10px",
      fontSize: "16px",
      outline: "none",
      transition: "0.2s",
    }}
    onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          placeholder="Nombre del juego"
          onChange={(e) => {
            updateName(e.target.value);
          }}
        />
      </center><br />
      <Card />
      <button onClick={onSave} style={{ marginLeft: "39%" }}>
        Guardar todo
      </button>
    </>
  );
};
export default NewGame;
