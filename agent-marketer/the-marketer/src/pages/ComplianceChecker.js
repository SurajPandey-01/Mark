import React, { useState } from "react";
import "./ComplianceChecker.css";
import Navbar from '../components/Navbar';

const ComplianceChecker = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [complianceData, setComplianceData] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckCompliance = async () => {
    setLoading(true);
    setComplianceData(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch compliance data");
      }

      const data = await response.json();
      setComplianceData(data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCheckCompliance();
  };

  return (
    <>
      <Navbar />
      <div className="compliance-container">
        <h1>Compliance Checker</h1>

        <form className="compliance-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit">Check Compliance</button>
        </form>

        {loading && <p className="loading">Checking compliance...</p>}
        {error && <p className="error">{error}</p>}

        {complianceData && (
          <div className="compliance-summary">

            <div className="summary-section">
              <strong>Privacy & Data Use Notices:</strong>
              <span>{complianceData.privacy_notices}</span>
            </div>

            <div className="summary-section">
              <strong>Content Restrictions:</strong>
              <span>{complianceData.content_restrictions}</span>
            </div>

            <div className="summary-section">
              <strong>GDPR Compliant:</strong>
              <span>{complianceData.gdpr}</span>
            </div>

            <div className="summary-section">
              <strong>Copyright:</strong>
              <span>{complianceData.copyright}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ComplianceChecker;