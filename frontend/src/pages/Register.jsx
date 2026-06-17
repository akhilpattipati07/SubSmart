import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleRegister = async (e) => {

e.preventDefault();

if (!formData.username.trim()) {
alert("Username is required");
return;
}

if (!formData.email.trim()) {
alert("Email is required");
return;
}

const emailRegex =
/^[^\s@]+@[^\s@]+.[^\s@]+$/;

if (!emailRegex.test(formData.email)) {
alert("Enter a valid email address");
return;
}

if (formData.password.length < 6) {
alert(
"Password must be at least 6 characters"
);
return;
}

if (
formData.password !==
formData.confirmPassword
) {
alert(
"Passwords do not match"
);
return;
}

setLoading(true);

try {


await api.post(
  "http://127.0.0.1:8000/register-otp/",
  {
    username:
      formData.username,

    email:
      formData.email,

    password:
      formData.password,
  }
);

alert(
  "OTP sent to your email"
);

navigate(
  "/verify-registration-otp",
  {
    state: {
      email:
        formData.email,
    },
  }
);


} catch (error) {


console.log(error);

alert(
  error?.response?.data?.error ||
  "Failed to send OTP"
);


} finally {


setLoading(false);


}

};

  

            

  return (

    <div className="login-overlay">

      <div className="card p-5">

        <h2 className="text-center mb-4">
          🚀 Create Account
        </h2>

        <form
          onSubmit={
            handleRegister
          }
        >

          <input
            className="form-control mb-3"
            placeholder="Username"
            name="username"
            value={
              formData.username
            }
            onChange={
              handleChange
            }
          />

          <input
  type="email"
  className="form-control mb-3"
  placeholder="Email"
  name="email"
  value={
    formData.email
  }
  onChange={
    handleChange
  }
  required
/>

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={
              formData.confirmPassword
            }
            onChange={
              handleChange
            }
          />

          <button
            className="btn btn-success w-100"
            type="submit"
            disabled={loading}
          >
            {
              loading
                ? "Sending OTP..."
                : "Create Account"
            }
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