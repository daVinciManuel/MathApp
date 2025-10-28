const fetchGame = async () => {
  try {
    // const res = await axios.get("http//localhost:5000/api/game/n1/suma");
    // if (res.status === 200) {
    //   return res.data;
    // }
  } catch (error) {
    console.error("Error fetching game data:", error);
    throw error;
  }
  return [0, 1, 2, 3, 4];
};

export default fetchGame;
