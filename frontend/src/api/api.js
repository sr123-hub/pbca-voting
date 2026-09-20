// frontend/src/api/api.js

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

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

// GET ALL CANDIDATES
export const getCandidates = () => request("/api/candidates");

// ADD CANDIDATE
export const addCandidate = async formData => {
  const res = await fetch(`${API_BASE_URL}/api/candidates`, {
    method: "POST",
    body: formData
  });
  return await res.json();
};

// UPDATE CANDIDATE
export const updateCandidate = async (id, formData) => {
  const res = await fetch(`${API_BASE_URL}/api/candidates/${id}`, {
    method: "PUT",
    body: formData
  });
  return await res.json();
};

// DELETE CANDIDATE
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
  request("/settings/voting-window");

export const updateVotingWindow = data =>
  request("/settings/voting-window", {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const submitVote = (payload) =>
  request("/api/votes/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });


export const getSummary = () => request("/api/summary");

export const importVoters = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch("http://localhost:5000/admin/import-voters", {
    method: "POST",
    body: formData
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    });
};

export const API = import.meta.env.VITE_API_URL;

export const getStateSummary = () =>
  request("/api/summary/states");

export const resetVotes = () =>
  request("/admin/reset-votes", {
    method: "POST"
  });

  export const getLocationSummary = () =>
  request("/api/summary/locations");
