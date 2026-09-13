import React, { useState } from "react";
import Ballot from "../components/Ballot";

export default function VotingScreen() {
  return (
    <div style={{ padding: 20 }}>
      <Ballot voter={{ voter_id: 1 }} onDone={() => {}} />
    </div>
  );
}
