import React, { useEffect, useState } from "react";
import { getSummary } from "../api/api";
import "../styles/Winners.css";

export default function Winners() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getSummary();
        setData(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Failed to load summary:", err);
      }
    };
    load();
  }, []);

  // Group candidates by position
  const grouped = data.reduce((acc, row) => {
    acc[row.position_name] = acc[row.position_name] || [];
    acc[row.position_name].push(row);
    return acc;
  }, {});

  // Build winners list
  const winners = Object.keys(grouped).map(position => {
    const candidates = grouped[position];
    const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

    const winner = candidates.reduce((max, c) =>
      c.votes > max.votes ? c : max
    );

    return {
      position,
      winnerName: winner.full_name,
      winnerPhoto: winner.photo,
      winnerVotes: winner.votes,
      percent:
        totalVotes === 0
          ? 0
          : ((winner.votes / totalVotes) * 100).toFixed(1)
    };
  });

  return (
    <div className="winner-container">
      <h2 className="winner-title">Winning Panel Summary</h2>

      <div className="winner-grid">
        {winners.map((w, idx) => (
          <div key={idx} className="winner-card">
            <h3 className="winner-position">{w.position}</h3>

            <img
              src={`http://localhost:5000/uploads/${w.winnerPhoto}`}
              alt={w.winnerName}
              className="winner-photo"
            />

            <div className="winner-name">{w.winnerName}</div>
            <div className="winner-votes">{w.winnerVotes} votes</div>
            <div className="winner-percent">{w.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
