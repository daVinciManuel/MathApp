import axios from "axios";
const fetchGame = async (nivel, operacion, localhost) => {
  let data = null;
  let url = "";
  if (localhost === true) {
    url = `http://localhost:5000/api/game/n${nivel}/${operacion}`;
  } else {
    url = `https://mathapp-ug8r.onrender.com/api/game/n${nivel}/${operacion}`;
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

// ejemplo multiplicacion nivel 1 en localhost
console.log(await fetchGame(1, "multiplicacion", true));

export default fetchGame;
