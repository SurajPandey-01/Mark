import os
import logging
from dotenv import load_dotenv
import sys
import re
import json

import google.generativeai as genai

mylist=["abc"]  

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
MODEL_NAME = "gemini-1.5-flash"

def extract(label, text, default=""):
    match = re.search(rf"{label}:\s*(.*)", text)
    return match.group(1).strip() if match else default

def extract_competitors(text):
    competitors = []
    comp_section = re.search(r"Competitors\s*(.*?)\n(?:Compliance|$)", text, re.DOTALL | re.IGNORECASE)
    if comp_section:
        lines = comp_section.group(1).split("\n")
        for line in lines:
            line = line.strip()
            if line.startswith("*"):
                name = line.lstrip("*- ").split(":")[0].strip()
                if name:
                    competitors.append({"name": name})
    return competitors

def analyze_website(url, pagespeed_score=None):
    mylist[0]=url


    prompt = (
        f"Analyze the SEO, uptime, creative aspects, and compliance for the website {url}.\n"
        "Return the results in this format:\n"
        "SEO\nScore: <number>\nRemarks: <text>\n"
        "Uptime\nUptime: <number>%\nDetails: <text>\n"
        "Creative\nSentiment: <text>\nReadability: <text>\n"
        "Competitors\n* <Competitor 1>\n* <Competitor 2>\n* <Competitor 3>\n"
        "Compliance\nGDPR: <Yes/No>\nCopyright: <Yes/No>\n"
    )
    if pagespeed_score is not None:
        prompt += (
            f"\nThe PageSpeed score for this website is {pagespeed_score}. "
            "Based on this score, provide a brief remark about the website's performance."
            "\nPageSpeed\nRemarks: <text>"
        )
    model = genai.GenerativeModel(MODEL_NAME)
    response = model.generate_content(prompt)
    text = response.text
    result = {
        "pagespeed": {
            "score": pagespeed_score,
            "remarks": extract("Remarks", text)
        },
        "seo": {
            "score": extract("Score", text),
            "remarks": extract("Remarks", text)
        },
        "uptime": {
            "percentage": extract("Uptime", text),
            "details": extract("Details", text)
        },
        "creative": {
            "sentiment": extract("Sentiment", text),
            "readability": extract("Readability", text)
        },
        "competitors": extract_competitors(text),
        "compliance": {
            "gdpr": extract("GDPR", text),
            "copyright": extract("Copyright", text)
        }
    }
    return result

def generate_competitor_analysis(url):
    print(f"DEBUG: generate_competitor_analysis using global variable: {mylist[0]}")
    prompt = (
        f"Analyze the website {mylist[0]} and provide the following competitor analysis data in JSON format:\n"
        "{\n"
        '   "kpis": [ {"title": "...", "value": "..."}, ... ],\n'
        '   "competitors": [ {"icon": "...", "name": "...", "stats": "...", "tags": [ {"text": "...", "bgClass": "...", "textColorClass": "..."} ] }, ... ],\n'
        '   "opportunities": [ {"title": "...", "value": "..."}, ... ],\n'
        '   "sentimentAnalysis": [ {"label": "...", "value": "...", "progressBarColorClass": "..."} ],\n'
        '   "customerSegmentation": [ {"label": "...", "description": "...", "value": "...", "progressBarColorClass": "..."} ],\n'
        '   "keyCustomerInsights": [ {"title": "...", "value": "..."} ],\n'
        '   "audienceDemographics": [ {"label": "...", "value": "...", "change": "...", "changeColorClass": "..."} ],\n'
        '   "geographicDistribution": [ {"label": "...", "value": "...", "progressBarColorClass": "..."} ],\n'
        '   "behaviorMetrics": [ {"label": "...", "value": "...", "change": "...", "changeColorClass": "..."} ]\n'
        "}\n"
        "Please fill in realistic values based on the website and industry."
    )
    model = genai.GenerativeModel(MODEL_NAME)
    response = model.generate_content(prompt)
    try:
        data = json.loads(response.text)
    except Exception:
        match = re.search(r"\{.*\}", response.text, re.DOTALL)
        if match:
            data = json.loads(match.group(0))
        else:
            raise ValueError("Could not parse Gemini output as JSON")
    return data