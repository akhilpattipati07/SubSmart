import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {

      await api.post(
        "http://127.0.0.1:8000/register/",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      alert(
        "Account Created Successfully"
      );

      navigate("/login");

    } catch (error) {

      if (
        error.response &&
        error.response.data
      ) {
        alert(
          JSON.stringify(
            error.response.data
          )
        );
      } else {
        alert(
          "Registration Failed"
        );
      }

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

        <h2 className="text-center mb-4">
          🚀 Create Account
        </h2>

        <form onSubmit={handleRegister}>

          <input
            className="form-control mb-3"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Create Account
          </button>

          <button
            type="button"
            className="btn btn-outline-light w-100 mt-3"
            onClick={() =>
              navigate("/login")
            }
          >
            Back To Login
          </button>

        </form>

      </div>

    </div>

  );

}

export default Register;