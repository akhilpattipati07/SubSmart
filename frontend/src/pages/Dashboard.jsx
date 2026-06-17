import React, {
  useState,
  useEffect,
  useContext
} from "react";
import { useNavigate } from "react-router-dom";
import EditSubscriptionModal from "../components/EditSubscriptionModal";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import SubscriptionTable from "../components/SubscriptionTable";
import FloatingButton from "../components/FloatingButton";
import "../styles/premium.css";
import api from "../api/axios";
import AddSubscriptionModal from "../components/AddSubscriptionModal";
import { motion } from  "framer-motion";
import {
ThemeContext
}
from "../components/ThemeContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
   Sector,
} from "recharts";


function Dashboard() {

const hour = new Date().getHours();

const { darkMode } =
useContext(
ThemeContext
);

const greeting =
hour < 12
? "Good Morning"
: hour < 18
? "Good Afternoon"
: "Good Evening";

const [
  showNotifications,
  setShowNotifications
] = useState(false);

const [activeIndex, setActiveIndex] = useState(null);

const navigate = useNavigate();

const popularServices = [
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "YouTube Premium",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png",
  },
  {
    name: "Prime Video",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
  },
];

const username =
  localStorage.getItem(
    "username"
  ) || "User";

const [search, setSearch] = useState("");

const [showModal, setShowModal] = useState(false);

const [showEditModal, setShowEditModal] =
  useState(false);

const [selectedSubscription,
  setSelectedSubscription] =
  useState(null);

const [subscriptions, setSubscriptions] = useState([]);



useEffect(() => {
  fetchSubscriptions();
}, []);

const [activities, setActivities] = useState([]);

const [showDetails, setShowDetails] = useState(false);

const fetchSubscriptions = async () => {

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

  } catch(error) {

    console.error(error);

  }

};

const handleEdit = (sub) => {
  setSelectedSubscription(sub);
  setShowEditModal(true);
};

