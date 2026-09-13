import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./admin/AdminLayout";
import ManageVoters from "./admin/ManageVoters";
import ManageCandidates from "./admin/ManageCandidates";

import VoterLookup from "./components/VoterLookup";
import VoterConfirm from "./components/VoterConfirm";
import Ballot from "./components/Ballot";

import VotingScreen from "./pages/VotingScreen";
import BallotScreen from "./pages/BallotScreen";

import SummaryDashboard from "./components/SummaryDashboard";
import VotingFlow from "./pages/VotingFlow";
import AdminVotingDate from "./admin/AdminVotingDate";
//import AdminLogin from "./components/AdminLogin";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Voting Flow */}
        <Route path="/" element={<VotingFlow />} />
        <Route path="/voting" element={<VotingFlow />} />
        {/* Summary */}
        <Route path="/summary" element={<SummaryDashboard />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="voters" element={<ManageVoters />} />
          <Route path="candidates" element={<ManageCandidates />} />
          <Route path="voting" element={<VotingScreen />} />
          <Route path="ballot" element={<BallotScreen />} />
          <Route path="/admin/voting-date" element={<AdminVotingDate />} />
          
            

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
