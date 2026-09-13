import React, { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
//import {  getAllVoters,  addVoter,  updateVoter,  deleteVoter} from "../api/api";
import "../styles/VoterDataTable.css";

export default function VoterDataTable() {
  const [rows, setRows] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [editing, setEditing] = useState(null); // null = closed, {} = add, row = edit

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    getAllVoters().then(setRows);
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.full_name,
      sortable: true,
      grow: 2
    },
    {
      name: "Phone",
      selector: row => row.phone,
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
      sortable: true,
      width: "90px"
    },
    {
      name: "Ticket",
      selector: row => (row.ticket_received ? "Yes" : "No"),
      sortable: true,
      width: "90px"
    },
    {
      name: "Voted",
      selector: row => (row.voted ? "Yes" : "No"),
      sortable: true,
      width: "90px"
    },
    {
      name: "Actions",
      cell: row => (
        <div className="actions-cell">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setEditing(row)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={async () => {
              if (!window.confirm("Delete this voter?")) return;
              await deleteVoter(row.voter_id);
              load();
            }}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  const filteredRows = useMemo(() => {
    const text = filterText.toLowerCase();
    return rows.filter(r =>
      [
        r.full_name,
        r.address,
        r.phone,
        r.city,
        r.state,
        r.zipcode,
        r.voter_id
      ]
        .filter(Boolean)
        .some(v => v.toLowerCase().includes(text))
    );
  }, [rows, filterText]);

  const save = async () => {
    if (!editing) return;

    if (editing.voter_id) {
      await updateVoter(editing.voter_id, editing);
    } else {
      await addVoter(editing);
    }
  

    setEditing(null);
    load();
  };

  return (
    <div className="voter-table-wrapper">
      <div className="voter-table-header">
        <h2>Voters</h2>
        <div className="header-right">
          <input
            className="search-input"
            placeholder="Search voters..."
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => setEditing({})}
          >
            Add Voter
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredRows}
        pagination
        highlightOnHover
        striped
        dense
        defaultSortFieldId={1}
      />

      {editing && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>{editing.voter_id ? "Edit Voter" : "Add Voter"}</h3>

            <div className="modal-grid">
              <label>
                Name
                <input
                  value={editing.full_name || ""}
                  onChange={e =>
                    setEditing({ ...editing, full_name: e.target.value })
                  }
                />
              </label>

              <label>
                Address
                <input
                  value={editing.address || ""}
                  onChange={e =>
                    setEditing({ ...editing, address: e.target.value })
                  }
                />
              </label>

              <label>
                Phone
                <input
                  value={editing.phone || ""}
                  onChange={e =>
                    setEditing({ ...editing, phone: e.target.value })
                  }
                />
              </label>

              <label>
                City
                <input
                  value={editing.city || ""}
                  onChange={e =>
                    setEditing({ ...editing, city: e.target.value })
                  }
                />
              </label>

              <label>
                State
                <input
                  value={editing.state || ""}
                  onChange={e =>
                    setEditing({ ...editing, state: e.target.value })
                  }
                />
              </label>

              <label>
                Zipcode
                <input
                  value={editing.zipcode || ""}
                  onChange={e =>
                    setEditing({ ...editing, zipcode: e.target.value })
                  }
                />
              </label>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={!!editing.ticket_received}
                  onChange={e =>
                    setEditing({
                      ...editing,
                      ticket_received: e.target.checked ? 1 : 0
                    })
                  }
                />
                Ticket received
              </label>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={!!editing.voted}
                  onChange={e =>
                    setEditing({
                      ...editing,
                      voted: e.target.checked ? 1 : 0,
                      vote_date: e.target.checked
                        ? new Date().toISOString()
                        : null
                    })
                  }
                />
                Voted
              </label>
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={save}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
