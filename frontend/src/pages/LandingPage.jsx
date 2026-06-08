import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#030712,#111827,#1E293B)",
        color: "white",
      }}
    >
      {/* Hero Section */}

      <section
        className="container py-5"
        style={{ minHeight: "90vh" }}
      >
        <div className="row align-items-center">

          <div className="col-md-6">

            <h1
              style={{
                fontSize: "70px",
                fontWeight: "800",
              }}
            >
              Manage All Your
              <span
                style={{
                  color: "#4F46E5",
                }}
              >
                {" "}
                Subscriptions
              </span>
            </h1>

            <p
              style={{
                fontSize: "20px",
                color: "#9CA3AF",
              }}
            >
              Track expenses, monitor
              renewals, receive AI insights,
              and manage all subscriptions
              from one premium dashboard.
            </p>

            <div className="mt-4">

              <Link
                to="/login"
                className="btn btn-primary btn-lg me-3"
              >
                Get Started
              </Link>

              <Link
                to="/register"
                className="btn btn-outline-light btn-lg"
              >
                Learn More
              </Link>

            </div>

          </div>

          <div className="col-md-6 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="dashboard"
              width="400"
            />

          </div>

        </div>
      </section>

      {/* Features */}

      <section className="container py-5">

        <h2 className="text-center mb-5">
          Features
        </h2>

        <div className="row">

          <div className="col-md-4">
            <div className="glass-card p-4">
              <h4>📊 Analytics</h4>

              <p>
                Advanced spending insights
                and charts.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card p-4">
              <h4>🔔 Alerts</h4>

              <p>
                Never miss a renewal again.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card p-4">
              <h4>🤖 AI Insights</h4>

              <p>
                Smart recommendations to
                save money.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* Pricing */}

      <section className="container py-5">

        <h2 className="text-center mb-5">
          Pricing
        </h2>

        <div className="row">

          <div className="col-md-4">
            <div className="glass-card p-4 text-center">
              <h3>Free</h3>

              <h1>₹0</h1>

              <p>Basic tracking</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="glass-card p-4 text-center"
              style={{
                border:
                  "2px solid #4F46E5",
              }}
            >
              <h3>Pro</h3>

              <h1>₹299</h1>

              <p>Analytics + AI</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card p-4 text-center">
              <h3>Enterprise</h3>

              <h1>₹999</h1>

              <p>Unlimited access</p>
            </div>
          </div>

        </div>

      </section>

      {/* Testimonials */}

      <section className="container py-5">

        <h2 className="text-center mb-5">
          Testimonials
        </h2>

        <div className="row">

          <div className="col-md-4">
            <div className="glass-card p-4">
              ⭐⭐⭐⭐⭐
              <br />
              Amazing dashboard!
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card p-4">
              ⭐⭐⭐⭐⭐
              <br />
              Saved me money every month.
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card p-4">
              ⭐⭐⭐⭐⭐
              <br />
              Beautiful and powerful.
            </div>
          </div>

        </div>

      </section>

      {/* Footer */}

      <footer
        className="text-center py-4"
        style={{
          color: "#9CA3AF",
        }}
      >
        © 2026 SubSmart Premium
      </footer>

    </div>
  );
}

export default LandingPage;