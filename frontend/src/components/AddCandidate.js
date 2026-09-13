import { useState } from "react";
import { addCandidate } from "../api/api";

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

export default function AddCandidate() {
  const [full_name, setFullName] = useState("");
  const [position_id, setPositionId] = useState(1);

  const submit = async () => {
    if (!full_name) {
      alert("Candidate name is required.");
      return;
    }
    const res = await addCandidate({ full_name, position_id });
    alert(res.message || "Candidate added");
    setFullName("");
    setPositionId(1);
  };

  return (
    <div>
      <h3>Add Candidate</h3>
      <input
        placeholder="Full Name"
        value={full_name}
        onChange={e => setFullName(e.target.value)}
      /><br />
      <select
        value={position_id}
        onChange={e => setPositionId(Number(e.target.value))}
      >
        {positions.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select><br />
      <button onClick={submit}>Save Candidate</button>
    </div>
  );
}
