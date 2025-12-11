import { useNewGame } from "@core/hooks/context";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { index, onNext, onPrev, onDuplicate, isCardValid } = useNewGame();
  return (
    <div className={styles.newGameNavBar}>
      <button disabled={index === 0} onClick={onPrev}>
        Anterior
      </button>
      <button onClick={onDuplicate} disabled={!isCardValid()}>
        Duplicar
      </button>
      <button onClick={onNext} disabled={!isCardValid()}>
        Siguiente
      </button>
    </div>
  );
};

export default NavBar;
