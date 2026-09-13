import React from "react";
import VoterDataTable from "../components/VoterDataTable";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-wrapper">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <p className="admin-subtitle">Manage voters, update records, and maintain election integrity.</p>
      </header>

      <section className="admin-section">
        <VoterDataTable />
      </section>
    </div>
  );
}
