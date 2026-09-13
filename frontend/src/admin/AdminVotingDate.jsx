import { useState, useEffect } from "react";
import {
  getVotingWindow,
  getVotingDate,
  updateVotingWindow
} from "../api/api";
import AlertModal from "../components/AlertModal";

export default function AdminVotingDate() {
  const [votingDate, setVotingDate] = useState("");
  const [votingStart, setVotingStart] = useState("");
  const [votingEnd, setVotingEnd] = useState("");
  const [alert, setAlert] = useState({ show: false });

  const [countdown, setCountdown] = useState("");
  const [status, setStatus] = useState("");

  // Load settings
  useEffect(() => {
    const load = async () => {
      const windowRes = await getVotingWindow();

    setVotingStart(windowRes.voting_start || "");
    setVotingEnd(windowRes.voting_end || "");

    if (windowRes.voting_start) {
      setVotingDate(windowRes.voting_start.split("T")[0]);
    }
  };

    load();
  }, []);

  // Auto‑derive voting_date from voting_start
  useEffect(() => {
    if (votingStart) {
      setVotingDate(votingStart.split("T")[0]);
    }
  }, [votingStart]);

  // Countdown + Status
  useEffect(() => {
    const timer = setInterval(() => {
      if (!votingStart || !votingEnd) return;

      const now = new Date();
      const start = new Date(votingStart);
      const end = new Date(votingEnd);

      if (now < start) {
        const diff = start - now;
        const hours = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        setCountdown(`${hours}h ${mins}m until voting opens`);
        setStatus("CLOSED");
      } else if (now >= start && now <= end) {
        setCountdown("Voting is currently open");
        setStatus("OPEN");
      } else {
        setCountdown("Voting has ended");
        setStatus("CLOSED");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [votingStart, votingEnd]);

  const showAlert = (title, message) =>
    setAlert({
      show: true,
      title,
      message,
      footer: (
        <button className="alert-btn" onClick={() => setAlert({ show: false })}>
          OK
        </button>
      )
    });

  const saveVotingWindow = async () => {
    if (!votingStart || !votingEnd) {
      showAlert("Error", "Voting start and end times are required.");
      return;
    }

    const voting_date = votingStart.split("T")[0];
    const res = await updateVotingWindow({
      voting_start: votingStart,
      voting_end: votingEnd
    });

    if (res.error) {
      showAlert("Error", res.error);
    } else {
      showAlert("Saved", "Voting window updated successfully.");
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Voting Date Settings</h2>

      <div className="form-group">
        <label>Voting Date (auto‑derived)</label>
        <input type="date" value={votingDate} readOnly />
      </div>

      <h2 className="admin-title">Voting Window Editor</h2>

      <div className="form-group">
        <label>Voting Start</label>
        <input
          type="datetime-local"
          value={votingStart}
          onChange={e => setVotingStart(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Voting End</label>
        <input
          type="datetime-local"
          value={votingEnd}
          onChange={e => setVotingEnd(e.target.value)}
        />
      </div>

      <button className="action-btn" onClick={saveVotingWindow}>
        Save Voting Window
      </button>

      <h3 className="admin-title">Voting Status</h3>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Countdown:</strong> {countdown}</p>

      <AlertModal
        show={alert.show}
        title={alert.title}
        message={alert.message}
        footer={alert.footer}
        onClose={() => setAlert({ show: false })}
      />
    </div>
  );
}
