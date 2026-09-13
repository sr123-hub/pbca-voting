import React, { useState } from "react";
import CandidateTable from "./CandidateTable";
import VoterTable from "./VoterTable";

export default function AdminDashboard() {
  const [tab, setTab] = useState("candidates");

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <div className="admin-tabs">
        <button
          className={tab === "candidates" ? "active" : ""}
          onClick={() => setTab("candidates")}
        >
          Candidates
        </button>

        <button
          className={tab === "voters" ? "active" : ""}
          onClick={() => setTab("voters")}
        >
          Voters
        </button>
      </div>

      {tab === "candidates" && <CandidateTable />}
      {tab === "voters" && <VoterTable />}
    </div>
  );
}