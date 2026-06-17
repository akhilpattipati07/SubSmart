import React, {
useState,
useEffect
} from "react";

import api from "../api/axios";

import {
FaChartPie,
FaCreditCard,
FaChartLine,
FaBell,
FaCog,
FaSignOutAlt,
FaUser,
FaTools,
FaRobot,
} from "react-icons/fa";

import {
Link,
useNavigate
} from "react-router-dom";

function Sidebar() {
const [
showNotifications,
setShowNotifications
] = useState(false);


const navigate = useNavigate();

const [
notifications,
setNotifications
] = useState([]);

useEffect(() => {


fetchNotifications();


}, []);

const fetchNotifications =
async () => {


  try {

    const token =
      localStorage.getItem(
        "access"
      );

    const response =
      await api.get(
        "http://127.0.0.1:8000/notifications/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    setNotifications(
      response.data
    );

  } catch (error) {

    console.log(error);

  }

};


const unreadCount =
notifications.filter(
(n) => !n.is_read
).length;

const handleLogout = () => {


localStorage.removeItem(
  "access"
);

localStorage.removeItem(
  "refresh"
);

localStorage.removeItem(
  "username"
);

navigate("/login");


};

return (

<div
  className="sidebar"
  style={{
    width: "260px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  }}
>
  <h2
    style={{
      marginBottom: "40px",
      fontWeight: "bold",
      color: "#4F46E5",
    }}
  >
    SubSmart Pro
  </h2>

  <Link
    to="/"
    style={linkStyle}
  >
    <div
style={menuStyle}
className="sidebar-item"
>
      <FaChartPie />
      <span>
        Dashboard
      </span>
    </div>
  </Link>

  <Link
    to="/analytics"
    style={linkStyle}
  >
    <div style={menuStyle}>
      <FaChartLine />
      <span>
         Analytics
      </span>
    </div>
  </Link>

  <Link to="/ai-assistant" style={linkStyle}>
  <div style={menuStyle}>
    <FaRobot />
    <span>🤖AI Assistant</span>
  </div>
</Link>

  <Link
    to="/subscriptions"
    style={linkStyle}
  >
    <div style={menuStyle}>
      <FaCreditCard />
      <span>
        Subscriptions
      </span>
    </div>
  </Link>

{/* <div style={linkStyle}>  
    <div style={menuStyle}>

      <FaBell
onClick={() =>
setShowNotifications(
!showNotifications
)}
/>


{
showNotifications && (

<div
style={{
  background: "white",
  color: "black",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "10px",
}}
>

{
notifications.length > 0 ?

notifications.map(
(item,index)=>(

<div
key={index}
className="notification-item"
>

{item.message}

</div>

)

)

:

<p>
No Notifications 🎉
</p>

}

</div>

)
}

      <span>
        Notifications
      </span>

      {
        unreadCount > 0 && (

          <span
            className="badge bg-danger ms-2"
          >
            {unreadCount}
          </span>

        )
      }

    </div>
  </div> */}

  <Link
  to="/notifications"
  style={linkStyle}
>
  <div style={menuStyle}>

    <FaBell />

    <span>
      Notifications
    </span>

    {
      unreadCount > 0 &&
      (
        <span
          className="badge bg-danger ms-2"
        >
          {unreadCount}
        </span>
      )
    }

  </div>
</Link>

  <Link
    to="/reminders"
    style={linkStyle}
  >
    <div style={menuStyle}>
      {/* <FaBell /> */}
      <FaBell
  className="notification-bell"
  size={24}
/>
      <span>
         Reminders
      </span>
    </div>
  </Link>

  <FaBell
onClick={() => {
  console.log("Bell clicked");
  setShowNotifications(
    !showNotifications
  );
}}
/>

{
showNotifications && (
  <p
    style={{
      color:"yellow",
      fontWeight:"bold"
    }}
  >
    DROPDOWN OPEN
  </p>
)
}




  <Link
    to="/settings"
    style={linkStyle}
  >
    <div style={menuStyle}>
      <FaCog />
      <span>
        Settings
      </span>
    </div>
  </Link>

  <Link
    to="/admin"
    style={linkStyle}
  >
    <div style={menuStyle}>
      <FaTools />
      <span>
        Admin
      </span>
    </div>
  </Link>

  {/* <Link
  to="/ai-assistant"
  style={linkStyle}
>
  <div style={menuStyle}>
    // 🤖
    <span>
      AI Assistant
    </span>
  </div>
</Link> */}

  <Link
    to="/profile"
    style={linkStyle}
  >
    <div style={menuStyle}>
      <FaUser />
      <span>
         Profile
      </span>
    </div>
  </Link>

  <div
  style={{
    marginTop: "20px",
  }}
>

    <div
      style={menuStyle}
      onClick={handleLogout}
    >
      <FaSignOutAlt />
      <span>
        Logout
      </span>
    </div>

  </div>

</div>


);

}

const linkStyle = {
  textDecoration: "none",
  color: "#FFFFFF",
};

const menuStyle = {
display: "flex",
alignItems: "center",
gap: "12px",
padding: "14px",
marginBottom: "10px",
borderRadius: "10px",
cursor: "pointer",
background:
"rgba(255,255,255,0.05)",
transition: "0.3s",
};

export default Sidebar;
