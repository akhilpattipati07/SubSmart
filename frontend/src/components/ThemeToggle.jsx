import React, {
  useContext
} from "react";

import {
  ThemeContext
} from "../context/ThemeContext";

function ThemeToggle() {

  const {
    darkMode,
    setDarkMode
  } = useContext(
    ThemeContext
  );

  return (
    <button
      className="btn btn-primary"
      onClick={() =>
        setDarkMode(
          !darkMode
        )
      }
    >
      {darkMode
        ? "☀ Light"
        : "🌙 Dark"}
    </button>
  );
}

export default ThemeToggle;