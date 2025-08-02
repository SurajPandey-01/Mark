# Mark
Overview
Mark the Marketer is a comprehensive, full-stack web application designed to provide AI-driven analysis of websites for performance, marketing, and compliance. The platform offers various modules to help users gain valuable insights, including technical performance, creative content, and competitive analysis. It also features a secure user authentication system to manage access and store analysis results.

Key Features
AI-Powered Website Analysis
The core of the project is its AI-driven analysis engine, which uses the Google Gemini 1.5 Flash model and integrates with external APIs to generate detailed reports.

Performance Metrics: Get detailed insights into a website's performance, including Page Speed and SEO scores.

Competitor Analysis: A dedicated dashboard provides in-depth information on key performance indicators, competitor details, and market opportunities.

Creative Insights: Input an ad link or marketing page URL to receive AI-generated suggestions for improving content and engagement.

Compliance Checker: Verify a website's adherence to regulations like GDPR and check for copyright issues.

User Management
The application includes a secure user authentication system to protect user data and personalize the experience.

Secure Authentication: User passwords are encrypted using bcrypt, and sessions are managed with secure JSON Web Tokens (JWT).

User Profiles: Users can sign up and sign in to access their analysis history and manage their company information.

Data Storage
All analysis results are stored in a MongoDB database, allowing users to access and review their reports over time.

Technology Stack
Backend
Framework: FastAPI

Language: Python

Database: MongoDB

AI Model: Gemini 1.5 Flash

External APIs: Google PageSpeed Insights API

Security: passlib for password hashing, jose for JWT

Frontend
Framework: React

Language: JavaScript, JSX

Styling: CSS Modules with a modern design language

Routing: react-router-dom for navigation

Getting Started
Prerequisites
Python 3.8+

Node.js and npm

A MongoDB database

API keys for Google Gemini and Google PageSpeed Insights

Installation (Backend)
Clone the repository.

Install dependencies: pip install -r requirements.txt (assuming a requirements.txt file exists).

Set up environment variables in a .env file for your MONGO_URI, GEMINI_API_KEY, PAGESPEED_API_KEY, and JWT_SECRET.

Run the backend server: uvicorn main:app --reload

Installation (Frontend)
Navigate to the frontend directory.

Install dependencies: npm install.

Run the frontend development server: npm start.

API Endpoints
POST /auth/signup: Create a new user.

POST /auth/signin: Log in a user and receive a JWT.

POST /analyze: Perform a general website analysis.

POST /analyze/competitor-analysis: Get a detailed competitor report.

POST /check: Check a website's compliance.

POST /analyze/creative-insights: Get suggestions for creative content.

This README.md provides a complete explanation of the project, including its purpose, features, technology stack, and setup instructions.
