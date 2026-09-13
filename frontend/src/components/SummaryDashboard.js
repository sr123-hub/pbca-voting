import { useEffect, useState } from "react";
import { getSummary } from "../api/api";
import { Bar } from "react-chartjs-2";
import "../styles/SummaryDashboard.css";
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
  const [data, setData] = useState([]);
  const [view, setView] = useState("cards"); // "cards" or "chart"

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

  // ✅ Group candidates by position safely
  const grouped = Array.isArray(data)
    ? data.reduce((acc, row) => {
        acc[row.position_name] = acc[row.position_name] || [];
        acc[row.position_name].push(row);
        return acc;
      }, {})
    : {};

  // ✅ Build grouped chart (split bars per candidate)
  const positions = Object.keys(grouped);
  const datasets = [];

  positions.forEach(position => {
    grouped[position].forEach(candidate => {
      datasets.push({
        label: candidate.full_name,
        data: positions.map(pos =>
          pos === position ? candidate.votes : 0
        ),
        backgroundColor: positionColors[position] || "#999",
        borderColor: positionColors[position] || "#999",
        borderWidth: 2
      });
    });
  });

  const chartData = {
    labels: positions,
    datasets
  };

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
          className={view === "chart" ? "active-toggle" : ""}
          onClick={() => setView("chart")}
        >
          Chart View
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
    </div>
  );
}
