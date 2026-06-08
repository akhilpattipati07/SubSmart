import React from "react";

function RenewalSummary({
  subscriptions,
}) {

  const upcoming =
    subscriptions.filter(
      (sub) =>
        sub.next_billing_date
    ).length;

  return (
    <div className="glass-card p-4">

      <h3>
        ⏰ Renewal Summary
      </h3>

      <h1>
        {upcoming}
      </h1>

      <p>
        Upcoming renewals
      </p>

    </div>
  );
}

export default RenewalSummary;