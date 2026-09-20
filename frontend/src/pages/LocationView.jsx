import { useEffect, useState } from "react";
import { getLocationSummary } from "../api/api";
import "../styles/LocationView.css";

export default function LocationView() {
  const [locations, setLocations] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await getLocationSummary();

        // Normalize backend fields
        const normalized = raw.map(item => ({
          location: item.location,
          votes: item.votes
        }));

        // Ensure all 4 locations exist
        const required = ["Jamaica", "Woodside", "Jersey", "Connecticut"];

        const finalList = required.map(loc => {
          const found = normalized.find(
            x => x.location.toLowerCase() === loc.toLowerCase()
          );
          return {
            location: loc,
            votes: found ? found.votes : 0
          };
        });

        setLocations(finalList);

        const total = finalList.reduce((sum, loc) => sum + loc.votes, 0);
        setTotalVotes(total);

      } catch (err) {
        console.error("Failed to load location summary:", err);
      }
    };

    load();
  }, []);

  const leftColumn = locations.slice(0, 2);
  const rightColumn = locations.slice(2, 4);

  return (
    <div className="location-view-container">
      <h2 className="location-title">Voting Locations Summary</h2>

      <div className="total-votes-card">
        <h3>Total Votes</h3>
        <div className="total-votes-number">{totalVotes}</div>
      </div>

      <div className="location-columns">
        <div className="column">
          {leftColumn.map((loc, idx) => (
            <div key={idx} className="location-card">
              <h4>{loc.location}</h4>
              <p>{loc.votes} votes</p>
            </div>
          ))}
        </div>

        <div className="column">
          {rightColumn.map((loc, idx) => (
            <div key={idx} className="location-card">
              <h4>{loc.location}</h4>
              <p>{loc.votes} votes</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
