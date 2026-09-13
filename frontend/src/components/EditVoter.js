import { useState } from "react";
import { getVoter, updateVoter } from "../api/api";


export default function EditVoter() {
  const [searchId, setSearchId] = useState("");
  const [voter, setVoter] = useState(null);



  const lookup = async () => {
    const data = await getVoter(searchId);
    if (data.error) alert(data.error);
    else setVoter(data);
  };

  //const save = async () => {
  //  const res = await updateVoter(voter.voter_id, voter);
  //  alert(res.message);
  //};
const save = async () => {
  const payload = {
    full_name: editing.full_name,
    email: editing.email,
    phone: editing.phone,
    voted: editing.voted   // ⭐ REQUIRED
  };

  await updateVoter(editing.voter_id, payload);
};


  return (
    <div>
      <h3>Edit Voter</h3>

      <input
        placeholder="Enter Voter ID"
        value={searchId}
        onChange={e => setSearchId(e.target.value)}
      />
      <button onClick={lookup}>Load</button>

      {voter && (
        <div style={{ marginTop: 10 }}>
          <input
            value={voter.full_name}
            onChange={e => setVoter({ ...voter, full_name: e.target.value })}
            placeholder="Full Name"
          /><br />

          <input
            value={voter.address}
            onChange={e => setVoter({ ...voter, address: e.target.value })}
            placeholder="Address"
          /><br />
          <input
            value={voter.city}
            onChange={e => setVoter({ ...voter, city: e.target.value })}
            placeholder="City"
          /><br />
          <input
            value={voter.state}
            onChange={e => setVoter({ ...voter, state: e.target.value })}
            placeholder="State"
          /><br />

                <input
            value={voter.zipcode}
            onChange={e => setVoter({ ...voter, zipcode: e.target.value })}
            placeholder="ZipCode"
          /><br />
    <input
            value={voter.phone}
            onChange={e => setVoter({ ...voter, phone: e.target.value })}
            placeholder="Phone"
          /><br />

          <label>
            Ticket Received:
            <input
              type="checkbox"
              checked={voter.ticket_received}
              onChange={e => setVoter({ ...voter, ticket_received: e.target.checked })}
            />
          </label><br />

          <label>
            Voted:
            <input
              type="checkbox"
              checked={voter.voted}
              onChange={e => setVoter({ ...voter, voted: e.target.checked })}
            />
          </label><br />

          <button onClick={save}>Save Changes</button>
        </div>
      )}
    </div>
  );
}