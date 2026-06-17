import React, {
useEffect,
useState
} from "react";

import api from "../api/axios";
import { motion } from "framer-motion";
import {
useNavigate
} from "react-router-dom";
import Tilt from
"react-parallax-tilt";
import CountUp from
"react-countup";
function Profile() {

const [
  notifications,
  setNotifications
] = useState([]);


const navigate =
useNavigate();

const username =
localStorage.getItem(
"username"
) || "User";

const [
subscriptions,
setSubscriptions
] = useState([]);

const [
profileImage,
setProfileImage
] = useState("");

const [email, setEmail] = useState("");

const [profile, setProfile] = useState(null);

useEffect(() => {

fetchData();
fetchProfile();
fetchNotifications();

}, []);

const fetchData = async () => {


try {

  const token =
    localStorage.getItem(
      "access"
    );

  const response =
    await api.get(
      "http://127.0.0.1:8000/api/subscriptions/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  setSubscriptions(
    response.data
  );

} catch (error) {

  console.log(error);

}


};


const fetchNotifications =
async () => {

  try {

    const token =
      localStorage.getItem(
        "access"
      );

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

    setNotifications(
      response.data
    );

  } catch(error) {

    console.log(error);

  }

};



const fetchProfile = async () => {


try {

  const token =
    localStorage.getItem(
      "access"
    );

  const response =
    await api.get(
      "http://127.0.0.1:8000/profile/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  console.log(response.data);

  setProfile(response.data);

  setEmail(response.data.email);

  if (
    response.data.image
  ) {

    setProfileImage(
      `http://127.0.0.1:8000${response.data.image}`
    );

  }

} catch (error) {

  console.log(error);

}


};

const handleImageUpload =
async (e) => {


const file =
  e.target.files[0];

if (!file) return;

const formData =
  new FormData();

formData.append(
  "image",
  file
);

try {

  const token =
    localStorage.getItem(
      "access"
    );

  await api.post(
    "http://127.0.0.1:8000/upload-profile/",
    formData,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  alert(
    "Profile Photo Updated"
  );

  fetchProfile();

} catch (error) {

  console.log(error);

  alert(
    "Upload Failed"
  );

}


};

const removePhoto =
async () => {


try {

  const token =
    localStorage.getItem(
      "access"
    );

  await api.delete(
    "http://127.0.0.1:8000/delete-profile-image/",
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  setProfileImage("");

  alert(
    "Photo Removed"
  );

} catch (error) {

  console.log(error);

}


};

const totalSpend =
subscriptions.reduce(
(sum, sub) =>
sum +
Number(
sub.cost || 0
),
0
);

const savings =
Math.round(
totalSpend * 0.15
);

const annualSpend =
  totalSpend * 12;

const unreadNotifications =
notifications.filter(
  n => !n.is_read
).length;

const activePlans =
subscriptions.length;

const healthScore =
(
  (email ? 25 : 0) +
  (profileImage ? 25 : 0) +
  (activePlans > 0 ? 25 : 0) +
  25
);

return (


<motion.div
  className="container p-4"
  initial={{
    opacity:0,
    y:40
  }}
  animate={{
    opacity:1,
    y:0
  }}
  transition={{
    duration:0.6
  }}
>

  <button
    className= "premium-back-btn"
    onClick={() =>
      navigate("/")
    }
  >
    ← Back to Dashboard
  </button>

  <div
    className="glass-card p-5"
    style={{
      maxWidth: "950px",
      margin: "auto",
    }}
  >

    <div className="text-center">

      <div
        style={{
          position: "relative",
          width: "180px",
          height: "180px",
          margin: "auto",
        }}
      >

        {profileImage ? (

          <motion.img
            className="profile-image"
            src={profileImage}
            alt=""
            whileHover={{
  scale:1.1,
  rotate:3
}}
transition={{
  duration:0.3
}}
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              objectFit: "cover",
              border:
                "5px solid #06B6D4",
              boxShadow:
                "0 0 40px #06B6D4",
            }}
          />

        ) : (

          <div
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background:"linear-gradient(135deg,#111827,#1F2937)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "70px",
              color: "white",
              fontWeight: "bold",
              boxShadow:
                "0 0 40px #06B6D4",
            }}
          >
            {username
              .charAt(0)
              .toUpperCase()}
          </div>

        )}


        <div className="profile-avatar-wrapper">
        <label
          htmlFor="profileUpload"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            background:
              "#06B6D4",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "20px",
            boxShadow:
              "0 0 15px #06B6D4",
          }}
        >
          📷
        </label>

        <input
          id="profileUpload"
          type="file"
          accept="image/*"
          style={{
            display: "none",
          }}
          onChange={
            handleImageUpload
          }
        />

        </div>

      </div>

      {profileImage && (

        <button
          className="btn btn-danger mt-3"
          onClick={
            removePhoto
          }
        >
          Remove Photo
        </button>

      )}


     <div
  style={{
    background:
      "linear-gradient(135deg,#4F46E5,#06B6D4)",
    borderRadius:"20px",
    padding:"25px",
    marginTop:"20px",
    marginBottom:"20px",
    color:"white"
  }}
>
  <Tilt
  tiltMaxAngleX={8}
  tiltMaxAngleY={8}
  glareEnable={true}
  glareMaxOpacity={0.2}
>

  <div
   className="floating-card animated-gradient glow-card"
  style={{
    background:
"linear-gradient(-45deg,#4F46E5,#9333EA,#FB7185,#F97316)",
    borderRadius:"30px",
    padding:"40px",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    color:"white",
    marginBottom:"30px"
  }}
