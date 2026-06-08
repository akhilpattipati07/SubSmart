import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

function Analytics() {
  const monthlyData = [
    { month: "Jan", spend: 1200 },
    { month: "Feb", spend: 1800 },
    { month: "Mar", spend: 2400 },
    { month: "Apr", spend: 3000 },
    { month: "May", spend: 3500 },
    { month: "Jun", spend: 4299 },
  ];

  const categoryData = [
    { name: "Entertainment", value: 50 },
    { name: "Music", value: 20 },
    { name: "Cloud", value: 15 },
    { name: "Education", value: 15 },
  ];

  const COLORS = [
    "#4F46E5",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
  ];

  return (
    <div className="container-fluid p-4">

      <h2 className="premium-title mb-4">
        Analytics Dashboard
      </h2>

      {/* KPI Cards */}

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <h6>Total Spend</h6>
            <h2>₹4299</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <h6>Subscriptions</h6>
            <h2>12</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <h6>Renewals</h6>
            <h2>3</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <h6>Health Score</h6>
            <h2>92%</h2>
          </div>
        </div>

      </div>

      {/* Charts Row 1 */}

      <div className="row">

        <div className="col-md-8">
          <div className="glass-card p-4">
            <h4>Monthly Spending Trend</h4>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="spend"
                  stroke="#4F46E5"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>

        <div className="col-md-4">
          <div className="glass-card p-4">
            <h4>Category Distribution</h4>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {categoryData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>

      {/* Charts Row 2 */}

      <div className="row mt-4">

        <div className="col-md-6">
          <div className="glass-card p-4">

            <h4>Growth Forecast</h4>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <AreaChart data={monthlyData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="spend"
                  stroke="#06B6D4"
                  fill="#06B6D4"
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>
        </div>

        <div className="col-md-6">
          <div className="glass-card p-4">

            <h4>Top Expenses</h4>

            <table className="table">

              <thead>
                <tr>
                  <th>Service</th>
                  <th>Cost</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>ChatGPT Plus</td>
                  <td>₹2000</td>
                </tr>

                <tr>
                  <td>Netflix</td>
                  <td>₹649</td>
                </tr>

                <tr>
                  <td>Spotify</td>
                  <td>₹119</td>
                </tr>

              </tbody>

            </table>

          </div>
        </div>

      </div>

      {/* Analytics Summary */}

      <div className="row mt-4">

        <div className="col-md-12">

          <div className="glass-card p-4">

            <h3>
              Business Insights
            </h3>

            <hr />

            <p>
              💡 Highest expense:
              ChatGPT Plus
            </p>

            <p>
              📈 Spending trend is
              increasing month over
              month.
            </p>

            <p>
              🎯 Entertainment is
              your largest category.
            </p>

            <p>
              💰 Potential annual
              spend:
              ₹51,588
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;