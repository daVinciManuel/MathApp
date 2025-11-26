import { useNewGame } from "../../core/context/newGameContext";
const NavBar = () => {
  const { index, onNext, onPrev, onDuplicate } = useNewGame();
  return (
    <div style={newGameNavBar()}>
      <button disabled={index === 0} onClick={onPrev}>
        Anterior
      </button>
      <button onClick={onDuplicate}>Duplicar</button>
      <button onClick={onNext}>Siguiente</button>
    </div>
  );
};

export default NavBar;

function newGameNavBar() {
  return {
    width: "100%",
    marginTop: "20px",

    display: "flex",
    justifyContent: "space-between",
  };
}
