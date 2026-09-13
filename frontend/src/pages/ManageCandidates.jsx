import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getCandidates, deleteCandidate } from "../api/api";
import EditCandidateModal from "../components/EditCandidateModal";

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const data = await getCandidates();
    setCandidates(data);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = candidates.filter(c =>
    c.full_name.toLowerCase().includes(filter.toLowerCase()) ||
    c.position_name.toLowerCase().includes(filter.toLowerCase())
  );

  const columns = [
    {
      name: "Photo",
      cell: row =>
        row.photo ? (
          <img
            src={`http://localhost:5000/uploads/${row.photo}`}
            alt={row.full_name}
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        ) : (
          "No Photo"
        )
    },
    { name: "Name", selector: row => row.full_name, sortable: true },
    { name: "Position", selector: row => row.position_name, sortable: true },
    {
      name: "Edit",
      cell: row => <button onClick={() => setEditing(row)}>Edit</button>,
      ignoreRowClick: true
    },
    {
      name: "Delete",
      cell: row => (
        <button
          onClick={async () => {
            if (window.confirm("Delete this candidate?")) {
              await deleteCandidate(row.id);
              load();
            }
          }}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true
    }
  ];

  return (
    <div>
      <h2>Manage Candidates</h2>

      <input
        placeholder="Search candidates..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ marginBottom: 10, padding: 8, width: "100%" }}
      />

      <DataTable
        columns={columns}
        data={filtered}
        pagination
        highlightOnHover
        striped
      />

      {editing && (
        <EditCandidateModal
          candidate={editing}
          onClose={() => setEditing(null)}
          onSave={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}
