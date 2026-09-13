import React, { useEffect, useState } from "react";
import { getAllCandidates } from "../api/api";
import "../styles/CandidateList.css";

export default function CandidateList({ onSelect }) {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getAllCandidates().then(setCandidates);
  }, []);

  return (
    <div className="list-container">
      <h2>Candidates</h2>
      <table className="list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Photo</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr key={c.id}>
              <td>{c.full_name}</td>
              <td>{c.position_name}</td>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${c.photo}`}
                  alt={c.full_name}
                  className="list-photo"
                />
              </td>
              <td>
                <button onClick={() => onSelect && onSelect(c.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
