import React from "react";

function RenewalCountdown({ subscriptions }) {
  const today = new Date();

  return (
    <div className="glass-card p-4 mt-4">
      <h3>⏳ Renewal Countdown</h3>

      {subscriptions.map((sub) => {
        const renewal = new Date(
          sub.next_billing_date
        );

        const diff = Math.ceil(
          (renewal - today) /
            (1000 * 60 * 60 * 24)
        );

        return (
          <div
            key={sub.id}
            className="alert alert-info mt-2"
          >
            {sub.service_name} renews in{" "}
            <strong>{diff}</strong> days
          </div>
        );
      })}
    </div>
  );
}

export default RenewalCountdown;