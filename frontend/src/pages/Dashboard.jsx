import DashboardCards from "../components/DashboardCards";
import React, { useEffect, useState } from "react";
import NotificationCenter from "../components/NotificationCenter";
import RenewalCountdown from "../components/RenewalCountdown";
import ExportPDF from "../components/ExportPDF";
import ExportExcel from "../components/ExportExcel";
import axios from "axios";
import AIInsights from "../components/AIInsights";
import HealthScore from "../components/HealthScore";
import ForecastCard from "../components/ForecastCard";
import ActivityTimeline from "../components/ActivityTimeline";
import RecentActivity from "../components/RecentActivity";
import RenewalCalendar from "../components/RenewalCalendar";
import UpcomingPayments from "../components/UpcomingPayments";
import RenewalSummary from "../components/RenewalSummary";
import AIChat from "../components/AIChat";
import SavingsAdvisor from "../components/SavingsAdvisor";
import FloatingButton from "../components/FloatingButton";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
  useState("All");

  const [statusFilter, setStatusFilter] =
  useState("All");

  const [sortBy, setSortBy] =
  useState("name");

  const [formData, setFormData] = useState({
    service_name: "",
    category: "",
    cost: "",
    billing_cycle: "monthly",
    next_billing_date: "",
    status: "Active",
  });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = () => {
    axios.get(
        "http://127.0.0.1:8000/api/subscriptions/",
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem(
                "access"
              )}`,
          },
        }
      )
      .then((res) => setSubscriptions(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSubscription = (e) => {
    e.preventDefault();

    axios.post(
        "http://127.0.0.1:8000/api/subscriptions/",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem(
                "access"
              )}`,
          },
        }
      )
      .then(() => {
        fetchSubscriptions();

        setFormData({
          service_name: "",
          category: "",
          cost: "",
          billing_cycle: "monthly",
          next_billing_date: "",
          status: "Active",
        });
      })
      .catch((err) => console.log(err));
  };

  const deleteSubscription = (id) => {
    if (!window.confirm("Delete Subscription?")) return;

    axios.delete(
      `http://127.0.0.1:8000/api/subscriptions/${id}/`,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem(
              "access"
            )}`,
        },
      }
    )
      .then(() => fetchSubscriptions())
      .catch((err) => console.log(err));
  };

  const totalSpend = subscriptions.reduce(
    (sum, item) => sum + parseFloat(item.cost || 0),
    0
  );

  const activeServices = subscriptions.filter(
    (item) => item.status === "Active"
  ).length;

  const filteredSubscriptions =
  subscriptions
    .filter((sub) =>
      sub.service_name
        .toLowerCase()
        .includes(search.toLowerCase())
    )

    .filter((sub) =>
      categoryFilter === "All"
        ? true
        : sub.category === categoryFilter
    )

    .filter((sub) =>
      statusFilter === "All"
        ? true
        : sub.status === statusFilter
    )

    .sort((a,b)=>{

      if(sortBy==="cost"){
        return b.cost-a.cost;
      }

      return a.service_name.localeCompare(
        b.service_name
      );

    });

  const chartData = subscriptions.map((sub) => ({
    name: sub.service_name,
    value: Number(sub.cost),
  }));

  const COLORS = [
    "#4F46E5",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
  ];

  return (
    <>
      <div className="container-fluid p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Subscription Dashboard</h2>

          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#addModal"
          >
            + Add Subscription
          </button>
        </div>

        {/* Dashboard Cards */}
        <DashboardCards subscriptions={subscriptions} />

        <div className="row">

          <div className="col-md-4">
            <HealthScore
              subscriptions={subscriptions}
            />
          </div>

          <div className="col-md-4">
            <ForecastCard
              subscriptions={subscriptions}
            />
          </div>

          <div className="col-md-4">
            <AIInsights
              subscriptions={subscriptions}
            />
          </div>

      ` </div>

        {/* Stats */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body text-center">
                <h6>Monthly Spend</h6>
                <h2>₹{totalSpend}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body text-center">
                <h6>Active Services</h6>
                <h2>{activeServices}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card p-3 shadow">
              <h5>Cost Distribution</h5>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-3 shadow">
              <h5>Cost Comparison</h5>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <NotificationCenter
        subscriptions={subscriptions}
        />

        {/* Renewal Countdown */}
        <RenewalCountdown
        subscriptions={subscriptions}
        />

        {/* Export Buttons */}
        <div className="mt-4 mb-4">
        <ExportPDF
            subscriptions={subscriptions}
        />

        <ExportExcel
            subscriptions={subscriptions}
        />
        </div>

        <div className="row mt-4">

          <div className="col-md-6">
            <ActivityTimeline />
          </div>

          <div className="col-md-6">
            <RecentActivity />
          </div>

        </div>

        <div className="row mt-4">

          <div className="col-md-4">
            <UpcomingPayments
              subscriptions={subscriptions}
            />
          </div>

          <div className="col-md-4">
            <RenewalSummary
              subscriptions={subscriptions}
            />
          </div>

          <div className="col-md-4">
            <ForecastCard
              subscriptions={subscriptions}
            />
          </div>

        </div>

        <div className="mt-4">

          <RenewalCalendar
            subscriptions={subscriptions}
          />

        <div className="mt-4">

          <RenewalCalendar
            subscriptions={subscriptions}
          />

        </div>

        <div className="mt-4">
          <SavingsAdvisor
            subscriptions={subscriptions}
          />
        </div>

        <div className="mt-4">
          <AIChat
            subscriptions={subscriptions}
          />
        </div>
        
        <div className="mt-4">
          <AIChat
            subscriptions={subscriptions}
          />

        </div>

        </div>

        {/* Search */}
        <div className="row mb-4">

            <div className="col-md-4">

              <input
                type="text"
                className="form-control"
                placeholder="Search Service..."
                value={search}
                onChange={(e)=>
                  setSearch(e.target.value)
                }
              />

            </div>

            <div className="col-md-3">

              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e)=>
                  setCategoryFilter(
                    e.target.value
                  )
                }
              >

                <option>All</option>
                <option>Entertainment</option>
                <option>Music</option>
                <option>Education</option>
                <option>Cloud</option>

              </select>

            </div>

            <div className="col-md-2">

              <select
                className="form-select"
                value={statusFilter}
                onChange={(e)=>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >

                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>

              </select>

            </div>

            <div className="col-md-3">

              <select
                className="form-select"
                value={sortBy}
                onChange={(e)=>
                  setSortBy(
                    e.target.value
                  )
                }
              >

                <option value="name">
                  Sort By Name
                </option>

                <option value="cost">
                  Sort By Cost
                </option>

              </select>

            </div>

        </div>

        {/* Table */}
        <div className="card shadow">
          <div className="card-body">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Cost</th>
                  <th>Billing</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.service_name}</td>
                    <td>{sub.category}</td>
                    <td>₹{sub.cost}</td>
                    <td>{sub.billing_cycle}</td>
                    <td>{sub.status}</td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteSubscription(sub.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="addModal"
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Add Subscription</h5>
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Service Name"
                  name="service_name"
                  value={formData.service_name}
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-2"
                  placeholder="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Cost"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                />

                <input
                  type="date"
                  className="form-control mb-2"
                  name="next_billing_date"
                  value={formData.next_billing_date}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={addSubscription}
                >
                  Save Subscription
                </button>
              </div>
            </div>
          </div>
        </div>

        <FloatingButton />

      </div>
    </>
  );
}

export default Dashboard;