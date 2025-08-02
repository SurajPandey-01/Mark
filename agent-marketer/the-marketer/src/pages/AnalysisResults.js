import React from 'react';
import './AnalysisResults.css'; // Ensure this CSS file is created/updated
import Navbar from '../components/Navbar';
import { useLocation, useNavigate, Link } from 'react-router-dom';


// Helper function to format text into bullet points
const formatTextToPoints = (text) => {
  if (!text) return [];
  // Split by sentence-ending punctuation followed by a space or end of string
  // This regex is a simple approach; for more complex cases, a dedicated NLP library might be needed.
  const sentences = text.split(/(?<=[.?!])\s+(?=[A-Z0-9]|$)/).filter(s => s.trim() !== '');
  return sentences.map(s => s.trim());
};

const AnalysisResults = () => {
  const location = useLocation();
  const analysis = location?.state?.analysis || {};

  const pagespeed = analysis.pagespeed || {};
  const seo = analysis.seo || {};
  const uptime = analysis.uptime || {};
  const creative = analysis.creative || {};
  const competitors = analysis.competitors || [];
  //const compliance = analysis.compliance || {};

  const navigate = useNavigate();

  const handleComplianceClick = () => {
    navigate('/compliance');
  };

  if (Object.keys(analysis).length === 0 || analysis.error) {
    return (
      <>
        <Navbar />
        <div className="analysis-page">
          <p className="error-msg">No analysis data received or an error occurred. Please go back and try again.</p>
          {analysis.error && <p className="error-msg">Backend Error: {analysis.error}</p>}
        </div>
      </>
    );
  }

  // Format the scores and remarks
  const formattedPagespeedScore = pagespeed.score !== null ? parseFloat(pagespeed.score).toFixed(1) : 'N/A';
  const formattedSeoScore = seo.score !== null ? seo.score : 'N/A'; // Assuming SEO score comes as string "X/10" or similar
  const formattedUptimePercentage = uptime.percentage ? `${parseFloat(uptime.percentage).toFixed(1)}%` : 'N/A';

  const pagespeedRemarksPoints = formatTextToPoints(pagespeed.remarks);
  const seoRemarksPoints = formatTextToPoints(seo.remarks);
  const uptimeDetailsPoints = formatTextToPoints(uptime.details);

  return (
    <>
      <Navbar />
      <div className="analysis-page">
        {/* Top Navigation Tabs */}
        <div className="analysis-tabs">
          <button
            onClick={() => navigate('/creative-insights')}
            className="tab-btn"
          >
            Creative Insights
          </button>
          <Link to="/competitor-analysis">
            <button className="tab-btn">Competitor Analysis</button>
          </Link>
          <button className="tab-btn" onClick={handleComplianceClick}>Compliance Checker</button>
        </div>

        {/* Section: Performance Metrics (Inspired by the new image) */}
        <div className="section-container">
          <h2 className="section-title">Performance Metrics</h2> {/* Renamed title */}
          <div className="kpi-grid">
            {/* PageSpeed Card */}
            <div className="kpi-card">
              <h3 className="kpi-title">PageSpeed</h3>
              {/* Displaying Pagespeed score */}
              <p className="kpi-value">{formattedPagespeedScore}</p>
              <div className="kpi-remark-points">
                {pagespeedRemarksPoints.length > 0 ? (
                  <ul>
                    {pagespeedRemarksPoints.map((point, idx) => (
                      <li key={`ps-remark-${idx}`}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{pagespeed.remarks || 'N/A'}</p>
                )}
              </div>
            </div>

            {/* SEO Score Card */}
            <div className="kpi-card">
              <h3 className="kpi-title">SEO Score</h3>
              {/* Displaying SEO score */}
              <p className="kpi-value">{formattedSeoScore}</p>
              <div className="kpi-remark-points">
                {seoRemarksPoints.length > 0 ? (
                  <ul>
                    {seoRemarksPoints.map((point, idx) => (
                      <li key={`seo-remark-${idx}`}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{seo.remarks || 'N/A'}</p>
                )}
              </div>
            </div>

            {/* Uptime Card */}
            <div className="kpi-card">
              <h3 className="kpi-title">Uptime</h3>
              {/* Displaying Uptime percentage, aligned as requested */}
              <p className="kpi-value">{formattedUptimePercentage}</p>
              <div className="kpi-remark-points">
                {uptimeDetailsPoints.length > 0 ? (
                  <ul>
                    {uptimeDetailsPoints.map((point, idx) => (
                      <li key={`up-detail-${idx}`}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{uptime.details || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Top Competitors (Retained from previous structure) */}
        <div className="section-container">
          <h2 className="section-title">Top Competitors</h2>
          <div className="competitor-grid">
            {competitors.length > 0 ? (
              competitors.slice(0, 3).map((comp, idx) => (
                <div key={idx} className="competitor-card">
                  <div className="competitor-rank">{idx + 1}</div>
                  <h3 className="competitor-name">{comp.name || 'N/A'}</h3>
                  {/* <p className="competitor-details">Details not available</p> */}
                  <div className="competitor-tags">
                    <span className="tag">SEO</span>
                    <span className="tag">Content</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data-msg">No competitors found.</p>
            )}
          </div>
        </div>

        {/* Section: Sentiment Analysis (Retained from previous structure, but Brand Trust removed) */}
        <div className="section-container">
          <h2 className="section-title">Sentiment Analysis</h2>
          <div className="sentiment-grid">
            <div className="sentiment-card">
              <h3 className="sentiment-title">Overall Sentiment</h3>
              <p className="sentiment-value">{creative.sentiment || 'N/A'}</p>
              <p className="sentiment-remark">Readability: {creative.readability || 'N/A'}</p>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '70%', backgroundColor: '#4CAF50' }}></div>
              </div>
              {/* <p className="progress-label">Product Quality (N/A)</p> Placeholder for specific sentiment */}
            </div>
            {/* The second sentiment card (Brand Trust) has been removed as requested. */}
          </div>
        </div>

        {/* Section: Compliance (Retained from previous structure)
        <div className="section-container">
          <h2 className="section-title">Compliance</h2>
          <div className="compliance-grid">
            <div className="compliance-card">
              <h3 className="compliance-title">GDPR Compliance</h3>
              <p className="compliance-status">{compliance.gdpr || 'N/A'}</p>
            </div>
            <div className="compliance-card">
              <h3 className="compliance-title">Copyright Check</h3>
              <p className="compliance-status">{compliance.copyright || 'N/A'}</p>
            </div>
          </div>
        </div> */}

        {/* Overall Summary - if you have this from Gemini, display it here */}
        {analysis.overall_summary && (
          <div className="section-container">
            <h2 className="section-title">Overall Analysis Summary</h2>
            <div className="summary-card">
              <p>{analysis.overall_summary}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AnalysisResults;