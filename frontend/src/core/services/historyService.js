import api from "./api";

export async function getGameHistory(userId) {
  return api.get(`/api/results/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}
