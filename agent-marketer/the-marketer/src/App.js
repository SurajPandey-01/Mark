// src/App.js
import React from 'react'; 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import AnalysisResults from './pages/AnalysisResults';
import ComplianceChecker from './pages/ComplianceChecker'; 
import CreativeInsights from './pages/CreativeInsights'; 
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import GetInsights from './pages/GetInsights';
import Onboarding from './pages/Onboarding';
import SignIn from './pages/SignIn';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/results" element={<AnalysisResults />} />
        <Route path="/compliance" element={<ComplianceChecker />} />
        <Route path="/creative-insights" element={<CreativeInsights />} />
        <Route path="/Competitor-Analysis" element={<CompetitorAnalysis />} />
        <Route path="/get-insights" element={<GetInsights />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
