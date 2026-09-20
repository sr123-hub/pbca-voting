import React, { useState, useEffect } from "react";
import { getSummary } from "../api/api";
import { Bar } from "react-chartjs-2";
import LocationView from "../pages/LocationView";
import "../styles/SummaryDashboard.css";
import "../styles/Winners.css";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// 🎨 Color map per position
const positionColors = {
  President: "#007bff",
  "General Secretary": "#dc3545",
  "Assistant General Secretary": "#28d700",
  "Vice President": "#ffc107",
  Treasurer: "#447448",
  "Assistant Treasurer": "#008bff",
  "Organization Secretary": "#004bff",
  "Sports Secretary": "#002b00",
  "Assistant Sports Secretary": "#007b88",
  "Cultural Secretary": "#007b66",
  "Assistant Cultural Secretary": "#007bbb",
  "Executive Member 1": "#007b99",
  "Executive Member 2": "#007b11"
};

export default function SummaryDashboard() {
  const [view, setView] = useState("cards"); // cards | chart | voters
  const [data, setData] = useState([]);




  useEffect(() => {
    const load = async () => {
      try {
        const res = await getSummary();
        setData(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Failed to load summary:", err);
        setData([]);
      }

    };

    load();
  }, []);


  // Group candidates by position
  const grouped = Array.isArray(data)
    ? data.reduce((acc, row) => {
        acc[row.position_name] = acc[row.position_name] || [];
        acc[row.position_name].push(row);
        return acc;
      }, {})
    : {};

  const positions = Object.keys(grouped);
  const datasets = [];

  positions.forEach(position => {
    grouped[position].forEach(candidate => {
      datasets.push({
        label: candidate.full_name,
        data: positions.map(pos => (pos === position ? candidate.votes : 0)),
        backgroundColor: positionColors[position] || "#999",
        borderColor: positionColors[position] || "#999",
        borderWidth: 2
      });
    });
  });

  // Calculate percentages per position
const percentageData = positions.map(position => {
  const candidates = grouped[position];
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return {
    position,
    candidates: candidates.map(c => ({
      name: c.full_name,
      votes: c.votes,
      percent: totalVotes === 0 ? 0 : ((c.votes / totalVotes) * 100).toFixed(1)
    }))
  };
});


  const chartData = {
    labels: positions,
    datasets
  };

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
    <div className="summary-container">
      <h2 className="summary-title">Vote Summary</h2>

      {/* Toggle buttons */}
      <div className="toggle-buttons">
        <button
          className={view === "cards" ? "active-toggle" : ""}
          onClick={() => setView("cards")}
        >
          Cards View
        </button>

        <button
          className={view === "percent" ? "active-toggle" : ""}
          onClick={() => setView("percent")}
        >
          Percentage View
        </button>
        <button
          className={view === "location" ? "active-toggle" : ""}
          onClick={() => setView("location")}
        >
          Location View
        </button>

        <button
          className={view === "winners" ? "active-toggle" : ""}
          onClick={() => setView("winners")}
        >
          Winners Panel
        </button>

      </div>

      {/* Cards View */}
      {view === "cards" && (
        <div className="cards-view">
          {Object.keys(grouped).length === 0 ? (
            <p>No summary data available.</p>
          ) : (
            Object.keys(grouped).map(position => {
              const candidates = grouped[position];
              const winner = candidates.reduce((max, c) =>
                c.votes > max.votes ? c : max
              );

              return (
                <div key={position} className="summary-section">
                  <h3 className="summary-position">{position}</h3>
                  <hr className="summary-divider" />

                  <div className="summary-row">
                    {candidates.map((c, idx) => (
                      <div
                        key={idx}
                        className={`summary-card ${
                          c.full_name === winner.full_name ? "winner-flash" : ""
                        }`}
                        style={{
                          borderColor: positionColors[c.position_name]
                        }}
                      >
                        <img
                          src={`http://localhost:5000/uploads/${c.photo}`}
                          alt={c.full_name}
                          className="summary-photo"
                        />
                        <div className="summary-name">{c.full_name}</div>
                        <div className="summary-votes">{c.votes} votes</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Chart View */}
      {view === "chart" && (
        <div className="chart-view">
          {data.length === 0 ? (
            <p>No chart data available.</p>
          ) : (
            <Bar
              data={chartData}
              options={{
                scales: {
                  x: {
                    ticks: {
                      maxRotation: 90,
                      minRotation: 90
                    }
                  }
                }
              }}
            />
          )}
        </div>
      )}
      {/* Percent View */}
      {view === "percent" && (
        <div className="percent-view">
          {percentageData.map((item, idx) => (
            <div key={idx} className="summary-section">
              <h3 className="summary-position">{item.position}</h3>
              <hr className="summary-divider" />

              <div className="summary-row">
                {item.candidates.map((c, i) => (
                  <div key={i} className="summary-card" style={{ borderColor: positionColors[item.position] }}>
                    <div className="summary-name">{c.name}</div>
                    <div className="summary-votes">{c.votes} votes</div>
                    <div className="summary-percent">{c.percent}%</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Location View */}
       {view === "location" && (
          <div className="summary-section">
            <LocationView />
          </div>
        )}


      {/* Winners View  */}
      {view === "winners" && (
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
      )}

    </div>
  );
}
