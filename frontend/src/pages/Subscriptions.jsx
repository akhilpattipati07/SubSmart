import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SubscriptionTable from "../components/SubscriptionTable";
import "../styles/premium.css";
import api from "../api/axios";

function Subscriptions() {
  const [search, setSearch] = useState("");

  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
  fetchSubscriptions();
}, []);

  const fetchSubscriptions = async () => {
  try {
    const res = await api.get("/api/subscriptions/");
    setSubscriptions(res.data);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
  }
};

  const handleDelete = (id) => {
    if (window.confirm("Delete this subscription?")) {
      setSubscriptions(
        subscriptions.filter((sub) => sub.id !== id)
      );
    }
  };

  const handleEdit = (sub) => {
    alert(`Edit ${sub.service_name} feature coming next`);
  };

  const handleAdd = () => {
    const newSub = {
      id: Date.now(),
      service_name: "New Subscription",
      category: "Other",
      cost: 0,
      billing_cycle: "Monthly",
      next_billing_date: "2026-07-01",
      status: "Active",
    };

    setSubscriptions([...subscriptions, newSub]);
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <div className="top-header">
          <div>
            <h1 className="premium-title">
              Manage Subscriptions
            </h1>

            <p>
              View, edit and manage all subscriptions
            </p>
          </div>

          <button
            className="btn btn-success"
            onClick={handleAdd}
          >
            + Add Subscription
          </button>
        </div>

        <SubscriptionTable
          subscriptions={subscriptions}
          search={search}
          setSearch={setSearch}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Subscriptions;