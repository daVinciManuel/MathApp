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
  const response = await fetch("http://localhost:5000/api/generate-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(performanceData),
  });

  if (!response.ok) {
    throw new Error("Failed to generate AI message");
  }

  const data = await response.json();
  return data.message;
}

export async function checkUserAuth() {
  try {
    const response = await api.get("/api/auth/profile", {
      withCredentials: true,
    });
    return response.status === 200;
  } catch (err) {
    return false;
  }
}
