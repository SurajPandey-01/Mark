import React from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";
import Navbar from "../components/Navbar";

export default function Onboarding() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");  // Redirect to Sign In page
  };

  return (
    <>
      <Navbar />
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="onboarding-header">
          <h2 className="onboarding-title">Onboarding Guide</h2>
          <button className="onboarding-back-btn" onClick={handleBack}>
            Back to Main Page
          </button>
        </div>

        <p className="onboarding-intro">
          Welcome to <span className="highlight-blue">Mark the Marketer</span> — your all-in-one solution for
          understanding your market, gaining insights into customer behavior, and outsmarting your competition.
          This guide will walk you through everything you need to know to get started smoothly.
        </p>

        <p className="step-title step-color">Step 1: Setting Up Your Foundation & Connecting Your Data</p>
        <ul className="step-list">
          <li>Go to the "Competitive Analysis & Customer Insights" section.</li>
          <li>Input your company URL and provide a short description of your products/services.</li>
          <li>Add up to 5 competitor URLs to generate a market comparison dashboard.</li>
          <li>Our AI will securely populate data and generate analytics automatically.</li>
          <li>Click “Start Analysis” to begin your first scan.</li>
        </ul>

        <p className="step-title step-color">Step 2: Exploring Your Dashboard</p>
        <ul className="step-list">
          <li>Access your personalized dashboard by logging in.</li>
          <li>Review SEO performance, engagement rates, traffic sources, and keyword visibility.</li>
          <li>Red highlights show urgent areas that need improvement — start there for quick wins.</li>
          <li>Download reports or export insights to your team anytime.</li>
        </ul>

        <p className="step-title step-color">Step 3: Optimizing & Tracking</p>
        <ul className="step-list">
          <li>Use the AI-powered recommendations to improve weak areas instantly.</li>
          <li>Track how each improvement boosts your market positioning over time.</li>
          <li>Set goals and get alerts when performance drops below set benchmarks.</li>
        </ul>

        <p className="footer-text">
          Need help along the way? Visit our{" "}
          <span className="highlight-blue">Help Center</span> or contact{" "}
          <span className="highlight-blue">Support Team</span> 24/7.
          We're here to make sure you grow smarter, faster, and stronger in your niche!
        </p>
      </div>
    </div>
    </>
  );
}

