import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AdminDashboard() {

  const navigate = useNavigate();

  const [
    subscriptions,
    setSubscriptions
  ] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const token =
        localStorage.getItem("access");

      const response =
        await api.get(
          "http://127.0.0.1:8000/api/subscriptions/",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setSubscriptions(
        response.data
      );

    } catch (error) {

      console.error(error);

    }

  };

  const totalSpend =
    subscriptions.reduce(
      (sum, sub) =>
        sum + Number(sub.cost),
      0
    );

  const activeSubscriptions =
    subscriptions.filter(
      (sub) =>
        sub.status === "Active"
    ).length;

  const savings =
    Math.round(totalSpend * 0.15);

  const highestSubscription =
    subscriptions.length > 0
      ? subscriptions.reduce(
          (max, sub) =>
            Number(sub.cost) >
            Number(max.cost)
              ? sub
              : max
        )
      : null;

  const sendReminders =
  async () => {

  try {

    await api.post(
      "http://127.0.0.1:8000/send-reminders/"
    );

    alert(
      "Reminder Emails Sent"
    );

  } catch {

    alert(
      "Failed"
    );

  }

};

  return (

    <div className="container-fluid p-4">

      <button
        className= "premium-back-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Dashboard
      </button>

      <button
        className="btn btn-warning"
        onClick={sendReminders}
      >
        📧 Send Reminder Emails
      </button>

      <h1 className="premium-title mb-4">
        Admin Dashboard
      </h1>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="glass-card p-4">
            <h5>Total Subscriptions</h5>
            <h2>{subscriptions.length}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="glass-card p-4">
            <h5>Monthly Revenue</h5>
            <h2>₹{totalSpend}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="glass-card p-4">
            <h5>Annual Revenue</h5>
            <h2>₹{totalSpend * 12}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="glass-card p-4">
            <h5>Active Services</h5>
            <h2>{activeSubscriptions}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="glass-card p-4">
            <h5>Potential Savings</h5>
            <h2>₹{savings}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="glass-card p-4">
            <h5>Highest Subscription</h5>

            <h6>
              {highestSubscription
                ? highestSubscription.service_name
                : "No Data"}
            </h6>

            <h2>
              ₹
              {highestSubscription
                ? highestSubscription.cost
                : 0}
            </h2>

          </div>
        </div>

      </div>

      <div className="glass-card p-4 mt-4">

        <h4>
          Recent Subscriptions
        </h4>

        <table className="table">

          <thead>
            <tr>
              <th>Service</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {subscriptions.map(
              (sub) => (

              <tr key={sub.id}>

                <td>
                  {sub.service_name}
                </td>

                <td>
                  {sub.category}
                </td>

                <td>
                  ₹{sub.cost}
                </td>

                <td>
                  {sub.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminDashboard;