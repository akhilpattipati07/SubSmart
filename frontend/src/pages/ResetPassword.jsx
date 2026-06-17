import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const resetPassword = async () => {

    try {

      await api.post(
        "http://127.0.0.1:8000/reset-password/",
        {
          email,
          password,
        }
      );

      alert(
        "Password Updated Successfully"
      );

      navigate("/login");

    } catch {

      alert(
        "Failed to reset password"
      );

    }

  };

  return (

    <div className="login-overlay">

      <div className="card p-5">

        <h2>
          Reset Password
        </h2>

        <input
          className="form-control mt-3"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mt-3"
          placeholder="New Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-success mt-3 w-100"
          onClick={resetPassword}
        >
          Update Password
        </button>

      </div>

    </div>

  );

}

export default ResetPassword;