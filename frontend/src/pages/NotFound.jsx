export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Invalid Voting Location</h2>
      <p>The page you’re trying to access doesn’t exist or isn’t a valid voting site.</p>
      <a href="/" style={{ color: "#007bff", textDecoration: "underline" }}>
        Go back to Home
      </a>
    </div>
  );
}
