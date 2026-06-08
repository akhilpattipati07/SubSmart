import React from "react";

function RecentActivity() {

  return (
    <div className="glass-card p-4">

      <h3 className="mb-4">
        Recent Activity
      </h3>

      <div className="alert alert-info">
        Netflix subscription added
      </div>

      <div className="alert alert-success">
        PDF report exported
      </div>

      <div className="alert alert-warning">
        Spotify renews tomorrow
      </div>

      <div className="alert alert-danger">
        Prime Video removed
      </div>

    </div>
  );
}

export default RecentActivity;