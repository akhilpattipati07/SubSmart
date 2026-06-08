import React from "react";

function UpcomingPayments({
  subscriptions,
}) {

  const total =
    subscriptions.reduce(
      (sum, sub) =>
        sum + Number(sub.cost),
      0
    );

  return (
    <div className="glass-card p-4">

      <h3>
        💳 Upcoming Payments
      </h3>

      <h1
        style={{
          color:"#10B981"
        }}
      >
        ₹{total}
      </h1>

      <p>
        Expected next billing
        amount
      </p>

    </div>
  );
}

export default UpcomingPayments;