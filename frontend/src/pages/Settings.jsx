import React, {
  useState,
  useContext
} from "react";

import {
  ThemeContext
} from "../components/ThemeContext";

import {
  useNavigate
} from "react-router-dom";

import jsPDF from "jspdf";

import * as XLSX from "xlsx";

import ChangePassword from "./ChangePassword";

function Settings() {

  const navigate = useNavigate();

  const {darkMode,setDarkMode} = useContext(ThemeContext);

  const [emailAlerts, setEmailAlerts] = useState(localStorage.getItem("emailAlerts") === "true" );

  const [renewalAlerts,setRenewalAlerts] =useState(localStorage.getItem("renewalAlerts" ) === "true" );

  const [currency, setCurrency] = useState(
  localStorage.getItem("currency") || "INR");

  const exportPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "SubSmart Report", 20,20 );

  doc.setFontSize(12);

  doc.text(`User: ${localStorage.getItem("username" )}`,20,40);

  doc.text(`Currency: ${currency}`,20,55);

  doc.text(`Generated: ${new Date().toLocaleDateString() }`, 20, 70);

  doc.save("SubSmart_Report.pdf");

};

const exportExcel = () => {

  const data = [
    {
      User:
        localStorage.getItem(
          "username"
        ),
      Currency:
        currency,
      Date:
        new Date()
          .toLocaleDateString(),
    },
  ];

  const worksheet =
    XLSX.utils.json_to_sheet(
      data
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Report"
  );

  XLSX.writeFile(
    workbook,
    "SubSmart_Report.xlsx"
  );

};

  return (

    <div className="container-fluid p-4">

      <button
        className="premium-back-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Dashboard
      </button>
      <button
  className="btn btn-primary rounded-pill"
  onClick={() =>
    setDarkMode(!darkMode)
  }
>
  {darkMode
    ? "☀ Light Mode"
    : "🌙 Dark Mode"}
</button>
      <h2
        className="premium-title mb-4"
      >
        Settings
      </h2>

      <div className="row">

        {/* Appearance */}

        <div className="col-md-6 mb-4">

          <div className="glass-card p-4">

            <h4>
              🌙 Appearance
            </h4>

            <div className="form-check form-switch mt-3">

              <input
                className="form-check-input"
                type="checkbox"
                checked={darkMode}
                onChange={() =>
                  setDarkMode(!darkMode)
                }
              />

              <label className="form-check-label">
                Enable Dark Mode
              </label>

            </div>

          </div>

        </div>

        {/* Currency */}

        <div className="col-md-6 mb-4">

          <div className="glass-card p-4">

            <h4>
              💱 Currency
            </h4>

            <select
              className="form-select mt-3"
              value={currency}
              onChange={(e) => {setCurrency(e.target.value);localStorage.setItem("currency",e.target.value); 

              }}
            >
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>

          </div>

        </div>

        {/* Email */}

        <div className="col-md-6 mb-4">

          <div className="glass-card p-4">

            <h4>
              📧 Email Alerts
            </h4>

            <div className="form-check form-switch mt-3">

              <input
                className="form-check-input"
                type="checkbox"
                checked={emailAlerts}
                onChange={() => {

                  const value =
                    !emailAlerts;

                  setEmailAlerts(value);

                  localStorage.setItem(
                    "emailAlerts",
                    value
                  );

                }} 
                 />

              <label className="form-check-label">
                Enable Email Alerts
              </label>

            </div>

          </div>

        </div>

        {/* Reminders */}

        <div className="col-md-6 mb-4">

          <div className="glass-card p-4">

            <h4>
              🔔 Renewal Reminders
            </h4>

            <div className="form-check form-switch mt-3">

              <input
                className="form-check-input"
                type="checkbox"
                checked={renewalAlerts}
                onChange={() => {

                  const value =
                  !renewalAlerts;

                  setRenewalAlerts(
                  value
                  );

                  localStorage.setItem(
                  "renewalAlerts",
                  value
                  );

                  }}
              />

              <label className="form-check-label">
                Notify Before Renewal
              </label>

            </div>

          </div>

        </div>

        {/* Export */}

        <div className="col-md-12">

          <div className="glass-card p-4">

            <h4>
              📂 Export Data
            </h4>

            <div className="mt-3">

              <button
                  className="btn btn-success me-3"
                  onClick={exportExcel}
                >
                  Export Excel
                </button>

                <button
                  className="btn btn-danger"
                  onClick={exportPDF}
                >
                  Export PDF
                </button>
            </div>

          </div>

        </div>

        <div className="col-md-12 mt-4">

          <ChangePassword />

        </div>

      </div>

    </div>

  );

}

export default Settings;