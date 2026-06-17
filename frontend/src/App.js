import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { ThemeProvider } from "./components/ThemeContext";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Subscriptions from "./pages/Subscriptions";
import AdminDashboard from "./pages/AdminDashboard";
import Reminders from "./pages/Reminders";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import VerifyRegistrationOtp from "./pages/VerifyRegistrationOtp";
import Notifications
from "./pages/Notifications";
import EditProfile from "./pages/EditProfile";
import AIAssistant from "./pages/AIAssistant";
function App() {

  const token =
    localStorage.getItem("access");

  return (
    <ThemeProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={
              token
                ? <Dashboard />
                : <Login />
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/verify-otp"
            element={<VerifyOtp />}
          />

          <Route
            path="/notifications"
            element={
              <Notifications />
            }
          />

          <Route
            path="/verify-registration-otp"
            element={ <VerifyRegistrationOtp /> }
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route
            path="/change-password"
            element={<ChangePassword />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/analytics"
            element={
              token
                ? <Analytics />
                : <Login />
            }
          />

          <Route
            path="/settings"
            element={
              token
                ? <Settings />
                : <Login />
            }
          />

          <Route
            path="/profile"
            element={
              token
                ? <Profile />
                : <Login />
            }
          />

          <Route
            path="/edit-profile"
            element={<EditProfile />}
          />

          <Route
            path="/subscriptions"
            element={
              token
                ? <Subscriptions />
                : <Login />
            }
          />

          <Route
  path="/ai-assistant"
  element={
    token
      ? <AIAssistant />
      : <Login />
  }
/>

          <Route
            path="/reminders"
            element={
              token
                ? <Reminders />
                : <Login />
            }
          />

          <Route
            path="/admin"
            element={
              token
                ? <AdminDashboard />
                : <Login />
            }
          />

        </Routes>

      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;