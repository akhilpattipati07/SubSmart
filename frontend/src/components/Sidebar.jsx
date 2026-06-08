import React from "react";
import {
  FaChartPie,
  FaCreditCard,
  FaChartLine,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#0F172A",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "25px",
        boxShadow: "4px 0px 20px rgba(0,0,0,0.2)",
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

      <Link to="/" style={linkStyle}>
        <div style={menuStyle}>
          <FaChartPie />
          <span>Dashboard</span>
        </div>
      </Link>

      <Link to="/analytics" style={linkStyle}>
        <div style={menuStyle}>
          <FaChartLine />
          <span>Analytics</span>
        </div>
      </Link>

      <Link to="/subscriptions" style={linkStyle}>
        <div style={menuStyle}>
          <FaCreditCard />
          <span>Subscriptions</span>
        </div>
      </Link>

      <Link to="/reminders" style={linkStyle}>
        <div style={menuStyle}>
          <FaBell />
          <span>Reminders</span>
        </div>
      </Link>

      <Link to="/settings" style={linkStyle}>
        <div style={menuStyle}>
          <FaCog />
          <span>Settings</span>
        </div>
      </Link>

      <Link to="/admin" style={linkStyle}>
        <div style={menuStyle}>
          🛠 Admin
        </div>
      </Link>

      <Link to="/profile" style={linkStyle}>
        <div style={menuStyle}>
          👤 Profile
        </div>
      </Link>

      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "25px",
          right: "25px",
        }}
      >
        <div style={menuStyle}>
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const menuStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px",
  marginBottom: "10px",
  borderRadius: "10px",
  cursor: "pointer",
  background: "rgba(255,255,255,0.05)",
};

export default Sidebar;