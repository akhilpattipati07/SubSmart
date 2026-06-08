import React from "react";

function LogoutButton() {

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <button
      className="btn btn-danger"
      onClick={logout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;