import React from "react";

function AIInsights({ subscriptions }) {

  const totalSpend = subscriptions.reduce(
    (sum, sub) => sum + Number(sub.cost),
    0
  );

  const expensive =
    subscriptions.sort(
      (a,b) => b.cost - a.cost
    )[0];

  return (
    <div className="glass-card p-4 mt-4">

      <h3>🤖 AI Insights</h3>

      <div className="alert alert-info mt-3">
        Monthly spend is ₹{totalSpend}
      </div>

      {expensive && (
        <div className="alert alert-warning">
          Highest subscription:
          {" "}
          {expensive.service_name}
          {" "}
          (₹{expensive.cost})
        </div>
      )}

      <div className="alert alert-success">
        Consider reviewing unused
        subscriptions to save money.
      </div>

    </div>
  );
}

export default AIInsights;