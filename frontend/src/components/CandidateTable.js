import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
//import { getAllCandidates, updateCandidate, deleteCandidate } from "../api/api";

export default function CandidateTable() {
  const [candidates, setCandidates] = useState([]);
  const [editing, setEditing] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    getAllCandidates().then(setCandidates);
  };

  const columns = [
    {
      name: "Photo",
      cell: row => (
        <img
          src={`http://localhost:5000/uploads/${row.photo}`}
          alt={row.full_name}
          style={{ width: 50, height: 50, borderRadius: 6 }}
        />
      ),
      width: "80px"
    },
    {
      name: "Name",
      selector: row => row.full_name,
      sortable: true
    },
    {
      name: "Position",
      selector: row => row.position_name,
      sortable: true
    },
    {
      name: "Edit",
      cell: row => (
        <button onClick={() => setEditing(row)}>Edit</button>
      )
    },
    {
      name: "Delete",
      cell: row => (
        <button
          onClick={() => {
            deleteCandidate(row.id).then(load);
          }}
        >
          Delete
        </button>
      )
    }
  ];

  const save = async () => {
    const formData = new FormData();
    formData.append("full_name", editing.full_name);
    formData.append("position_id", editing.position_id);

    if (photoFile) formData.append("photo", photoFile);

    await updateCandidate(editing.id, formData);
    setEditing(null);
    setPhotoFile(null);
    load();
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={candidates}
        pagination
        highlightOnHover
        striped
      />

      {editing && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Candidate</h3>

            <label>Name</label>
            <input
              value={editing.full_name || ""}
              onChange={e =>
                setEditing({ ...editing, full_name: e.target.value })
              }
            />

            <label>Position</label>
            <input
              value={editing.position_id || ""}
              onChange={e =>
                setEditing({ ...editing, position_id: e.target.value })
              }
            />

            <label>Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setPhotoFile(e.target.files[0])}
            />

            <div className="modal-actions">
              <button onClick={save}>Save</button>
              <button onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}