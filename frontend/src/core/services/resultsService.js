import api from "./api";

/**
 * @param {object} resultData 
 */
export async function saveGameResult(resultData) {
  return api.post("/api/results/save", resultData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
}

/**
 * @param {object} performanceData 
 */
export async function generateAIMessage(performanceData) {
  const response = await api.post("/api/openai/generate-message", performanceData, {
    headers: { "Content-Type": "application/json" },
  });

  // Check for successful response with message
  if (response.data.success) {
    return response.data.message;
  } else {
    throw new Error(response.data.message || "Failed to generate AI message");
  }
}

export async function checkUserAuth() {
  try {
    const response = await api.get("/api/auth/profile", {
      withCredentials: true,
    });
    return response.status === 200;
  } catch (e) {
    e;
    return false;
  }
}
