import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getAllVoters } from "../api/api";

export default function ViewVoters() {
  const [voters, setVoters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const voterList = await getAllVoters();
        setVoters(voterList);
      } catch (err) {
        console.error("Failed to load voters:", err);
      }
    };

    load();
  }, []);

  const filteredVoters = voters.filter(v =>
    `${v.full_name} ${v.address} ${v.city} ${v.state} ${v.zipcode} ${v.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    { name: "ID", selector: row => row.voter_id, sortable: true },
    { name: "Name", selector: row => row.full_name, sortable: true },
    { name: "Address", selector: row => row.address, sortable: true },
    { name: "City", selector: row => row.city, sortable: true },
    { name: "State", selector: row => row.state, sortable: true },
    { name: "Zip", selector: row => row.zipcode, sortable: true },
    { name: "Phone", selector: row => row.phone, sortable: true },
    {
      name: "Voted?",
      selector: row => (row.voted === 1 ? "Yes" : "No"),
      sortable: true,
      cell: row =>
        row.voted === 1 ? (
          <span className="badge bg-success">Yes</span>
        ) : (
          <span className="badge bg-secondary">No</span>
        )
    },
    { name: "Voting Location", selector: row => row.voting_location, sortable: true },
    
  ];

  return (
    <div className="container mt-4">
      <h2>Voters List</h2>

      <input
        type="text"
        placeholder="Search voters..."
        className="form-control mb-3"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filteredVoters}
        pagination
        highlightOnHover
        striped
        dense
        responsive
      />
    </div>
  );
}
