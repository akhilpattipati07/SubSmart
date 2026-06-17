import React, {
  useEffect,
  useState
} from "react";

import api from "../api/axios";
import { motion } from "framer-motion";
import {
  useNavigate
} from "react-router-dom";

function Notifications() {

  const navigate =
    useNavigate();

  const [
    notifications,
    setNotifications
  ] = useState([]);

 useEffect(() => {

  console.log(
    "Notifications Mounted"
  );

  fetchNotifications();

}, []);

  const fetchNotifications =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "access"
        );

      console.log("TOKEN",token);

      console.log({
    Authorization:
      `Bearer ${token}`
  });

      const response =
        await api.get(
          "http://127.0.0.1:8000/notifications/",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

       console.log(response.data);

      setNotifications(
        response.data
      );

    }  catch (error) {

  console.log(error);

  console.log(error.response);

  console.log(error.response?.data);

  alert("Failed to load notifications");

}

  };

  const markRead =
    async (id) => {

    try {

      const token =
        localStorage.getItem(
          "access"
        );

      await api.post(
        `http://127.0.0.1:8000/notifications/${id}/`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchNotifications();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="container p-4">

      <button
        className="premium-back-btn"
        onClick={() =>
          navigate("/")
        }
      >
        ← Back to Dashboard
      </button>

      <h2 className="mb-4">
        🔔 Notifications
      </h2>

      {notifications.length === 0 ? (

        <div
          className="glass-card p-4"
        >
          No Notifications
        </div>

      ) : (

        notifications.map(
          (n) => (

            <motion.div
  key={n.id}
  initial={{
    opacity:0,
    x:-40
  }}
  animate={{
    opacity:1,
    x:0
  }}
  whileHover={{
    x:10
  }}
  transition={{
    duration:0.3
  }}
              className="glass-card notification-card p-3 mb-3"
              onClick={() =>
                markRead(n.id)
              }
              style={{
                cursor:
                  "pointer",
                opacity:
                  n.is_read
                    ? 0.7
                    : 1
              }}
            >

              <h5>
                {n.title}
              </h5>

              <p>
                {n.message}
              </p>

              {!n.is_read && (

                <span
                  className="badge bg-danger"
                >
                  New
                </span>

              )}

            </motion.div>

          )
        )

      )}

    </div>

  );

}

export default Notifications;