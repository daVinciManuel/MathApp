import api from "./api";

export async function login(formData) {
  const urlEncoded = new URLSearchParams();
  for (const key in formData) {
    urlEncoded.append(key, formData[key]);
  }

  return api.post("/api/auth/login", urlEncoded, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    withCredentials: true,
  });
}

export async function register(formData) {
  const urlEncoded = new URLSearchParams();
  for (const key in formData) {
    urlEncoded.append(key, formData[key]);
  }

  return api.post("/api/auth/register", urlEncoded, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

export async function logout() {
  return api.post("/api/auth/logout", {}, { withCredentials: true });
}

export async function getProfile() {
  return api.get("/api/auth/profile", {
    withCredentials: true,
    validateStatus: () => true,
  });
}
