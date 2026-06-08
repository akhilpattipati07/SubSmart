import React from "react";
import { motion } from "framer-motion";

function DashboardCards({ subscriptions }) {

  const totalSpend = subscriptions.reduce(
    (sum, sub) => sum + Number(sub.cost),
    0
  );

  const active = subscriptions.filter(
    (sub) => sub.status === "Active"
  ).length;

  const cards = [
    {
      title:"Subscriptions",
      value:subscriptions.length
    },
    {
      title:"Monthly Spend",
      value:`₹${totalSpend}`
    },
    {
      title:"Active",
      value:active
    }
  ];

  return (
    <div className="row mb-4">
      {cards.map((card,index)=>(
        <div className="col-md-4" key={index}>
          <motion.div
            whileHover={{scale:1.05}}
            className="glass-card stat-card p-4"
          >
            <h5>{card.title}</h5>
            <h2>{card.value}</h2>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;