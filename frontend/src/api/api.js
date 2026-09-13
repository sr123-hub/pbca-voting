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
export const getCandidates = () => request("/candidates");

// ADD CANDIDATE
export const addCandidate = async formData => {
  const res = await fetch(`${API_BASE_URL}/candidates`, {
    method: "POST",
    body: formData
  });
  return await res.json();
};

// UPDATE CANDIDATE
export const updateCandidate = async (id, formData) => {
  const res = await fetch(`${API_BASE_URL}/candidates/${id}`, {
    method: "PUT",
    body: formData
  });
  return await res.json();
};

// DELETE CANDIDATE
export const deleteCandidate = id =>
  request(`/candidates/${id}`, {
    method: "DELETE"
  });

/* -----------------------------
   VOTERS API
------------------------------*/
export const getAllVoters = () => request("/voters");

export const getVoters = () => request("/voters");

export const getVoter = id => request(`/voters/${id}`);

export const addVoter = data =>
  request("/voters", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const updateVoter = (id, data) =>
  request(`/voters/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const deleteVoter = id =>
  request(`/voters/${id}`, {
    method: "DELETE"
  });

export const lookupVoter = voter_id =>
  request("/voters/lookup", {
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
  request("/voting/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });


export const getSummary = () => request("/summary");

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


