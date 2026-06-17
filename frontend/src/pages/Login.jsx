import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "http://127.0.0.1:8000/api/token/",
          {
            username,
            password,
          }
        );

      console.log(response.data);

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      localStorage.setItem(
        "username",
        username
      );

      navigate("/");

      window.location.reload();

    } catch (error) {

      alert(
        "Invalid Username or Password"
      );

      console.log(error);

    }

  };

  return (

    <div className="login-overlay">

      <div
        className="card p-5"
        style={{
          width: "450px",
          background: "#111827",
          color: "white",
          borderRadius: "25px",
          border: "none",
          boxShadow:
            "0 20px 60px rgba(0,0,0,.5)",
        }}
      >

        <h2 className="mb-4 text-center">
          🔐 Login to SubSmart
        </h2>

        <form onSubmit={handleLogin}>

          <input
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-3">
          Don't have an account?
        </p>

        <button
          className="btn btn-outline-light w-100"
          onClick={() =>
            navigate("/register")
          }
        >
          Create Account
        </button>

        <button
          type="button"
          className="btn btn-link w-100 mt-2"
          style={{
            color: "#06B6D4",
            textDecoration: "none",
          }}
          onClick={() =>
            navigate("/forgot-password")
          }
        >
          Forgot Password?
        </button>

      </div>

    </div>

  );

}

export default Login;