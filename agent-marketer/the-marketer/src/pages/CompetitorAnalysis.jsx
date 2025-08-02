
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompetitorAnalysis.css";
import Navbar from "../components/Navbar";

// Generic Card component
const Card = ({ title, value }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

// Section wrapper
const Section = ({ title, children, colorClass }) => (
  <div className={`section ${colorClass}`}>
    <h2 className="section-title">{title}</h2>
    <div className="cards-container">{children}</div>
  </div>
);

// Top Competitor entry
const CompetitorEntry = ({ icon, name, stats, tags }) => (
  <div className="competitor-entry-card">
    <div className="competitor-icon">{icon}</div>
    <div className="competitor-details">
      <h3>{name}</h3>
      <p>{stats}</p>
    </div>
    <div className="competitor-tags">
      {tags.map((tag, i) => (
        <span key={i} className={`tag ${tag.bgClass} ${tag.textColorClass}`}>
          {tag.text}
        </span>
      ))}
    </div>
  </div>
);

// Shared progress bar logic component
const SentimentSegmentDisplay = ({ label, value, description }) => {
  const numericValue = parseInt(value); // e.g., '75%' -> 75
  let barColor = '';
  if (numericValue >= 70) barColor = 'green';
  else if (numericValue >= 40) barColor = 'orange';
  else barColor = 'red';

  return (
    <div className="sentiment-segment-card">
      <p className="sentiment-segment-label">{label}</p>
      {description && <p className="sentiment-segment-description">{description}</p>}
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{
            width: `${numericValue}%`,
            backgroundColor: barColor,
          }}
        ></div>
      </div>
      <span className="sentiment-segment-value">{value}</span>
    </div>
  );
};

// Audience Metric with optional trend
const AudienceMetricDisplay = ({ label, value, change, changeColorClass }) => (
  <div className="audience-metric-card">
    <p className="audience-metric-label">{label}</p>
    <div className="audience-metric-value-wrapper">
      <span className="audience-metric-value">{value}</span>
      {change && <span className={`audience-metric-change ${changeColorClass}`}>{change}</span>}
    </div>
  </div>
);

const CompetitorAnalysis = ({ location }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = location?.state?.url || "https://www.nike.com/";

  useEffect(() => {
    axios.post("http://localhost:8000/analyze/competitor-analysis", { url })
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [url]);

  const kpis = data?.kpis || [];
  const competitors = data?.competitors || [];
  const opportunitiesData = data?.opportunities || [];
  const sentimentAnalysisData = data?.sentimentAnalysis || [];
  const customerSegmentationData = data?.customerSegmentation || [];
  const keyCustomerInsights = data?.keyCustomerInsights || [];
  const audienceDemographics = data?.audienceDemographics || [];
  const geographicDistribution = data?.geographicDistribution || [];
  const behaviorMetrics = data?.behaviorMetrics || [];

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available.</div>;

  return (
    <>
      <Navbar />
      <div className="competitor-page">
        <h1 className="page-main-title">Competitor Analysis Dashboard</h1>

        <Section title="Key Performance Indicators" colorClass="section-light">
          {kpis.map((item, idx) => (
            <Card key={idx} title={item.title} value={item.value} />
          ))}
        </Section>

        <Section title="Top Competitors" colorClass="section-dark">
          {competitors.map((comp, idx) => (
            <CompetitorEntry
              key={idx}
              name={comp.name}
              stats={comp.stats}
              tags={comp.tags}
            />
          ))}
        </Section>

        <Section title="Opportunities & Recommendations" colorClass="section-light">
          {opportunitiesData.map((item, idx) => (
            <Card key={idx} title={item.title} value={item.value} />
          ))}
        </Section>


        <div className="dual-section-container">
          <div className="section section-dark dual-section-item">
            <h2 className="section-title">Sentiment Analysis</h2>
            <div className="cards-container">
              {sentimentAnalysisData.map((item, idx) => (
                <SentimentSegmentDisplay
                  key={idx}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>
          </div>
          <div className="section section-light dual-section-item">
            <h2 className="section-title">Customer Segmentation</h2>
            <div className="cards-container">
              {customerSegmentationData.map((segment, idx) => (
                <SentimentSegmentDisplay
                  key={idx}
                  label={segment.label}
                  description={segment.description}
                  value={segment.value}
                />
              ))}
            </div>
          </div>
        </div>

        <Section title="Key Customer Insights" colorClass="section-dark">
          {keyCustomerInsights.map((item, idx) => (
            <Card key={idx} title={item.title} value={item.value} />
          ))}
        </Section>

        <div className="audience-tracking-section">
          <h2 className="section-title">Audience Tracking</h2>
          <div className="audience-tracking-grid">
            <div className="audience-tracking-subsection section-light">
              <h3 className="subsection-title">Demographics</h3>
              <div className="subsection-content">
                {audienceDemographics.map((data, idx) => (
                  <AudienceMetricDisplay
                    key={idx}
                    label={data.label}
                    value={data.value}
                    change={data.change}
                    changeColorClass={data.changeColorClass}
                  />
                ))}
              </div>
            </div>

            <div className="audience-tracking-subsection section-dark">
              <h3 className="subsection-title">Geographic Distribution</h3>
              <div className="subsection-content">
                {geographicDistribution.map((data, idx) => {
                  const numericValue = parseInt(data.value);
                  let color = numericValue >= 70 ? 'green' : numericValue >= 40 ? 'orange' : 'red';
                  return (
                    <div key={idx} className="geo-distribution-item">
                      <p className="geo-distribution-label">{data.label}</p>
                      <div className="progress-bar-background">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${numericValue}%`,
                            backgroundColor: color,
                          }}
                        ></div>
                      </div>
                      <span className="geo-distribution-value">{data.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="audience-tracking-subsection section-light">
              <h3 className="subsection-title">Behavior Metrics</h3>
              <div className="subsection-content">
                {behaviorMetrics.map((data, idx) => (
                  <AudienceMetricDisplay
                    key={idx}
                    label={data.label}
                    value={data.value}
                    change={data.change}
                    changeColorClass={data.changeColorClass}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompetitorAnalysis;
