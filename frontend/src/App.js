import { useState } from "react";
import VoterLookup from "./components/VoterLookup";
import VoterConfirm from "./components/VoterConfirm";
import Ballot from "./components/Ballot";
//import AdminPanel from "./components/AdminPanel";
import SummaryDashboard from "./components/SummaryDashboard";
import AdminLayout from "./admin/AdminLayout";
import ManageVoters from "./admin/ManageVoters";
import ManageCandidates from "./admin/ManageCandidates";

export default function App() {
  const [mode, setMode] = useState("voting"); // "voting" | "admin" | "summary"
  const [step, setStep] = useState("lookup"); // "lookup" | "confirm" | "ballot"
  const [voter, setVoter] = useState(null);

  const resetFlow = () => {
    setStep("lookup");
    setVoter(null);
  };

  

  return (
    <div style={{ padding: 20 }}>
      <h1>Election Voting System</h1>


      <div style={{ marginBottom: 20 }}>
        <button onClick={() => { setMode("voting"); resetFlow(); }}>Voting</button>
       
        <button onClick={() => setMode("summary")}>Summary</button>
      </div>
      

      {mode === "admin" && <AdminPanel />}
      {mode === "summary" && <SummaryDashboard />}

      {mode === "voting" && (
        <>
          {step === "lookup" && (
            <VoterLookup
              onFound={(v) => {
                setVoter(v);
                setStep("confirm");
              }}
            />
          )}

          {step === "confirm" && voter && (
            <VoterConfirm
              voter={voter}
              onConfirm={() => setStep("ballot")}
              onBack={resetFlow}
            />
          )}

          {step === "ballot" && voter && (
            <Ballot
              voter={voter}
              onDone={resetFlow}
            />
          )}
        </>
      )}
      
    </div>
  );
}
