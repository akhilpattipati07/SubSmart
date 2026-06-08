import React from "react";

function NotificationCenter({ subscriptions }) {
  const upcoming = subscriptions.filter(
    (sub) => sub.next_billing_date
  );

  return (
    <div className="glass-card p-4 mt-4">
      <h3>🔔 Notifications</h3>

      {upcoming.length === 0 ? (
        <p>No upcoming renewals</p>
      ) : (
        upcoming.map((sub) => (
          <div
            key={sub.id}
            className="alert alert-warning mt-3"
          >
            {sub.service_name} renewal on{" "}
            {sub.next_billing_date}
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationCenter;