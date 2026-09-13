import { useState } from "react";
import { addVoter } from "../api/api";

export default function AddVoter() {
  const [form, setForm] = useState({
    voter_id: "",
    full_name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    voted: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.voter_id || !form.full_name) {
      alert("Voter ID and Name are required.");
      return;
    }
    const res = await addVoter(form);
    alert(res.message || "Voter added");
    setForm({ voter_id: "", full_name: "", address: "",city: "", state: "", zipcode: "", phone: "", voted:"" });
  };

  return (
    <div>
      <h3>Add Voter</h3>
      <input
        name="voter_id"
        placeholder="Voter ID"
        value={form.voter_id}
        onChange={handleChange}
      /><br />
      <input
        name="full_name"
        placeholder="Full Name"
        value={form.full_name}
        onChange={handleChange}
      /><br />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      /><br />
      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
      /><br />
      <input
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
      /><br />
      <input
        name="zipcode"
        placeholder="ZipCode"
        value={form.zipcode}
        onChange={handleChange}
      /><br />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      /><br />
      <input
        name="voted"
        placeholder="Voted"
        value={form.voted}
        onChange={handleChange}
      /><br />
      <button onClick={submit}>Save Voter</button>
    </div>
  );
}
