import Modal from "@/components/Modal";
import Card from "@/components/newGameForm/Card";
import { useNewGame } from "@/core/hooks/context";

const NewGame = () => {
  const { updateName, onSave, showModal, setShowModal, message, payload } =
    useNewGame();

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
          value={(payload && payload.gameName) || ""}
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
