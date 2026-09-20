import { useState, useEffect } from "react";
import { lookupVoter, getVotingWindow } from "../api/api";
import AlertModal from "../components/AlertModal";
import "../styles/global.css";

export default function VoterLookup({ onFound }) {
  const [voterId, setVoterId] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [expired, setExpired] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [clock, setClock] = useState("");
  const [status, setStatus] = useState("");
  const [votingInfo, setVotingInfo] = useState({});

  // ⭐ NEW: Voting Location dropdown
  const [votingLocation, setVotingLocation] = useState("");

  // 🕒 Live Clock
  useEffect(() => {
    const tickClock = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString());
    };
    tickClock();
    const interval = setInterval(tickClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🗳 Voting Window Countdown + Status Widget
  useEffect(() => {
    const load = async () => {
      const res = await getVotingWindow();
      if (!res) return;

      const start = new Date(res.voting_start);
      const end = new Date(res.voting_end);

      const votingDate = start.toLocaleDateString();
      const votingStartTime = start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const votingEndTime = end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setVotingInfo({
        date: votingDate,
        start: votingStartTime,
        end: votingEndTime
      });

      const tick = () => {
        const now = new Date();

        if (now < start) {
          const diff = start - now;
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setCountdown(`${hours}h ${minutes}m ${seconds}s until voting opens`);
          setStatus(`Opens in ${hours}h ${minutes}m`);
          setExpired(true);
        } else if (now > end) {
          setCountdown("Voting has ended.");
          setStatus("Voting Closed");
          setExpired(true);
        } else {
          setCountdown("Voting is ACTIVE");
          setStatus("Voting Active");
          setExpired(false);
        }
      };

      tick();
      const interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    };

    load();
  }, []);

  // 🧩 Voter Lookup Submit
  const submit = async () => {
    if (!voterId) {
      setAlert({
        show: true,
        title: "Missing Voter ID",
        message: "Please enter a voter ID before continuing.",
        footer: (
          <button className="alert-btn" onClick={() => setAlert({ show: false })}>
            OK
          </button>
        ),
      });
      return;
    }

    if (!votingLocation) {
      setAlert({
        show: true,
        title: "Missing Voting Location",
        message: "Please select a voting location.",
        footer: (
          <button className="alert-btn" onClick={() => setAlert({ show: false })}>
            OK
          </button>
        ),
      });
      return;
    }

    try {
      const data = await lookupVoter(voterId);

      // ⭐ Attach selected location
      data.voting_location = votingLocation;

      if (typeof onFound === "function") {
        onFound(data);
      }
    } catch (err) {
      setAlert({
        show: true,
        title: err.title || "Lookup Error",
        message: err.message || err.error || "Something went wrong.",
        footer: (
          <button className="alert-btn" onClick={() => setAlert({ show: false })}>
            OK
          </button>
        ),
      });
    }
  };

  // 🧱 Voting Closed Screen
  if (expired) {
    return (
      <AlertModal
        show={true}
        title="Voting Closed"
        message={countdown}
        footer={<button className="alert-btn">OK</button>}
        onClose={() => {}}
      />
    );
  }

  // 🧱 Main Voting Screen
  return (
    <>
      <div className="countdown-banner">
        <div>{countdown}</div>
        <div className="live-clock">Current Time: {clock}</div>

        <div className="voting-window">
          <br />Voting Date: {votingInfo.date}&nbsp;&nbsp;
          Start Time: {votingInfo.start}&nbsp;&nbsp;
          End Time: {votingInfo.end}
        </div>

        {/* ⭐ NEW: Voting Location Dropdown */}
        <div className="voting-location">
          Voting Location:&nbsp;
          <select
            value={votingLocation}
            onChange={(e) => setVotingLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Woodside">Woodside</option>
            <option value="Jersey">Jersey</option>
            <option value="Connecticut">Connecticut</option>
          </select>
        </div>
      </div>

      <div>
        <h2>Enter Voter ID</h2>

        <input
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          placeholder="Voter ID"
        />

        <button onClick={submit}>Continue</button>

        <AlertModal
          show={alert.show}
          title={alert.title}
          message={alert.message}
          footer={alert.footer}
          onClose={() => setAlert({ show: false })}
        />
      </div>
    </>
  );
}
