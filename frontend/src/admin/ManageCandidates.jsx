import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  getCandidates,
  deleteCandidate,
  updateCandidate,
  addCandidate
} from "../api/api";
import AlertModal from "../components/AlertModal";

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [alert, setAlert] = useState({ show: false });

  const [newCandidate, setNewCandidate] = useState({
    full_name: "",
    position_id: "",
    photo: null
  });

  const load = async () => {
    const data = await getCandidates();
    setCandidates(data);
  };

  useEffect(() => {
    load();
  }, []);

  const showAlert = (title, message, footer) =>
    setAlert({ show: true, title, message, footer });

  const closeAlert = () => setAlert({ show: false });

  const columns = [
    {
      name: "Photo",
      cell: row => (
        <img
          src={`http://localhost:5000/uploads/${row.photo}`}
          alt={row.full_name}
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      )
    },
    { name: "Name", selector: row => row.full_name, sortable: true },
    { name: "Position", selector: row => row.position_name, sortable: true },

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
              `Delete candidate ${row.full_name}?`,
              <>
                <button
                  className="alert-btn"
                  onClick={async () => {
                    await deleteCandidate(row.id);
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

  const filtered = candidates.filter(c =>
    c.full_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="admin-page">
      <h2 className="admin-title">Manage Candidates</h2>

      <input
        className="search-box"
        placeholder="Search candidates..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <button className="action-btn add-btn" onClick={() => setAdding(true)}>
        Add New Candidate
      </button>

      <DataTable columns={columns} data={filtered} pagination />

      {/* ADD MODAL */}
      {adding && (
        <AlertModal
          show={true}
          title="Add New Candidate"
          message={
            <div className="modal-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={newCandidate.full_name}
                    onChange={e =>
                      setNewCandidate({
                        ...newCandidate,
                        full_name: e.target.value
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Position</label>
                  <select
                    value={newCandidate.position_id}
                    onChange={e =>
                      setNewCandidate({
                        ...newCandidate,
                        position_id: Number(e.target.value)
                      })
                    }
                  >
                    <option value="">Select Position</option>
                    <option value="1">President</option>
                    <option value="2">General Secretary</option>
                    <option value="3">Assistant General Secretary</option>
                    <option value="4">Vice President</option>
                    <option value="5">Treasurer</option>
                    <option value="6">Assistant Treasurer</option>
                    <option value="7">Organizing Secretary</option>
                    <option value="8">Sports Secretary</option>
                    <option value="9">Assistant Sports Secretary</option>
                    <option value="10">Joint Cultural Secretary</option>
                    <option value="11">Assistant Joint Cultural Secretary</option>
                    <option value="12">Executive Member 1</option>
                    <option value="13">Executive Member 2</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e =>
                      setNewCandidate({
                        ...newCandidate,
                        photo: e.target.files[0]
                      })
                    }
                  />

                  {newCandidate.photo && (
                    <img
                      src={URL.createObjectURL(newCandidate.photo)}
                      style={{ width: 80, height: 80, marginTop: 10 }}
                    />
                  )}
                </div>
              </div>
            </div>
          }
          footer={
            <>
              <button
                className="alert-btn"
                onClick={async () => {
                  const formData = new FormData();
                  formData.append("full_name", newCandidate.full_name);
                  formData.append("position_id", newCandidate.position_id);
                  formData.append("photo", newCandidate.photo);

                  await addCandidate(formData);

                  setAdding(false);
                  setNewCandidate({
                    full_name: "",
                    position_id: "",
                    photo: null
                  });
                  load();
                }}
              >
                Save
              </button>

              <button className="alert-btn" onClick={() => setAdding(false)}>
                Cancel
              </button>
            </>
          }
          onClose={() => setAdding(false)}
        />
      )}

      {/* EDIT MODAL */}
      {editing && (
        <AlertModal
          show={true}
          title="Edit Candidate"
          message={
            <div className="modal-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={editing.full_name}
                    onChange={e =>
                      setEditing({ ...editing, full_name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Position</label>
                  <select
                    value={editing.position_id}
                    onChange={e =>
                      setEditing({
                        ...editing,
                        position_id: Number(e.target.value)
                      })
                    }
                  >
                    <option value="1">President</option>
                    <option value="2">General Secretary</option>
                    <option value="3">Assistant General Secretary</option>
                    <option value="4">Vice President</option>
                    <option value="5">Treasurer</option>
                    <option value="6">Assistant Treasurer</option>
                    <option value="7">Organization Secretary</option>
                    <option value="8">Sports Secretary</option>
                    <option value="9">Assistant Sports Secretary</option>
                    <option value="10">Cultural Secretary</option>
                    <option value="11">Assistant Cultural Secretary</option>
                    <option value="12">Executive Member 1</option>
                    <option value="13">Executive Member 2</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e =>
                      setEditing({
                        ...editing,
                        newPhotoFile: e.target.files[0]
                      })
                    }
                  />

                  {editing.newPhotoFile ? (
                    <img
                      src={URL.createObjectURL(editing.newPhotoFile)}
                      style={{ width: 80, height: 80, marginTop: 10 }}
                    />
                  ) : (
                    <img
                      src={`http://localhost:5000/uploads/${editing.photo}`}
                      style={{ width: 80, height: 80, marginTop: 10 }}
                    />
                  )}
                </div>
              </div>
            </div>
          }
          footer={
            <>
              <button
                className="alert-btn"
                onClick={async () => {
                  const formData = new FormData();
                  formData.append("full_name", editing.full_name);
                  formData.append("position_id", editing.position_id);

                  if (editing.newPhotoFile) {
                    formData.append("photo", editing.newPhotoFile);
                  }

                  await updateCandidate(editing.id, formData);

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

      {/* GLOBAL ALERT */}
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
