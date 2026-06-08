import React, { useState } from "react";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [renewalAlerts, setRenewalAlerts] = useState(true);
  const [currency, setCurrency] = useState("INR");

  return (
    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-4">
        Settings
      </h2>

      <div className="row">

        <div className="col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">

              <h4>Appearance</h4>

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
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">

              <h4>Currency</h4>

              <select
                className="form-select mt-3"
                value={currency}
                onChange={(e) =>
                  setCurrency(e.target.value)
                }
              >
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>

            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">

              <h4>Email Notifications</h4>

              <div className="form-check form-switch mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={() =>
                    setEmailAlerts(!emailAlerts)
                  }
                />

                <label className="form-check-label">
                  Enable Email Alerts
                </label>
              </div>

            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">

              <h4>Renewal Reminders</h4>

              <div className="form-check form-switch mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={renewalAlerts}
                  onChange={() =>
                    setRenewalAlerts(!renewalAlerts)
                  }
                />

                <label className="form-check-label">
                  Notify Before Renewal
                </label>
              </div>

            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card shadow border-0">
            <div className="card-body">

              <h4>Export Data</h4>

              <div className="mt-3">
                <button className="btn btn-success me-3">
                  Export Excel
                </button>

                <button className="btn btn-danger">
                  Export PDF
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Settings;