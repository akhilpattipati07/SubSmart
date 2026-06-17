import React from "react";
import { motion } from "framer-motion";
import {
FaWallet,
FaCreditCard,
FaCheckCircle,
FaPiggyBank,
} from "react-icons/fa";
import CountUp from "react-countup";

function DashboardCards({ subscriptions }) {
const totalSpend = subscriptions.reduce(
(sum, sub) => sum + Number(sub.cost || 0),
0
);

const active = subscriptions.filter(
(sub) => sub.status === "Active"
).length;

const annualSpend = totalSpend * 12;

const savings = Math.round(totalSpend * 0.18);

// const cards = [
// {
// title: "Monthly Spend",
// value: `₹${totalSpend}`,
// icon: <FaWallet />,
// color: "primary-card",
// },
// {
// title: "Subscriptions",
// value: subscriptions.length,
// icon: <FaCreditCard />,
// color: "success-card",
// },
// {
// title: "Annual Spend",
// value: `₹${annualSpend}`,
// icon: <FaCheckCircle />,
// color: "info-card",
// },
// {
// title: "Potential Savings",
// value: `₹${savings}`,
// icon: <FaPiggyBank />,
// color: "warning-card",
// },
// ];

const cards = [
{
title: "Monthly Spend",
value: totalSpend,
prefix: "₹",
icon: <FaWallet />,
color: "primary-card",
},
{
title: "Subscriptions",
value: subscriptions.length,
prefix: "",
icon: <FaCreditCard />,
color: "success-card",
},
{
title: "Annual Spend",
value: annualSpend,
prefix: "₹",
icon: <FaCheckCircle />,
color: "info-card",
},
{
title: "Potential Savings",
value: savings,
prefix: "₹",
icon: <FaPiggyBank />,
color: "warning-card",
},
];


return ( <div className="row g-4 mb-4">
{cards.map((card, index) => ( <div className="col-lg-3 col-md-6" key={index}>
<motion.div
initial={{
opacity:0,
y:40
}}
animate={{
opacity:1,
y:0
}}
transition={{
duration:0.5,
delay:index * 0.15
}}
whileHover={{
scale:1.05,
y:-5
}}
className={`premium-stat-card ${card.color}`}
> <div className="stat-icon">
{card.icon} </div>

```
        <div>
          <h6>{card.title}</h6>
          
          <h2 className="stat-number">

{card.prefix}

<CountUp
end={card.value}
duration={3}
separator=","
/>

</h2>
        </div>
      </motion.div>
    </div>
  ))}
</div>


);
}

export default DashboardCards;
