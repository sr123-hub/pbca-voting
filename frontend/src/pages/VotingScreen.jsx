import { useState } from "react";

export default function VotingScreen() {
  const [voterId, setVoterId] = useState("");
  const [voter, setVoter] = useState(null);

  const lookup = async () => {
    const res = await fetch("http://localhost:5000/voting/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voter_id: voterId })
    });

    const data = await res.json();
    setVoter(data);
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Voting Screen</h2>

      <input
        className="search-box"
        placeholder="Enter Voter ID"
        value={voterId}
        onChange={e => setVoterId(e.target.value)}
      />

      <button className="action-btn" onClick={lookup}>
        Lookup Voter
      </button>

      {voter && (
        <div className="voter-info">
          <h3>{voter.full_name}</h3>
          <p>{voter.address}</p>
          <p>{voter.city}, {voter.state} {voter.zipcode}</p>

          <button
            className="action-btn"
            onClick={() => window.location.href = "/admin/ballot?voter=" + voter.voter_id}
          >
            Proceed to Ballot
          </button>
        </div>
      )}
    </div>
  );
}
