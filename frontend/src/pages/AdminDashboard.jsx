import React from "react";

function AdminDashboard() {
  return (
    <div className="container-fluid p-4">

      <h2 className="premium-title mb-4">
        Admin Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <h5>Total Users</h5>
            <h1>250</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <h5>Subscriptions</h5>
            <h1>1200</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <h5>Revenue</h5>
            <h1>₹2.5L</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <h5>Growth</h5>
            <h1>+18%</h1>
          </div>
        </div>

      </div>

      <div className="glass-card p-4 mt-4">

        <h3>Recent Users</h3>

        <table className="table mt-3">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>John</td>
              <td>john@gmail.com</td>
              <td>Pro</td>
            </tr>

            <tr>
              <td>Sarah</td>
              <td>sarah@gmail.com</td>
              <td>Enterprise</td>
            </tr>

            <tr>
              <td>Alex</td>
              <td>alex@gmail.com</td>
              <td>Free</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;