import React from "react";

function TopExpenses() {

  const items = [
    {
      service:"Netflix",
      cost:649
    },
    {
      service:"ChatGPT",
      cost:2000
    },
    {
      service:"Spotify",
      cost:119
    },
  ];

  return (
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
          {items.map((item,index)=>(
            <tr key={index}>
              <td>{item.service}</td>
              <td>₹{item.cost}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default TopExpenses;