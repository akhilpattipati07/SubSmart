import React, { useState } from "react";
import api from "../api/axios";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ChangePassword() {

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const navigate = useNavigate();

  const changePassword = async () => {

    try {

      const token =
        localStorage.getItem(
          "access"
        );

      await api.post(
        "http://127.0.0.1:8000/change-password/",
        {
          old_password:
            oldPassword,
          new_password:
            newPassword,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Password Changed"
      );

    } catch {

      alert(
        "Invalid Current Password"
      );

    }

  };

  return (

    <div
  className="glass-card floating-card p-5 mx-auto"
  style={{
    maxWidth: "700px"
  }}
>

  <button
    className="btn btn-outline-light mb-4"
    onClick={() => navigate("/profile")}
  >
    ← Back To Profile
  </button>

  <h3 className="mb-4">
    <FaLock /> Change Password
  </h3>

  <input
    type="password"
    className="form-control form-control-lg mt-3"
    placeholder="Current Password"
    value={oldPassword}
    onChange={(e) =>
      setOldPassword(e.target.value)
    }
  />

  <input
    type="password"
    className="form-control form-control-lg mt-3"
    placeholder="New Password"
    value={newPassword}
    onChange={(e) =>
      setNewPassword(e.target.value)
    }
  />

  <button
    className="btn btn-warning btn-lg w-100 mt-4"
    onClick={changePassword}
  >
    Change Password
  </button>

</div>
    

  );

}

export default ChangePassword;