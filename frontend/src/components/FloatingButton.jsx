import React from "react";

function FloatingButton() {
  return (
    <button
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "65px",
        height: "65px",
        borderRadius: "50%",
        border: "none",
        background:
          "linear-gradient(135deg,#4F46E5,#06B6D4)",
        color: "white",
        fontSize: "30px",
        boxShadow:
          "0 10px 30px rgba(79,70,229,.5)",
        zIndex: 9999,
      }}
    >
      +
    </button>
  );
}

export default FloatingButton;