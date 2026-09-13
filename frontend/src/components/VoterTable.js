import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
//import { getAllVoters, updateVoter, deleteVoter, addVoter } from "../api/api";
import Modal from "../components/Modal";

export default function VoterTable() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);

  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: ""
  });

  const showModal = (title, message) => {
    setModal({ show: true, title, message });
  };

  const closeModal = () => {
    setModal({ ...modal, show: false });
  };

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    getAllVoters().then(setRows);
  };

  const save = async () => {
    if (editing.voter_id) {
      await updateVoter(editing.voter_id, editing);
      showModal("Success", "Voter updated successfully!");
    } else {
      await addVoter(editing);
      showModal("Success", "New voter added!");
    }

    setEditing(null);
    load();
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.full_name,
      sortable: true
    },
    {
      name: "Address",
      selector: row => row.address,
      sortable: true
    },
{
      name: "City",
      selector: row => row.city,
      sortable: true
    },

{
      name: "State",
      selector: row => row.state,
      sortable: true
    },

{
      name: "ZipCode",
      selector: row => row.zipcode,
      sortable: true
    },

{
      name: "Phone",
      selector: row => row.phone,
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
            deleteVoter(row.voter_id)
              .then(() => load())
              .catch(err => alert(err.message));
          }}
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <div>
      <button onClick={() => setEditing({})}>Add New Voter</button>

      <DataTable
        columns={columns}
        data={rows}
        pagination
        highlightOnHover
        striped
      />

      {editing && (
        <div className="modal">
          <div className="modal-box">
            <h3>{editing.voter_id ? "Edit Voter" : "Add New Voter"}</h3>

            <label>Name</label>
            <input
              value={editing.full_name || ""}
              onChange={e =>
                setEditing({ ...editing, full_name: e.target.value })
              }
            />

            <label>Address</label>
            <input
              value={editing.address || ""}
              onChange={e =>
                setEditing({ ...editing, address: e.target.value })
              }
            />
<label>City</label>
<input
  value={editing.city || ""}
  onChange={e => setEditing({ ...editing, city: e.target.value })}
/>

<label>State</label>
<input
  value={editing.state || ""}
  onChange={e => setEditing({ ...editing, state: e.target.value })}
/>

<label>Zipcode</label>
<input
  value={editing.zipcode || ""}
  onChange={e => setEditing({ ...editing, zipcode: e.target.value })}
/>
<label>Phone</label>
<input
  value={editing.phone || ""}
  onChange={e => setEditing({ ...editing, phone: e.target.value })}
/>


            <div className="modal-actions">
              <button onClick={save}>Save</button>
              <button onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Modal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </div>
  );
}