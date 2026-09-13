import { useState, useEffect } from "react";
import { getVotingWindow } from "../api/api";

export default function Home() {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await getVotingWindow();
      const start = new Date(res.voting_start);

      const tick = () => {
        const now = new Date();
        if (now >= start) {
          setCountdown("Voting is now ACTIVE");
          return;
        }

        const diff = start - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown(`${hours}h ${minutes}m ${seconds}s until voting opens`);
      };

      tick();
      setInterval(tick, 1000);
    };

    load();
  }, []);

  return (
    <div className="countdown-banner">
      {countdown}
    </div>
  );
}
