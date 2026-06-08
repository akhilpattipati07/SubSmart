import React from "react";

function UserProfile() {
  return (
    <div className="glass-card p-4">

      <div className="text-center">

        <img
          src="https://i.pravatar.cc/150"
          alt="avatar"
          style={{
            width:"120px",
            height:"120px",
            borderRadius:"50%",
            border:"4px solid #4F46E5"
          }}
        />

        <h3 className="mt-3">
          Sakhina
        </h3>

        <span
          className="badge bg-success"
        >
          Premium Member
        </span>

      </div>

      <hr />

      <div className="row text-center">

        <div className="col">
          <h4>12</h4>
          <small>Subscriptions</small>
        </div>

        <div className="col">
          <h4>₹4299</h4>
          <small>Monthly Spend</small>
        </div>

        <div className="col">
          <h4>3</h4>
          <small>Renewals</small>
        </div>

      </div>

    </div>
  );
}

export default UserProfile;