const handleUpdateSubscription =
  async (updatedSub) => {

  try {

    const token =
      localStorage.getItem("access");

    await api.put(
      `http://127.0.0.1:8000/api/subscriptions/${updatedSub.id}/`,
      updatedSub,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    fetchSubscriptions();
    setActivities((prev) => [

{
action:
`Updated ${updatedSub.service_name}`,
time:
new Date().toLocaleString(),
},

...prev,

]);
  } catch(error) {

    console.error(error);

  }

};

const handleDelete = async (id) => {

  if (
    !window.confirm(
      "Delete Subscription?"
    )
  ) return;

  try {

    const token =
      localStorage.getItem("access");

    const sub =
subscriptions.find(
(s) => s.id === id
);

    await api.delete(
      `http://127.0.0.1:8000/api/subscriptions/${id}/`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    fetchSubscriptions();

    setActivities((prev) => [

{
action:
`Deleted ${sub.service_name}`,
time:
new Date().toLocaleString(),
},

...prev,

]);
  } catch(error) {

    console.error(error);

  }

};



const expensive =
  subscriptions.length > 0
    ? [...subscriptions].sort(
        (a, b) =>
          Number(b.cost) -
          Number(a.cost)
      )[0]
    : null;

const totalSpend = subscriptions.reduce(
  (sum, sub) =>
    sum + Number(sub.cost || 0),
  0
);



const COLORS = [
  "#EC4899", // Neon Pink
  "#22D3EE", // Cyan
  "#A78BFA", // Purple
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#F43F5E", // Rose
  "#8B5CF6", // Violet
  "#06B6D4", // Sky
  "#14B8A6", // Teal
  "#84CC16", // Lime
  "#E879F9", // Magenta
  "#FB7185", // Hot Pink
];

const categoryData = subscriptions.map(
  (sub) => ({
    name: sub.service_name,
    value: Number(sub.cost)
  })
);


const savings =
  Math.round(
    totalSpend * 0.20
  );

const forecastData = [
  {
    month: "Current",
    spend: totalSpend,
  },
  {
    month: "Next",
    spend: Math.round(totalSpend * 1.05),
  },
  {
    month: "Future",
    spend: Math.round(totalSpend * 1.10),
  },
];


const pieData = subscriptions.map((sub) => ({
  name: sub.service_name,
  value: Number(sub.cost),
}));

const monthlyData =
  subscriptions.map(
    (sub, index) => ({
      month: `S${index + 1}`,
      spend: Number(sub.cost),
    })
  );





const handleAddSubscription = async (newSub) => {

  console.log("Sending:", newSub);

  try {

    const token = localStorage.getItem("access");

    const response = await api.post(
      "http://127.0.0.1:8000/api/subscriptions/",
      newSub,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Success:", response.data);

    fetchSubscriptions();
    setActivities((prev) => [

{
action:
`Added ${newSub.service_name}`,
time:
new Date().toLocaleString(),
},

...prev,

]);

  } catch (error) {

    console.log("ERROR:");

    if (error.response) {
      console.log(error.response.data);
      alert(JSON.stringify(error.response.data));
    } else {
      console.log(error);
    }

  }


};

const expiringSoon =
  subscriptions.filter((sub) => {

    const renewalDate =
      new Date(
        sub.next_billing_date
      );

    const today =
      new Date();

    const diff =
      Math.ceil(
        (
          renewalDate -
          today
        ) /
        (
          1000 * 60 * 60 * 24
        )
      );

    return diff <= 3 && diff >= 0;

  });


const renderActiveShape = (props) => {

  return (
    <Sector
      {...props}
      outerRadius={props.outerRadius + 10}
    />
  );

};




  

return ( 

  <div
  className={
    darkMode
      ? "dashboard-bg"
      : "dashboard-bg light-dashboard"
  }
>

<div className="layout">


  <Sidebar />

  <div className="main">

    <div className="top-header">

  <div>

    
    <motion.h1
  className={
    darkMode
      ? "premium-title"
      : "light-welcome-title"
  }
  initial={{
    opacity:0,
    x:-50
  }}
  animate={{
    opacity:1,
    x:0
  }}
  transition={{
    duration:1
  }}
>
  {greeting}, {username} 👋
</motion.h1>

<p className="welcome-subtitle">
{subscriptions.length} Active Subscription
</p>

<p className="welcome-savings">
₹{savings} Potential Savings
</p>


    

    

  </div>
  <input
  type="text"
  className="search-bar"
  placeholder="Search subscriptions..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>

  <div
  className="notification-icon"
  style={{
    position: "relative"
  }}
>
  <span
    style={{
      cursor: "pointer",
      fontSize: "28px"
    }}
    onClick={() =>
      setShowNotifications(
        !showNotifications
      )
    }
  >
    🔔
    </span>

    <span className="premium-notification-count">

    {subscriptions.length}

  </span>

  {
showNotifications && (

<div
  className="notification-dropdown"
>
  {
    subscriptions.length > 0 ?

    subscriptions.map((sub) => (

      <div
        key={sub.id}
        className="notification-item"
      >
        

  <div>
    🔔
  </div>

  <div>

    <strong>
      {sub.service_name}
    </strong>

    <br />

    <small>
      Renews on
      {" "}
      {sub.next_billing_date}
    </small>

  </div>

</div>
      

    ))

    :

    <p>
      No Notifications 🎉
    </p>
  }
</div>

)
}

  <div className="user-chip">

  <div className="premium-avatar">
    {username?.charAt(0).toUpperCase()}
  </div>

  <div className="user-info">

    <h5>{username}</h5>

    <span className="premium-badge">
      ✨ Premium Member
    </span>

    



  </div>
 
</div>
</div>
  <button
    className="premium-btn"
    onClick={() =>
      setShowModal(true)
    }
  >
    + Add Subscription
  </button>

</div>

    
 {expiringSoon.length > 0 && (

<div
  className="alert alert-warning mb-4"
>

  <h5>
    ⚠ Upcoming Renewals
  </h5>

  {
    expiringSoon.map(
      (sub) => (

      <div key={sub.id}>

        {sub.service_name}
        renews on
        {sub.next_billing_date}

      </div>

    ))
  }

</div>

)}

{subscriptions.length === 0 && (

<div className="popular-services-card">

  <h4>Popular Services</h4>

  <div className="popular-services">

    {popularServices.map((service) => (

      <div
        key={service.name}
        className="service-logo-card"
      >
        <img
          src={service.logo}
          alt={service.name}
        />
      </div>

    ))}

  </div>

</div>

)}
    

    <DashboardCards
      subscriptions={subscriptions}
    />

    <div className="dashboard-grid">

      <div>

        <div
className="chart-section"
style={{
display:"flex",
gap:"20px"
}}
>

          

   <div
className="glass-card p-4"
style={{
flex: 1
}}
>   

  <h4>Spending Overview</h4>

  <div
className="spending-layout"
style={{
display:"flex",
alignItems:"center",
justifyContent:"center",
gap:"30px"
}}
>
    {/* Donut Chart */}
    <div
className="chart-side"
onClick={() =>
setShowDetails(
!showDetails
)
}
style={{
cursor:"pointer",
flex:1
}}
>

      <div className="donut-wrapper">

  <ResponsiveContainer
    width="100%"
    height={280}
  >
    <PieChart>

      

      <Pie
  activeIndex={activeIndex}
  activeShape={renderActiveShape}
  data={categoryData}
  stroke="rgba(255,255,255,0.08)"
strokeWidth={1}
  dataKey="value"
  innerRadius={70}
  outerRadius={125}
  onMouseEnter={(_, index) =>
    setActiveIndex(index)
  }
  onMouseLeave={() =>
    setActiveIndex(null)
  }
>
        {categoryData.map((entry,index)=>(
  <Cell
    key={index}
    fill={COLORS[index % COLORS.length]}
    stroke="rgba(255,255,255,0.15)"
    strokeWidth={2}
  />
))}
      
      </Pie>

    </PieChart>
  </ResponsiveContainer>

  



  <div className="donut-center">

  <h2>₹{totalSpend}</h2>


    <span>Total</span>

  </div>

</div>

    </div>

    {/* Details */}
    {
showDetails && (

<motion.div
  className="chart-details"
  initial={{
    opacity:0,
    x:50
  }}
  animate={{
    opacity:1,
    x:0
  }}
  transition={{
    duration:0.4
  }}
  
>

      {categoryData.map((item,index)=>{

        const percentage =
          (
            item.value /
            totalSpend
          ) * 100;

        return(

          <div
            className="legend-row"
            key={index}
          >

            <div className="legend-left">

              <span
                className="legend-dot"
                style={{
                  background:
                    COLORS[
                      index %
                      COLORS.length
                    ]
                }}
              />

              <span>
                {item.name}
              </span>

            </div>

            <div className="legend-right">

              ₹{item.value}

              {" "}

              {percentage.toFixed(0)}%

            </div>

          </div>

        );

      })}

    </motion.div>

    )
}

  </div>

</div>

         {
!showDetails && (

<div
className="dashboard-card p-4"
style={{
flex: 1
}}
>

            <h4 className="mb-4">
              Monthly Trend
            </h4>

            <ResponsiveContainer
              width="100%"
              height={250}
            >
              <LineChart data={monthlyData}>

  <CartesianGrid
    strokeDasharray="3 3"
  />

  <XAxis dataKey="month" />

  <YAxis />

  <Tooltip />

  <Line
    type="monotone"
    dataKey="spend"
    stroke="#6366F1"
    strokeWidth={4}
  />

</LineChart>
            </ResponsiveContainer>

          </div>

          )
}

        </div>


        

<div className="glass-card p-4 mt-4">

  <h4>
    📈 Spending Forecast
  </h4>

  <ResponsiveContainer
    width="100%"
    height={220}
  >

    <LineChart
      data={forecastData}
    >

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="spend"
        stroke="#6366F1"
        strokeWidth={4}
      />

    </LineChart>

  </ResponsiveContainer>

</div>


              <SubscriptionTable
  subscriptions={subscriptions}
  search={search}
  setSearch={setSearch}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
 

      </div>

      <div className="right-panel">

        <div className="dashboard-card p-4">
          <h4>
            Upcoming Renewals
          </h4>

         {subscriptions.map((sub) => (

  <div
    key={sub.id}
    className="mb-3"
  >

    <strong>
      {sub.service_name}
    </strong>

    <br />

    <small>
      Renewal:
      {sub.next_billing_date}
    </small>

  </div>

))}

        </div>

        

        <div className="dashboard-card p-4">

          <h4>
  ⚡ Recent Activity
</h4> 

         
          {activities.slice(0,10).map((item,index)=>(


<div
key={index}
className="activity-item"
>

<div>

<strong>
{item.action}
</strong>

</div>

<small>

{item.time}

</small>

</div>

))}

  



        </div>


      <div className="dashboard-card p-4 ai-advisor">

  <h4>
    🤖 AI Savings Advisor
  </h4>

  <p>
    Highest Cost Service:
    {" "}
    {
      expensive?.service_name || "N/A"
    }
  </p>

  <p>
    Monthly Spend: ₹{totalSpend}
  </p>

  <p>
    Potential Savings: ₹{savings}
  </p>

  <hr />

  <p
    style={{
      color:"#10B981",
      fontWeight:"bold"
    }}
  >
    Recommendation
  </p>

  <p>
    Review unused subscriptions and
    consider annual plans to reduce costs.
  </p>

</div>

      </div>

    </div>

  </div>
      <FloatingButton
  onClick={() => setShowModal(true)}
/>

<AddSubscriptionModal
  show={showModal}
  onClose={() => setShowModal(false)}
  onAdd={handleAddSubscription}
/>

<EditSubscriptionModal
  show={showEditModal}
  subscription={selectedSubscription}
  onClose={() =>
    setShowEditModal(false)
  }
  onSave={
    handleUpdateSubscription
  }
/>

</div>

</div>


);
}

export default Dashboard;
