import React, { useState } from "react";
//import { adminLogin } from "../api/api";
import "../styles/AdminLogin.css";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await adminLogin({ username, password });

    if (res.error) {
      setError(res.error);
      return;
    }

    localStorage.setItem("role", res.role);
    localStorage.setItem("adminUser", res.username);

    onLogin && onLogin(res.role);
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>

      {error && <div className="login-error">{error}</div>}

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
