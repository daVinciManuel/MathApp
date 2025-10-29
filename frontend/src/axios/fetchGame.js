import axios from "axios";
const fetchGame = async (nivel, operacion, remote = false) => {
  let test = true;
  let data = null;
  let url = "";
  url = remote
    ? `https://mathapp-ug8r.onrender.com/api/game/n${nivel}/${operacion}`
    : `http://localhost:5000/api/game/n${nivel}/${operacion}`;
  if (test) {
    console.log("[fetchGame.js]:");
    console.log("nivel: " + nivel);
    console.log("operacion:" + operacion);
    console.log("url:" + url);
  }
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
