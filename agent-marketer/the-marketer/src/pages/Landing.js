import React, { useState } from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios'; // Add this import

function Landing() {
  const navigate = useNavigate();

  // Controlled form state
  const [companyUrl, setCompanyUrl] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state for feedback

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    setLoading(true); // Set loading to true on submit
    setError(null); // Clear any previous errors

    // Prepare data for backend
    const inputData = {
      company_url: companyUrl,
      // You mentioned product_info and competitors, but your backend `analyze` endpoint
      // only uses `company_url`. Make sure your backend expects these if you're sending them.
      // For now, sending what the current backend expects.
      // product_info: productInfo,
      // competitors: [competitorUrl], // Backend currently derives competitors from AI, not input
    };

    try {
      const response = await axios.post('http://localhost:8000/analyze/', inputData);
      // Navigate to results page with the analysis data from the backend
      navigate('/results', { state: { analysis: response.data, url: companyUrl } });
      // navigate('/competitor-analysis', { state: { url: companyUrl } });
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Failed to perform analysis. Please check your input and try again.");
      // You might want to display a more specific error message based on err.response.status
    } finally {
      setLoading(false); // Set loading to false after response or error
    }
  };

  return (
    <div className="landing-container">
      <Navbar />

      <header className="hero">
        <h1>Competitive Analysis & Customer Insights</h1>
      </header>

      <section className="form-section">
        <div className="form-box">
          <h2>Start Your Analysis</h2>
          <p>Enter your website details to get Competitive Insights</p>
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              placeholder="Your Company URL*"
              required
              value={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
            />
            {/* If productInfo and competitorUrl are not used by the backend /analyze endpoint,
                you can remove or comment them out from the form to avoid confusion.
                If they are, ensure your backend's InputData model and logic are updated.
            */}
            <input
              type="text"
              placeholder="Product Info"
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              // required // Removed 'required' as per your previous backend structure not using it
            />
            <input
              type="url"
              placeholder="Competitor's URL"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              // required // Removed 'required' as per your previous backend structure not using it
            />
            <button type="submit" className="analyze-btn" disabled={loading}>
              {loading ? 'ANALYZING...' : 'START ANALYSIS'}
            </button>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Landing;