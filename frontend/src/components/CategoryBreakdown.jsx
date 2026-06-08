import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CategoryBreakdown() {

  const data = [
    { name: "Entertainment", value: 40 },
    { name: "Productivity", value: 25 },
    { name: "Education", value: 20 },
    { name: "Cloud", value: 15 },
  ];

  const colors = [
    "#4F46E5",
    "#06B6D4",
    "#8B5CF6",
    "#10B981",
  ];

  return (
    <div className="glass-card p-4">

      <h4>Category Breakdown</h4>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
          >
            {data.map((entry,index)=>(
              <Cell
                key={index}
                fill={colors[index]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default CategoryBreakdown;