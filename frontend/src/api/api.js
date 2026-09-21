// frontend/src/api/api.js

// Use Vite environment variable in production, fallback to localhost for dev
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper: clean fetch wrapper
export async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options
    });

    const data = await res.json();

    if (!res.ok) {
      throw data; // contains title + message
    }

    return data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}

/* -----------------------------
   CANDIDATES API
------------------------------*/

export const getCandidates = () => request("/api/candidates");

export const addCandidate = async formData => {
  const res = await fetch(`${API_BASE_URL}/api/candidates`, {
    method: "POST",
    body: formData
  });
  return await res.json();
};

export const updateCandidate = async (id, formData) => {
  const res = await fetch(`${API_BASE_URL}/api/candidates/${id}`, {
    method: "PUT",
    body: formData
  });
  return await res.json();
};

export const deleteCandidate = id =>
  request(`/api/candidates/${id}`, {
    method: "DELETE"
  });

/* -----------------------------
   VOTERS API
------------------------------*/

export const getAllVoters = () => request("/api/voters");
export const getVoters = () => request("/api/voters");
export const getVoter = id => request(`/api/voters/${id}`);

export const addVoter = data =>
  request("/api/voters", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const updateVoter = (id, data) =>
  request(`/api/voters/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const deleteVoter = id =>
  request(`/api/voters/${id}`, {
    method: "DELETE"
  });

export const lookupVoter = voter_id =>
  request("/api/voters/lookup", {
    method: "POST",
    body: JSON.stringify({ voter_id })
  });

/* -----------------------------
   VOTING WINDOW API
------------------------------*/

export const getVotingWindow = () =>
  request("/api/settings/voting-window");

export const updateVotingWindow = data =>
  request("/api/settings/voting-window", {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const submitVote = payload =>
  request("/api/votes/submit", {
    method: "POST",
    body: JSON.stringify(payload)
  });

/* -----------------------------
   SUMMARY API
------------------------------*/

export const getSummary = () => request("/api/summary");
export const getStateSummary = () => request("/api/summary/states");
export const getLocationSummary = () => request("/api/summary/locations");

/* -----------------------------
   ADMIN ACTIONS
------------------------------*/

export const resetVotes = () =>
  request("/admin/reset-votes", {
    method: "POST"
  });

/* -----------------------------
   IMPORT VOTERS
------------------------------*/

export const importVoters = file => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch(`${API_BASE_URL}/admin/import-voters`, {
    method: "POST",
    body: formData
  })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    });
};

// Export base URL for debugging
export const API = API_BASE_URL;
