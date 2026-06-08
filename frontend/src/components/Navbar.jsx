import React from "react";
import NotificationBell from "./NotificationBell";
import ThemeToggle
from "./ThemeToggle";

function Navbar({ subscriptions = [] }) {
  return (
    <div
      className="glass-card p-3 mb-4"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h2 className="premium-title">
          SubSmart Premium
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >

        <ThemeToggle />
        
        <NotificationBell
          subscriptions={subscriptions}
        />

        

        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#4F46E5,#06B6D4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          S
        </div>
      </div>
    </div>
  );
}

export default Navbar;