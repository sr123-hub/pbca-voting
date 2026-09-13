import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import VotingScreen from "./pages/VotingScreen";
import AdminDashboard from "./pages/AdminDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vote" element={<VotingScreen />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/ballot/:voter_id" element={<Ballot />} />
      <Route path="candidates" element={<ManageCandidates isAdmin={true} />} />
      <Route path="/admin/login" element={<AdminLogin onLogin={() => navigate("/admin")} />}/>

    </Routes>
  );
}
