import api from "./api";

export async function saveCustomGame(gameData) {
  return api.post("/api/customGames/save", gameData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
}
