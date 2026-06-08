import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response =
        await axios.post(
          "http://127.0.0.1:8000/api/token/",
          {
            username,
            password,
          }
        );

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      window.location.href = "/";
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;