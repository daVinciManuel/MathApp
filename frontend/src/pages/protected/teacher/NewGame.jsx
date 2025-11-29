import Modal from "@/components/Modal";
import Card from "@/components/newGameForm/Card";
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
          placeholder="Nombre del juego"
          onChange={(e) => {
            updateName(e.target.value);
          }}
        />
      </center>
      <Card />
      <button onClick={onSave} style={{ marginLeft: "47.5%" }}>
        Guardar todo
      </button>
    </>
  );
};
export default NewGame;
