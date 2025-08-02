import os
import requests
import logging

UPTIME_API_KEY = os.getenv("UPTIME_API_KEY")

def analyze(url):
    try:
        response = requests.get("https://api.uptimerobot.com/v2/getMonitors", headers={"Content-Type": "application/json"},
                                json={"api_key": UPTIME_API_KEY, "format": "json", "logs": 1})
        response.raise_for_status()
        data = response.json()
        monitors = data.get("monitors", [])
        if monitors:
            return {
                "uptime": f"{monitors[0].get('all_time_uptime_ratio', 'N/A')}%",
                "response_time_ms": monitors[0].get("average_response_time", "N/A")
            }
    except Exception as e:
        logging.error(f"Uptime API error for {url}: {e}")
    return {"uptime": "N/A", "response_time_ms": "N/A"}
