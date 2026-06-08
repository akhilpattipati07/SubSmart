import React from "react";

function SavingsAdvisor({ subscriptions }) {

  const total =
    subscriptions.reduce(
      (sum, sub) =>
        sum + Number(sub.cost),
      0
    );

  const yearly =
    total * 12;

  return (
    <div className="glass-card p-4">

      <h3>💰 Savings Advisor</h3>

      <p>
        Current Monthly Spend:
      </p>

      <h2>₹{total}</h2>

      <p>
        Estimated Annual Spend:
      </p>

      <h2>₹{yearly}</h2>

      <div className="alert alert-success mt-3">
        Cancelling one unused
        subscription could save
        ₹500–₹2000/year.
      </div>

    </div>
  );
}

export default SavingsAdvisor;