import React from "react";

function RenewalAlerts({ subscriptions }) {
  return (
    <div className="card shadow border-0 mt-4">
      <div className="card-body">
        <h3 className="fw-bold">Upcoming Renewals</h3>

        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="alert alert-info mt-2"
          >
            {sub.service_name} renews on{" "}
            {sub.next_billing_date}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RenewalAlerts;