import { Link, Outlet } from "react-router-dom";
import "../styles/admin.css";

export default function AdminLayout() {
  //const isAdmin = true; // change to false to hide edit/delete
//const isAdmin = localStorage.getItem("role") === "admin";

//if (!isAdmin) {
//  return <Navigate to="/admin/login" />;
//}

  return (
    <>


      <div className="admin-container">
        <aside className="admin-sidebar">
          <h2 className="admin-logo">Admin Panel</h2>

      <div className="admin-nav-buttons">
        <Link to="/admin/voters" className="admin-btn">Manage Voters</Link>
        <Link to="/admin/candidates" className="admin-btn">Manage Candidates</Link>
        <Link to="/voting" className="admin-btn admin-btn-secondary">Back to Voting</Link>
        <Link to="/summary" className="admin-btn admin-btn-secondary">Vote Summary</Link>
        <Link to="/admin/voting-date" className="admin-btn admin-btn-secondary">Voting Date Settings</Link>

      </div>
        </aside>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
