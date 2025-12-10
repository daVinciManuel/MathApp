import api from "./api";

/**
 * @param {number} nivel
 * @param {string} operacion
 */
export async function getGameExercises(nivel, operacion) {
  return api.get(`/api/game/n${nivel}/${operacion}`);
}
