import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyRegistrationOtp() {

  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || "";

  const [otp, setOtp] =
    useState("");

  const verifyOtp = async () => {

    try {

      const response =
        await api.post(
          "http://127.0.0.1:8000/verify-registration-otp/",
          {
            email,
            otp,
          }
        );

      if (
        response.data.valid
      ) {

        alert(
          "Account Created Successfully"
        );

        navigate("/login");

      }

    } catch {

      alert(
        "Invalid OTP"
      );

    }

  };


  const resendOtp = async () => {

  try {

    await api.post(
      "http://127.0.0.1:8000/register-otp/",
      {
        username:
          location.state.username,

        email:
          location.state.email,

        password:
          location.state.password,
      }
    );

    alert(
      "New OTP Sent"
    );

  } catch {

    alert(
      "Failed To Send OTP"
    );

  }

};

  return (

    <div className="login-overlay">

      <div className="card p-5">

        <h2>
          Verify Registration OTP
        </h2>

        <input
          className="form-control mt-3"
          value={email}
          disabled
        />

        <input
          className="form-control mt-3"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>
            setOtp(e.target.value)
          }
        />

        <button
          className="btn btn-success mt-3 w-100"
          onClick={verifyOtp}
        >
          Verify & Create Account
        </button>
        <button
            className="btn btn-warning mt-2 w-100"
            onClick={resendOtp}
            >
            Resend OTP
        </button>
      </div>

    </div>

  );

}

export default VerifyRegistrationOtp;