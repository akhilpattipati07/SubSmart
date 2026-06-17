import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async () => {

    if (!email) {
      alert("Please enter email");
      return;
    }

    setLoading(true);

    try {

      await api.post(
        "http://127.0.0.1:8000/forgot-password/",
        {
          email,
        }
      );

      alert(
        "OTP sent successfully"
      );

      navigate(
        "/verify-otp",
        {
          state: { email },
        }
      );

    } catch (error) {

      console.log(error);

      alert(
        "User not found"
      );

    } finally {

      setLoading(false);

    }

  };

 return (

  <div className="login-overlay">

    <div className="text-center">

      <button
        className="btn btn-outline-light mb-4"
        onClick={() => navigate("/login")}
      >
         👈 back 
      </button>

      <div className="card p-5">

        <h2 className="mb-4 text-center">
          Forgot Password
        </h2>

        <input
          className="form-control mb-3"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <button
          className="btn btn-primary w-100"
          onClick={sendOtp}
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Send OTP"}
        </button>

        <button
          className="btn btn-warning mt-2 w-100"
          onClick={sendOtp}
          disabled={loading}
        >
          Resend OTP
        </button>
        </div>

      </div>

    </div>
    

  );

}

export default ForgotPassword;