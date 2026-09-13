export default function VoterConfirm({ voter, onConfirm, onBack }) {
  return (
    <div>
      <h2>Confirm Your Identity</h2>
      <p><strong>Name:</strong> {voter.full_name}</p>
      <p><strong>Address:</strong> {voter.address}</p>
      <p><strong>City:</strong> {voter.city}</p>
      <p><strong>State:</strong> {voter.state}</p>
      <p><strong>ZipCode:</strong> {voter.zipcode}</p>
      <p><strong>Phone:</strong> {voter.phone}</p>

      <button onClick={onConfirm}>Yes, this is me</button>
      <button onClick={onBack} style={{ marginLeft: 10 }}>Back</button>
    </div>
  );
}
