import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SpendingTrendChart() {

  const data = [
    { month: "Jan", spend: 1800 },
    { month: "Feb", spend: 2200 },
    { month: "Mar", spend: 2500 },
    { month: "Apr", spend: 2800 },
    { month: "May", spend: 3200 },
    { month: "Jun", spend: 4299 },
  ];

  return (
    <div className="glass-card p-4">
      <h4>Monthly Spending Trend</h4>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
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
  );
}

export default SpendingTrendChart;