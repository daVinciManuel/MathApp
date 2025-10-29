import axios from "axios";
const fetchGame = async () => {
  let data = null;
  await axios
    .get("http://localhost:5000/api/game/n1/suma")
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = "Error: " + err.message;
    });
  return data;
};

export default fetchGame;
