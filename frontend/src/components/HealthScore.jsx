import React from "react";

function HealthScore({ subscriptions }) {

  const active =
    subscriptions.filter(
      sub => sub.status === "Active"
    ).length;

  const score =
    subscriptions.length === 0
      ? 100
      : Math.round(
          (active /
          subscriptions.length) * 100
        );

  return (
    <div className="glass-card p-4 mt-4">

      <h3>💎 Subscription Health Score</h3>

      <h1
        style={{
          color:"#06B6D4"
        }}
      >
        {score}%
      </h1>

    </div>
  );
}

export default HealthScore;