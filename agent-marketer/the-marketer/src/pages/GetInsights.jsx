import React from "react";
import "./GetInsights.css";
import Navbar from "../components/Navbar";

const Card = ({ title, mainValue, subValue, description, className }) => (
  <div className={`insight-card ${className || ''}`}>
    <h3 className="card-title">{title}</h3>
    <div className="card-values">
      <span className="main-value">{mainValue}</span>
      {subValue && <span className="sub-value">{subValue}</span>}
    </div>
    {description && <p className="card-description">{description}</p>}
  </div>
);


export default function GetInsights() {
  return (
    <>
    <Navbar />
    <div className="insight-container">
      <div className="insight-wrapper">
        <header className="insight-header">
          <h1 className="insight-heading">AI Performance Insights</h1>
          <p className="insight-subheading">
            Your high-level command center for website optimization.
          </p>
        </header>

        <section className="insight-grid">
          <Card
            title="Page Speed"
            mainValue="2.1"
            subValue="s"
            description="Excellent loading time, well below the 3s target."
            className="highlight-card"
          />
          <Card
            title="SEO Score"
            mainValue="78"
            subValue="/ 100"
            description="Good foundation with clear areas for improvement."
            className="highlight-card"
          />
        </section>

        <section>
          <h2 className="insight-subsection-heading">Action Plan to Reach 100</h2>
          <div className="insight-action-list">
            <Card
              title="Compress Images"
              description="Reduce file sizes without losing quality to speed up load times."
            />
            <Card
              title="Leverage Browser Caching"
              description="Store frequently accessed resources locally to speed up repeat visits."
            />
            <Card
              title="Minify CSS, JavaScript, and HTML"
              description="Remove unnecessary characters from code to reduce file sizes."
            />
            {/* You can add more cards here for the action plan */}
          </div>
        </section>

        <section className="insight-seo">
          <h3 className="seo-heading">SEO Enhancement</h3>
          <div className="seo-card-list">
            <Card
              title="Fix Inconsistent H1 Tags"
              description="Ensure every page has a single, unique H1 tag for better SEO structure."
            />
            <Card
              title="Improve Keyword Density"
              description="Your focus keyword density is below the recommended 1-2% range."
            />
            <Card
              title="Create High-Quality Content"
              description="Develop comprehensive, valuable content that answers user queries."
            />
            <Card
              title="Build High-Quality Backlinks"
              description="Acquire authoritative links from reputable sites to boost domain authority."
            />
            <Card
              title="Optimize Meta Descriptions"
              description="Craft compelling meta descriptions to improve click-through rates from SERPs."
            />
            <Card
              title="Improve Mobile Responsiveness"
              description="Ensure your website is fully optimized for all mobile devices."
            />
            {/* You can add more cards here for SEO enhancements */}
          </div>
        </section>
      </div>
    </div>
    </>
  );
}