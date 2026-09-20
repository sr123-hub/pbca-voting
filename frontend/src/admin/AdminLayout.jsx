import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/admin.css";
import { resetVotes } from "../api/api";
import AlertModal from "../components/AlertModal"; // adjust path if needed

export default function AdminLayout() {
  const [confirmReset, setConfirmReset] = useState(false);
  const [alert, setAlert] = useState({ show: false });

  const handleResetVotes = async () => {
    setConfirmReset(false);

    try {
      const res = await resetVotes();
      setAlert({
        show: true,
        title: res.title,
        message: res.message
      });
    } catch (err) {
      setAlert({
        show: true,
        title: "Error",
        message: "Failed to reset votes."
      });
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin Panel</h2>

        <div className="admin-buttons">
  <Link to="/admin/voters" className="admin-btn">Manage Voters</Link>
  <Link to="/admin/candidates" className="admin-btn">Manage Candidates</Link>
  <Link to="/voting" className="admin-btn">Back to Voting</Link>
  <Link to="/summary" className="admin-btn">Vote Summary</Link>
  <Link to="/admin/voting-date" className="admin-btn">Voting Date Settings</Link>
  <Link to="/view-voters" className="admin-btn">View Voters</Link>
  
</div>


        <button
          className="btn btn-danger mt-3"
          onClick={() => setConfirmReset(true)}
        >
          Reset All Votes
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>

      {/* Confirmation Modal */}
      <AlertModal
        show={confirmReset}
        title="Confirm Reset"
        message="Are you sure you want to reset ALL votes? This action cannot be undone."
        footer={
          <>
            <button className="btn btn-danger" onClick={handleResetVotes}>
              Yes, Reset
            </button>
            <button className="btn btn-secondary" onClick={() => setConfirmReset(false)}>
              Cancel
            </button>
          </>
        }
        onClose={() => setConfirmReset(false)}
      />

      {/* Alert Modal */}
      <AlertModal
        show={alert.show}
        title={alert.title}
        message={alert.message}
        footer={
          <button className="btn btn-primary" onClick={() => setAlert({ show: false })}>
            OK
          </button>
        }
        onClose={() => setAlert({ show: false })}
      />
    </div>
  );
}
