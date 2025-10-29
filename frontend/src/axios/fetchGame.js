import axios from "axios";
const fetchGame = async (nivel, operacion, localhost = false) => {
  let data = null;
  let url = "";
  url = localhost
    ? `https://mathapp-ug8r.onrender.com/api/game/n${nivel}/${operacion}`
    : `http://localhost:5000/api/game/n${nivel}/${operacion}`;
  await axios
    .get(url)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = "Error: " + err.message;
    });
  return data;
};

export default fetchGame;
