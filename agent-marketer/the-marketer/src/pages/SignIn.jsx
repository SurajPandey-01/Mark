import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import Navbar from "../components/Navbar";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // optional: store token
        navigate("/");
      } else {
        setError(data.detail || "Invalid credentials");
      }
    } catch (err) {
      console.error("Sign in failed:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="signin-card">
          <h2 className="signin-title">Sign In</h2>
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Enter your email"
              className="signin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="signin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>
          {error && <p className="signin-error">{error}</p>}
          <p className="signin-footer-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="signin-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;