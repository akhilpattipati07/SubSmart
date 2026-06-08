import React from "react";
import UserProfile from "../components/UserProfile";

function Profile() {
  return (
    <div className="container-fluid p-4">

      <h2 className="premium-title mb-4">
        My Profile
      </h2>

      <UserProfile />

    </div>
  );
}

export default Profile;