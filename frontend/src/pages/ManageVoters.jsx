import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getVoters, deleteVoter } from "../api/api";
import EditVoterModal from "../components/EditVoterModal";

export default function ManageVoters() {
  const [voters, setVoters] = useState([]);
  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const data = await getVoters();
    setVoters(data);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = voters.filter(v =>
    v.full_name.toLowerCase().includes(filter.toLowerCase()) ||
    v.address.toLowerCase().includes(filter.toLowerCase()) ||
    v.city.toLowerCase().includes(filter.toLowerCase()) ||
    v.state.toLowerCase().includes(filter.toLowerCase()) ||
    v.zipcode.toLowerCase().includes(filter.toLowerCase()) ||
    v.phone.toLowerCase().includes(filter.toLowerCase())
  );

  const columns = [
    { name: "Name", selector: row => row.full_name, sortable: true },
    { name: "Address", selector: row => row.address, sortable: true },
    { name: "City", selector: row => row.city, sortable: true },
    { name: "State", selector: row => row.state, sortable: true },
    { name: "ZipCode", selector: row => row.zipcode, sortable: true },
    { name: "Phone", selector: row => row.phone },
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
            if (window.confirm("Delete this voter?")) {
              await deleteVoter(row.voter_id);
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
      <h2>Manage Voters</h2>

      <input
        placeholder="Search voters..."
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
        <EditVoterModal
          voter={editing}
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
