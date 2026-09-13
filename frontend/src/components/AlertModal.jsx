import React from "react";
import "../styles/AlertModal.css";

export default function AlertModal({ show, title, message, footer, onClose }) {
  if (!show) return null;


  return (
    <div className="alert-overlay">
      <div className="alert-box">

        {/* Header */}
        <div className="alert-header">
          <h3>{title}</h3>
        </div>

        {/* Body */}
        <div className="alert-body">
          <p>{message}</p>
        </div>

        {/* Footer */}
        <div className="alert-footer">
          {footer ? footer : (
            <button className="alert-btn" onClick={onClose}>
              OK
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
