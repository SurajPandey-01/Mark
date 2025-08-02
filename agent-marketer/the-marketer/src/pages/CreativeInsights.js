import React, { useState } from 'react';
import './CreativeInsights.css';
import Navbar from '../components/Navbar';

const CreativeInsights = () => {
  const [adLink, setAdLink] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImproveClick = async () => {
    if (!adLink.trim()) {
      setError('Please enter a valid URL.');
      return;
    }

    setError('');
    setLoading(true);
    setSuggestions([]);

    try {
      const response = await fetch('http://localhost:8000/analyze/creative-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: adLink }),
      });

      const data = await response.json();

      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
      } else {
        setError('No suggestions found. Try a different URL.');
      }
    } catch (err) {
      console.error('Error fetching creative insights:', err);
      setError('An error occurred while fetching insights.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="creative-page">
        <h2 className="creative-heading">Creative Insights Analysis</h2>

        <div className="creative-box">
          <input
            type="text"
            placeholder="Enter ad link"
            value={adLink}
            onChange={(e) => setAdLink(e.target.value)}
            className="creative-input"
            required
          />
          <button className="improve-button" onClick={handleImproveClick} disabled={loading}>
            {loading ? 'Analyzing...' : 'Improve Content'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {suggestions.length > 0 && (
          <div className="suggestions-section">
            <h3>Suggestions to Improve Content:</h3>
            <ul>
              {suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CreativeInsights;