>

  <div className="d-flex align-items-center">

    <div
      style={{
        width:"150px",
        height:"150px",
        borderRadius:"50%",
        background:"#6366F1",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        fontSize:"60px",
        fontWeight:"bold",
        marginRight:"30px",
        border:"4px solid rgba(255,255,255,.3)"
      }}
    >
      {username.charAt(0).toUpperCase()}
    </div>

    <div>

      <h1>{username}</h1>

      <h4>{email}</h4>

      

      <span
        className="badge"
        style={{
          background:"rgba(255,255,255,.2)",
          padding:"10px"
        }}
      >
        ✔ Verified Account
      </span>

    </div>

  </div>

  <div>

    <h5>Member Since</h5>

    <h3>
      {
        profile?.date_joined
          ? new Date(profile.date_joined)
              .toLocaleDateString()
          : "-"
      }
    </h3>

  </div>

</div>
</Tilt>



    </div>

    <hr />

    <div className="row g-4 mb-4">

  <div className="col-md-3">
    <motion.div
  className="glass-card stats-card p-4 text-center"
  whileHover={{
    scale:1.05,
    y:-10
  }}
  transition={{
    duration:0.3
  }}
>
      <h5>📦 Active Plans</h5>
      <h1>
  <CountUp
    end={activePlans}
    duration={2}
  />
</h1>
      <small>Total Subscriptions</small>
    </motion.div>
  </div>

  <div className="col-md-3">
    <motion.div
  className="glass-card stats-card p-4 text-center"
  whileHover={{
    scale:1.05,
    y:-10
  }}
  transition={{
    duration:0.3
  }}
>
      <h5>💰 Monthly Spend</h5>
      <h1>
 ₹
 <CountUp
   end={totalSpend}
   duration={2}
 />
</h1>
      <small>This Month</small>
    </motion.div>
  </div>

  <div className="col-md-3">
    <motion.div
  className="glass-card stats-card p-4 text-center"
  whileHover={{
    scale:1.05,
    y:-10
  }}
  transition={{
    duration:0.3
  }}
>
      <h5>📅 Annual Spend</h5>
      <h1>
 ₹
 <CountUp
   end={annualSpend}
   duration={2}
 />
</h1>
      <small>This Year</small>
    </motion.div>
  </div>

  <div className="col-md-3">
    <motion.div
  className="glass-card stats-card p-4 text-center"
  whileHover={{
    scale:1.05,
    y:-10
  }}
  transition={{
    duration:0.3
  }}
>
      <h5>📈 Savings</h5>
      <h1>
 ₹
 <CountUp
   end={savings}
   duration={2}
 />
</h1>
      <small>Estimated Savings</small>
    </motion.div>
  </div>

</div>

<div className="glass-card p-4 mb-4">

  <h3>
    💚 Account Health
  </h3>

  <div
    className="progress mt-4"
    style={{
      height:"25px"
    }}
  >

    <div
      className="progress-bar bg-success"
      style={{
  width: `${healthScore}%`
}}
    >
      {healthScore}%
    </div>

  </div>

  <p className="mt-3">
    Great job! Your account is fully optimized.
  </p>

</div>


  

  <div className="row g-4 mt-5">

  {/* LEFT COLUMN */}
  <div className="col-md-6">

    <motion.div className="glass-card p-4 mb-4">
      <h4>📄 Recent Subscriptions</h4>

      {
        subscriptions.length > 0
        ? subscriptions.slice(0,3).map(sub => (

          <div key={sub.id}>
            <strong>{sub.name}</strong>
            <br />
            ₹{sub.cost}
            <hr />
          </div>

        ))
        : <p>No subscriptions found.</p>
      }

      <motion.div
  initial={{
    opacity:0,
    y:30
  }}
  animate={{
    opacity:1,
    y:0
  }}
  transition={{
    delay:0.2
  }}
></motion.div>

    </motion.div>

    <div className="glass-card p-4">

      <h4>🔔 Notification Summary</h4>

      <div className="row text-center">

        <div className="col-6">
          <h1>{notifications.length}</h1>
          <p>Total Notifications</p>
        </div>

        <div className="col-6">
          <h1>{unreadNotifications}</h1>
          <p>Unread Notifications</p>
        </div>

      </div>

    </div>

  </div>

  {/* RIGHT COLUMN */}
  <div className="col-md-6">

    <div className="glass-card p-4">

      <h4>👤 Account Information</h4>

      <hr />

      <p>
        <strong>Username:</strong> {username}
      </p>

      <p>
        <strong>Email:</strong> {email || "Not Added"}
      </p>

      <p>
        <strong>Notifications:</strong> {notifications.length}
      </p>

      <p>
        <strong>Member Since:</strong>{" "}
        {
          profile?.date_joined
          ? new Date(profile.date_joined)
              .toLocaleDateString()
          : "-"
        }
      </p>

      <p>
        <strong>Status:</strong> Active
      </p>

      <hr />

      <h5 className="mb-3">
        ⚡ Quick Actions
      </h5>

      <div className="d-flex flex-wrap gap-2">

        <button
  className="btn btn-primary  action-btn"
  onClick={() => navigate("/notifications")}
>
  🔔 Notifications
</button>

<button
  className="btn btn-secondary  action-btn"
  onClick={() => navigate("/change-password")}
>
  🔒 Change Password
</button>

<button
  className="btn btn-info  action-btn"
  onClick={() => navigate("/edit-profile")}
>
  ✏ Edit Profile
</button>

<button
  className="btn btn-warning  action-btn"
  onClick={() => navigate("/analytics")}
>
  📊 Analytics
</button>

      </div>

    </div>

  </div>

</div>
  
  </div>

</div>
</motion.div>


);

}

export default Profile;
