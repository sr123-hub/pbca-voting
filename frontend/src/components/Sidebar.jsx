import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Admin Panel</div>

      <nav className="sidebar-nav">
        <NavLink to="/admin" className="sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/admin/voters" className="sidebar-link">
          Voters
        </NavLink>

        <NavLink to="/admin/candidates" className="sidebar-link">
          Candidates
        </NavLink>

        <NavLink to="/admin/summary" className="sidebar-link">
          Summary
        </NavLink>
        <NavLink to="/admin/manage-voters">Manage Voters</NavLink>
<NavLink to="/admin/manage-candidates">Manage Candidates</NavLink>

      </nav>
    </aside>
  );
}
