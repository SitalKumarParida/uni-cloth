import React, { useState, useEffect } from "react";
import axios from "axios";
import Shop from "./Shop";
import Brand from "./Brand";
import Contact from "./Contact";
import More from "./More";
import Offer from "./Offer";
import Cart from "./Cart";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import ExploreItem from "./ExploreItem";
import styles from "./App.module.css";
import Dashboard from "./Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // ✅ professional icons

// ✅ LoginForm component
function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    userID: "",
    password: "",
    email: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:5009/login"
      : "http://localhost:5009/signup";

    if (!isLogin) {
      const password = formData.password;
      const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

      if (!strongPasswordRegex.test(password)) {
        alert(
          "Password must be at least 8 characters long, include 1 uppercase letter and 1 special character."
        );
        return;
      }
    }

    try {
      const dataToSend = isLogin
        ? { userID: formData.userID, password: formData.password }
        : formData;

      const res = await axios.post(url, dataToSend);
      alert(`${isLogin ? "Login" : "Signup"} Successful: ${res.data.message}`);
      if (isLogin) {
        localStorage.setItem("loggedInUser", formData.userID);
        onLogin(formData.userID);
        navigate("/dashboard");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Server not reachable";
      alert(`${isLogin ? "Login" : "Signup"} Failed: ${msg}`);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}></div>
      <div className={styles.rightPanel}>
        <form onSubmit={handleSubmit} className={styles.container}>
          <h2 className={styles.heading}>
            {isLogin ? " UNI CLOTH" : "⭐ Create New Account"}
          </h2>

          <input
            type="text"
            name="userID"
            placeholder="Enter User ID"
            value={formData.userID}
            onChange={handleChange}
            required
            className={styles.input}
          />

          {!isLogin && (
            <input
              type="email"
              name="email"
              placeholder="📧 Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          )}

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeIcon}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {!isLogin && (
            <p style={{ fontSize: "12px", color: "#888", marginTop: "-8px" }}>
              🔒 Must be 8+ characters, 1 capital letter & 1 special character
            </p>
          )}

          <button type="submit" className={styles.button}>
            {isLogin ? " Login" : "✅ Signup"}
          </button>

          <p className={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: "#3498db", cursor: "pointer", marginLeft: 5 }}
            >
              {isLogin ? "Create One" : "Login"}
            </span>
          </p>

          {isLogin && (
            <p style={{ marginTop: "10px", textAlign: "right" }}>
              <span
                onClick={() => navigate("/forgot-password")}
                style={{
                  color: "#e74c3c",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Forgot Password?
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// ✅ Main App component
function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={setLoggedInUser} />} />
        <Route
          path="/dashboard"
          element={
            loggedInUser ? (
              <Dashboard userID={loggedInUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/shop/:userID" element={<Shop />} />
        <Route path="/offer/:userID" element={<Offer />} />
        <Route path="/brand/:userID" element={<Brand />} />
        <Route path="/contact/:userID" element={<Contact />} />
        <Route path="/explore/:userID" element={<ExploreItem />} />
        <Route path="/cart/:userID" element={<Cart />} />
        <Route path="/more" element={<More />} />
        <Route path="/brand" element={<Brand />} />
      </Routes>
    </Router>
  );
}

export default App;
