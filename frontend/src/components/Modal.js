import React from "react";
import "../styles/Modal.css";

export default function Modal({ show, title, message, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="modal-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
