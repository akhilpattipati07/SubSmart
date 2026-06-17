import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOtp() {

  const navigate = useNavigate();
  const location = useLocation();

  const [email] = useState(
    location.state?.email || ""
  );

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const verifyOtp = async () => {

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    setLoading(true);

    try {

      const response =
        await api.post(
          "http://127.0.0.1:8000/verify-otp/",
          {
            email,
            otp,
          }
        );

      if (
        response.data.valid
      ) {

        alert(
          "OTP Verified Successfully"
        );

        navigate(
          "/reset-password",
          {
            state: { email }
          }
        );

      } else {

        alert(
          "Invalid OTP"
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Invalid OTP"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-overlay">

      <div className="card p-5">

        <h2 className="text-center mb-4">
          Verify OTP
        </h2>

        <input
          className="form-control mb-3"
          value={email}
          disabled
        />

        <input
          className="form-control mb-3"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
        />

        <button
          className="btn btn-success w-100"
          onClick={verifyOtp}
          disabled={loading}
        >
          {
            loading
              ? "Verifying..."
              : "Verify OTP"
          }
        </button>

      </div>

    </div>

  );

}

export default VerifyOtp;