import React, { useState } from "react";
import { FaBell } from "react-icons/fa";

function NotificationBell({ subscriptions }) {

  const [show, setShow] = useState(false);

  const notifications = subscriptions.filter(
    (sub) => sub.next_billing_date
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <button
        className="btn btn-dark"
        onClick={() => setShow(!show)}
      >
        <FaBell />

        <span
          className="badge bg-danger ms-2"
        >
          {notifications.length}
        </span>
      </button>

      {show && (
        <div
          className="glass-card p-3"
          style={{
            position: "absolute",
            right: 0,
            top: "60px",
            width: "350px",
            zIndex: 1000,
          }}
        >
          <h5>Notifications</h5>

          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((sub) => (
              <div
                key={sub.id}
                className="alert alert-warning mt-2"
              >
                {sub.service_name}
                {" "}renews on{" "}
                {sub.next_billing_date}
              </div>
            ))
          )}

        </div>
      )}
    </div>
  );
}

export default NotificationBell;