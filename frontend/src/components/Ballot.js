import React, { useEffect, useState } from "react";
import { getCandidates, submitVote } from "../api/api";
import "../styles/Ballot.css";
import "../styles/global.css";
import AlertModal from "../components/AlertModal";

export default function Ballot({ voter, onDone }) {
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState({});
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    footer: null
  });

  useEffect(() => {
    getCandidates().then(data => {
      setCandidates(data);
    });
  }, []);

  const positions = [...new Set(candidates.map(c => c.position_id))];
  const allSelected = positions.every(pos => selected[pos]);

  const showAlert = (title, message, footer = null) => {
    setAlert({ show: true, title, message, footer });
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, show: false }));
  };

  const trySubmit = () => {
    const missing = positions.filter(pos => !selected[pos]);

    if (missing.length > 0) {
      showAlert(
        "Missing Selection",
        "You must select a candidate for every position.",
        <button className="alert-btn" onClick={closeAlert}>Got it</button>
      );
      return;
    }

    setConfirmSubmit(true);
  };

  const handleSelect = (position_id, candidate_id) => {
    setSelected(prev => ({
      ...prev,
      [position_id]: candidate_id
    }));
  };

  const handleSubmit = async () => {
    setConfirmSubmit(false);
    setLoading(true);

    try {
      const selections = Object.keys(selected).map(position_id => ({
        position_id: Number(position_id),
        candidate_id: selected[position_id]
      }));

      //const res = await submitVote({ voter_id: voter.voter_id, selections });
      const res = await submitVote({
        voter_id: voter.voter_id,
        voting_location: voter.voting_location,
        selections
      });

      setLoading(false);

      showAlert(
        res.title || "Successful",
        res.message || "Your vote has been submitted.",
        <button className="alert-btn" onClick={closeAlert}>OK</button>
      );

      onDone();

    } catch (err) {
      setLoading(false);

      showAlert(
        err.title || "Error",
        err.message || "Something went wrong.",
        <button className="alert-btn" onClick={closeAlert}>OK</button>
      );
    }
  };

  // Group candidates by position
  const grouped = candidates.reduce((acc, c) => {
    if (!acc[c.position_name]) acc[c.position_name] = [];
    acc[c.position_name].push(c);
    return acc;
  }, {});

  // Custom ballot layout
  const candidateOrder = {
    President: ["Alice Johnson", "Bob Smith", "Charlie Lee"],
    Secretary: ["John Doe", "Mary Adams"],
    Treasurer: ["Kevin Brown", "Linda White"]
  };

  //const positionOrder = ["President", "Vice President", "Secretary", "Treasurer"];
  const positionOrder = [
    "President",
    "Vice President",
    "General Secretary",
    "Assistant General Secretary",
    "Treasurer",
    "Assistant Treasurer",
    "Organizing Secretary",
    "Joint Cultural Secretary",
    "Assistant Joint Cultural Secretary",
    "Sports Secretary",
    "Assistant Sports Secretary",
    "Executive Member 1",
    "Executive Member 2"
  ];

  return (
    <div className="ballot-container">
      <h2 className="ballot-title">Ballot</h2>

      {Object.keys(grouped)
  .sort((a, b) => positionOrder.indexOf(a) - positionOrder.indexOf(b))
  .map(position => (
    <div key={position} className="position-section">
      <h3 className="position-title">{position}</h3>
      <hr className="position-divider" />

      <div className="candidate-row">
        {grouped[position]
          .map(c => (
            <div
              key={c.id}
              className={`candidate-card ${
                selected[c.position_id] === c.id ? "selected" : ""
              }`}
              onClick={() => handleSelect(c.position_id, c.id)}
            >
              <img
                src={`http://localhost:5000/uploads/${c.photo}`}
                alt={c.full_name}
                className="candidate-photo"
              />

              <div className="candidate-info">
                <div className="candidate-name">{c.full_name}</div>
              </div>

              <div className="candidate-check">
                {selected[c.position_id] === c.id && (
                  <img src="/GreenCheck.jpg" alt="selected" />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  ))}


      {/* Alert Modal */}
      <AlertModal
        show={alert.show}
        title={alert.title}
        message={alert.message}
        footer={alert.footer}
        onClose={closeAlert}
      />

      {/* Confirmation Modal */}
      <AlertModal
        show={confirmSubmit}
        title="Confirm Your Vote"
        message="Are you sure you want to submit your vote? You cannot change it afterward."
        footer={
          <>
            <button className="alert-btn" onClick={handleSubmit}>Yes, Submit</button>
            <button className="alert-btn" onClick={() => setConfirmSubmit(false)}>Cancel</button>
          </>
        }
        onClose={() => setConfirmSubmit(false)}
      />

      {/* Submit Button */}
      <button
        className="ballot-submit"
        onClick={trySubmit}
        disabled={!allSelected || loading}
      >
        {loading ? "Submitting..." : "Submit Vote"}
      </button>
    </div>
  );
}
