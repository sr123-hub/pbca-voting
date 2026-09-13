import { useState } from "react";
import VoterLookup from "../components/VoterLookup";
import VoterConfirm from "../components/VoterConfirm";
import Ballot from "../components/Ballot";

export default function VotingFlow() {
  const [step, setStep] = useState("lookup");
  const [voter, setVoter] = useState(null);

  const reset = () => {
    setStep("lookup");
    setVoter(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Election Voting System</h1>

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
          onBack={reset}
        />
      )}

      {step === "ballot" && voter && (
        <Ballot
          voter={voter}
          onDone={reset}
        />
      )}
    </div>
  );
}
