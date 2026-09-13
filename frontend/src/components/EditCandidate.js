import { useState } from "react";
import { getCandidate, updateCandidate } from "../api/api";

const positions = [
  { id: 1, name: "President" },
  { id: 2, name: "General Secretary" },
  { id: 3, name: "Assistant General Secretary" },
  { id: 4, name: "Vice President" },
  { id: 5, name: "Treasurer" },
  { id: 6, name: "Assistant Treasurer" },
  { id: 7, name: "Organization Secretary" },
  { id: 8, name: "Sports Secretary" },
  { id: 9, name: "Assistant Sports Secretary" },
  { id: 10, name: "Cultural Secretary" },
  { id: 11, name: "Assistant Cultural Secretary" },
  { id: 12, name: "Executive Member 1" },
  { id: 13, name: "Executive Member 2" }
];

export default function EditCandidate() {
  const [searchId, setSearchId] = useState("");
  const [candidate, setCandidate] = useState(null);

  const lookup = async () => {
    const data = await getCandidate(searchId);
    if (data.error) alert(data.error);
    else setCandidate(data);
  };

  const save = async () => {
    const res = await updateCandidate(candidate.id, candidate);
    alert(res.message);
  };

  return (
    <div>
      <h3>Edit Candidate</h3>

      <input
        placeholder="Enter Candidate ID"
        value={searchId}
        onChange={e => setSearchId(e.target.value)}
      />
      <button onClick={lookup}>Load</button>

      {candidate && (
        <div style={{ marginTop: 10 }}>
          <input
            value={candidate.full_name}
            onChange={e => setCandidate({ ...candidate, full_name: e.target.value })}
            placeholder="Full Name"
          /><br />

          <select
            value={candidate.position_id}
            onChange={e => setCandidate({ ...candidate, position_id: Number(e.target.value) })}
          >
            {positions.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select><br />

          <button onClick={save}>Save Changes</button>
        </div>
      )}
    </div>
  );
}
