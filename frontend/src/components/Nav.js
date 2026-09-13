import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav style={{ padding: 20, background: "#eee" }}>
      <Link to="/" style={{ marginRight: 20 }}>Home</Link>
      <Link to="/vote" style={{ marginRight: 20 }}>Vote</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}
