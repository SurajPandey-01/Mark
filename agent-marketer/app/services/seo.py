import os
import requests
import logging

SEO_API_KEY = os.getenv("SEO_API_KEY")

def analyze(url):
    try:
        response = requests.get("https://api.example-seo.com/analyze", params={"url": url, "apikey": SEO_API_KEY})
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logging.error(f"SEO API error for {url}: {e}")
        return {"score": 0, "details": "SEO API call failed"}
