import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getAllVoters, deleteVoter, updateVoter, addVoter, importVoters } from "../api/api";
import AlertModal from "../components/AlertModal";


export default function ManageVoters() {
  const [voters, setVoters] = useState([]);
  const [viewing, setViewing] = useState(null);
  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState(null);
  const [alert, setAlert] = useState({ show: false });
  const [confirmImport, setConfirmImport] = useState(false);
  const [file, setFile] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newVoter, setNewVoter] = useState({
    voter_id: "",
    full_name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    voted: ""
  });

  const load = async () => {
    const data = await getAllVoters();
    setVoters(data);
  };

  useEffect(() => {
    load();
  }, []);

  const showAlert = (title, message, footer) =>
    setAlert({ show: true, title, message, footer });

  const closeAlert = () => setAlert({ show: false });

  const handleImport = async () => {
  setConfirmImport(false);

  try {
    const res = await importVoters(file);
    showAlert(res.title, res.message);

    getAllVoters().then(setVoters); // refresh table

  } catch (err) {
    showAlert(err.title || "Error", err.message || "Failed to import voters.");
  }
};

  const columns = [
    { name: "ID", selector: row => row.voter_id, sortable: true  },
    {
      name: "Name",
      selector: row => row.full_name,
      sortable: true,
      cell: row => (
        <span
          className="link-cell"
          onClick={() => setViewing(row)}
        >
          {row.full_name}
        </span>
      )
    },
    { name: "Address", selector: row => row.address },
    { name: "City", selector: row => row.city, sortable: true  },
    { name: "State", selector: row => row.state, sortable: true  },
    { name: "ZipCode", selector: row => row.zipcode, sortable: true  },
    { name: "Phone", selector: row => row.phone },
    { name: "Voted", selector: row => row.voted },
    {
      name: "Edit",
      cell: row => (
        <button className="action-btn edit-btn" onClick={() => setEditing(row)}>
          Edit
        </button>
      )
    },
    {
      name: "Delete",
      cell: row => (
        <button
          className="action-btn delete-btn"
          onClick={() =>
            showAlert(
              "Confirm Delete",
              `Delete voter ${row.full_name}?`,
              <>
                <button
                  className="alert-btn"
                  onClick={async () => {
                    await deleteVoter(row.voter_id);
                    closeAlert();
                    load();
                  }}
                >
                  Yes
                </button>
                <button className="alert-btn" onClick={closeAlert}>
                  Cancel
                </button>
              </>
            )
          }
        >
          Delete
        </button>
      )
    }
  ];

  const filtered = voters.filter(v =>
    v.full_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="admin-page">
      <h2 className="admin-title">Manage Voters</h2>

      <input
        className="search-box"
        placeholder="Search voters..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
<button
  className="action-btn add-btn"
  onClick={() => setAdding(true)}
>
  Add New Voter
</button>
<div className="import-section">
  <input
    type="file"
    accept=".csv"
    onChange={(e) => setFile(e.target.files[0])}
  />

  <button
    className="admin-btn"
    onClick={() => {
      if (!file) {
        showAlert("No File Selected", "Please choose a CSV file first.");
        return;
      }
      setConfirmImport(true);
    }}
  >
    Import Voters (CSV)
  </button>
</div>

      <DataTable columns={columns} data={filtered} pagination />
{viewing && (
  <div className="modal-overlay">
    <div className="modal-box">

      <h3 className="modal-title">Voter Details</h3>

      <div className="details-grid">

        <div><strong>Voter ID:</strong> {viewing.voter_id}</div>
        <div><strong>Name:</strong> {viewing.full_name}</div>
        <div><strong>Address:</strong> {viewing.address}</div>
        <div><strong>City:</strong> {viewing.city || "—"}</div>
        <div><strong>State:</strong> {viewing.state || "—"}</div>
        <div><strong>Zipcode:</strong> {viewing.zipcode || "—"}</div>
        <div><strong>Phone:</strong> {viewing.phone}</div>
        <div><strong>Voted:</strong> {viewing.voted ? "Yes" : "No"}</div>
        <div><strong>Vote Date:</strong> {viewing.vote_date || "—"}</div>

      </div>

      <div className="modal-actions">
        <button className="alert-btn" onClick={() => setViewing(null)}>
          Close
        </button>
      </div>

    </div>
  </div>
)}


{editing && (
  <AlertModal
    show={true}
    title="Edit Voter"
    message=
          {
            <div className="modal-content">
              <div className="form-grid">

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    value={editing.full_name}
                    onChange={e =>
                      setEditing({ ...editing, full_name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    value={editing.address}
                    onChange={e =>
                      setEditing({ ...editing, address: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    value={editing.city || ""}
                    onChange={e => setEditing({ ...editing, city: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    value={editing.state || ""}
                    onChange={e => setEditing({ ...editing, state: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Zipcode</label>
                  <input
                    value={editing.zipcode || ""}
                    onChange={e => setEditing({ ...editing, zipcode: e.target.value })}
                  />
                </div>


                <div className="form-group">
                  <label>Phone</label>
                  <input
                    value={editing.phone}
                    onChange={e =>
                      setEditing({ ...editing, phone: e.target.value })
                    }
                  />
                </div>

                
                <div className="form-group">
                    <label>Voted</label>
                      <input
                        type="checkbox"
                        checked={editing.voted === 1}
                        onChange={e =>
                          setEditing({
                            ...editing,
                            voted: e.target.checked ? 1 : 0
                          })
                        }
                      />

                </div>
            </div>
            </div>

          }
    footer={
      <>
        <button
          className="alert-btn"
          onClick={async () => {
            await updateVoter(editing.voter_id, editing);
            setEditing(null);
            load();
          }}
        >
          Save
        </button>

        <button className="alert-btn" onClick={() => setEditing(null)}>
          Cancel
        </button>
      </>
    }
    onClose={() => setEditing(null)}
  />
)}
{adding && (
  <AlertModal
    show={true}
    title="Add New Voter"
    message={
      <div className="modal-content">
      <div className="form-grid">

      <div className="form-group">

        <label>Voter ID</label>
        <input
          value={newVoter.voter_id}
          onChange={e =>
            setNewVoter({ ...newVoter, voter_id: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Full Name</label>
        <input
          value={newVoter.full_name}
          onChange={e =>
            setNewVoter({ ...newVoter, full_name: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          value={newVoter.address}
          onChange={e =>
            setNewVoter({ ...newVoter, address: e.target.value })
          }
        />
      </div>

        <div className="form-group">
        <label>City</label>
        <input
          value={newVoter.city}
          onChange={e =>
            setNewVoter({ ...newVoter, city: e.target.value })
          }
        />
      </div>
        <div className="form-group">
        <label>State</label>
        <input
          value={newVoter.state}
          onChange={e =>
            setNewVoter({ ...newVoter, state: e.target.value })
          }
        />
      </div>
        <div className="form-group">
        <label>ZipCode</label>
        <input
          value={newVoter.zipcode}
          onChange={e =>
            setNewVoter({ ...newVoter, zipcode: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          value={newVoter.phone}
          onChange={e =>
            setNewVoter({ ...newVoter, phone: e.target.value })
          }
        />
      </div>
      </div>
    </div>

    }
    footer={
      <>
        <button
          className="alert-btn"
          onClick={async () => {
            await addVoter(newVoter);
            setAdding(false);
            setNewVoter({
              voter_id: "",
              full_name: "",
              address: "",
              city: "",
              state: "",
              zipcode: "",
              phone: "",
              voted: ""
            });
            load();
          }}
        >
          Save
        </button>

        <button
          className="alert-btn"
          onClick={() => setAdding(false)}
        >
          Cancel
        </button>
      </>
    }
    onClose={() => setAdding(false)}
  />
)}
<AlertModal
  show={confirmImport}
  title="Confirm Import"
  message="Are you sure you want to import voters from this CSV file?"
  footer={
    <>
      <button className="alert-btn" onClick={handleImport}>Yes, Import</button>
      <button className="alert-btn" onClick={() => setConfirmImport(false)}>Cancel</button>
    </>
  }
  onClose={() => setConfirmImport(false)}
/>

      <AlertModal
        show={alert.show}
        title={alert.title}
        message={alert.message}
        footer={alert.footer}
        onClose={closeAlert}
      />
    </div>
  );
}
