import React, {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

import {
  useNavigate
} from "react-router-dom";

function EditProfile() {

  const navigate =
    useNavigate();

  const [
    username,
    setUsername
  ] = useState("");

  const [
    email,
    setEmail
  ] = useState("");

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "access"
        );

      const response =
        await api.get(
          "/profile/",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setUsername(
        response.data.username
      );

      setEmail(
        response.data.email
      );

    } catch(error) {

      console.log(error);

    }

  };

  const saveProfile =
    async () => {

    try {
      
      const token = localStorage.getItem("access");

      console.log("TOKEN:", token);

      

      await api.put(
        "/profile/update/",
        {
          username,
          email
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "username",
        username
      );

      alert(
        "Profile Updated Successfully"
      );

      navigate("/profile");

    } catch(error) {

      console.log(error);

      alert(
        "Failed To Update Profile"
      );

    }

  };

  return (

    <div className="container p-4">

      <button
        className="btn btn-outline-light mb-4"
        onClick={() =>
          navigate("/profile")
        }
      >
        ← Back To Profile
      </button>

      <div
        className="glass-card p-5"
        style={{
          maxWidth:"700px",
          margin:"auto"
        }}
      >

        <h2 className="mb-4">
          ✏ Edit Profile
        </h2>

        <label>
          Username
        </label>

        <input
          className="form-control mb-3"
          value={username}
          onChange={(e)=>
            setUsername(
              e.target.value
            )
          }
        />

        <label>
          Email
        </label>

        <input
          type="email"
          className="form-control mb-4"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
        />

        <button
          className="btn btn-success w-100"
          onClick={
            saveProfile
          }
        >
          Save Changes
        </button>

      </div>

    </div>

  );

}

export default EditProfile;