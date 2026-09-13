import React, { useEffect, useState } from "react";
import { getAllVoters } from "../api/api";
import "../styles/VoterList.css";

export default function VoterList({ onSelect }) {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    getAllVoters().then(setVoters);
  }, []);

  return (
    <div className="list-container">
      <h2>Voters</h2>
      <table className="list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
	    <th>Phone</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {voters.map(v => (
            <tr key={v.voter_id}>
              <td>{v.full_name}</td>
              <td>{v.address}</td>
              <td>{v.city}</td>
              <td>{v.state}</td>
              <td>{v.zipcode}</td>
              <td>{v.phone}</td>
              <td>
                <button onClick={() => onSelect && onSelect(v.voter_id)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
