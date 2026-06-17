import React from "react";

function FloatingButton({ onClick }) {
  return (
    <button
      className="floating-btn"
      onClick={onClick}
      title="Add Subscription"
    >
      +
    </button>
  );
}

export default FloatingButton;