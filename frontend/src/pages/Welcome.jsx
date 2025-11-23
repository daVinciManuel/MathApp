import "./css/welcome.css";
const Welcome = ({ navigate }) => {
  return (
    <main id="welcome">
      <img src="/img/logo1.png" />
      <button onClick={() => navigate("/game")}>Prueba una partida</button>
      <br />
      <button onClick={() => navigate("/login")}>Login</button>
    </main>
  );
};

export default Welcome;
