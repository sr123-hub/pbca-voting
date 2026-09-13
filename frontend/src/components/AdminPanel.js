import AddVoter from "./AddVoter";
import AddCandidate from "./AddCandidate";
import EditVoter from "./EditVoter";
import EditCandidate from "./EditCandidate";

export default function AdminPanel() {
  return (
    <div>
      <h2>Admin Panel</h2>

      <h3>Add New Records</h3>
      <AddVoter />
      <AddCandidate />

      <hr />

      <h3>Edit Existing Records</h3>
      <EditVoter />
      <EditCandidate />
    </div>
  );
}
