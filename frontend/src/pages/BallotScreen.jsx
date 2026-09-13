import { useEffect, useState } from "react";

export default function BallotScreen() {
  const [candidates, setCandidates] = useState([]);
  const voterId = new URLSearchParams(window.location.search).get("voter");

  useEffect(() => {
    fetch("http://localhost:5000/ballot")
      .then(res => res.json())
      .then(setCandidates);
  }, []);

  const vote = async (candidateId) => {
    await fetch("http://localhost:5000/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voter_id: voterId, candidate_id: candidateId })
    });

    alert("Vote submitted!");
    window.location.href = "/admin/voting";
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Ballot Screen</h2>

      {candidates.map(c => (
        <div key={c.id} className="candidate-card">
          <h3>{c.full_name}</h3>
          <p>{c.position_name}</p>

          <button className="action-btn" onClick={() => vote(c.id)}>
            Vote
          </button>
        </div>
      ))}
    </div>
  );
}
