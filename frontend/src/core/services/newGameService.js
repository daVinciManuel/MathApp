import api from "./api";

export async function saveCustomGame(gameData) {
  return api.post("/api/customGames/save", gameData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
}

export async function getMyCustomGames() {
  return api.get("/api/customGames/showMyGames", {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
}

export async function getAllCustomGames() {
  return api.get("/api/customGames/show", {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
}
