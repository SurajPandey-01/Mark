import os
import requests
import logging

PAGESPEED_API_KEY = os.getenv("PAGESPEED_API_KEY")

def analyze(url):
    try:
        endpoint = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
        params = {"url": url, "key": PAGESPEED_API_KEY}
        response = requests.get(endpoint, params=params)
        response.raise_for_status()
        data = response.json()
        score = data.get("lighthouseResult", {}).get("categories", {}).get("performance", {}).get("score", 0) * 100
        print(score)
        return {"score": score, "details": "PageSpeed score computed"}
    except Exception as e:
        logging.error(f"PageSpeed API error for {url}: {e}")
        return {"score": 0, "details": "PageSpeed API call failed"}
