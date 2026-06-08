import React from "react";

function ForecastCard({ subscriptions }) {

  const total =
    subscriptions.reduce(
      (sum, sub) =>
        sum + Number(sub.cost),
      0
    );

  const yearly =
    total * 12;

  return (
    <div className="glass-card p-4 mt-4">

      <h3>📈 Spending Forecast</h3>

      <h2>
        ₹{yearly}
      </h2>

      <p>
        Estimated yearly spending
      </p>

    </div>
  );
}

export default ForecastCard;