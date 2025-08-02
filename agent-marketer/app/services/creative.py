from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
import os
import traceback
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
print("GEMINI_API_KEY Loaded:", GEMINI_API_KEY)  # Debugging aid

genai.configure(api_key=GEMINI_API_KEY)
MODEL_NAME = "gemini-1.5-flash"

router = APIRouter()

class URLRequest(BaseModel):
    url: str

def fetch_text_and_images(url):
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        # Extract visible text
        texts = soup.stripped_strings
        full_text = " ".join(texts)

        # Extract image alt attributes
        images = soup.find_all('img')
        image_descriptions = [img.get('alt', '') for img in images if img.get('alt')]

        return full_text[:3000], image_descriptions[:10]  # Truncate to fit model limits
    except Exception as e:
        raise RuntimeError(f"Failed to fetch or parse: {e}")

@router.post("/creative-insights")
async def creative_insights(req: URLRequest):
    try:
        text, image_alts = fetch_text_and_images(req.url)

        prompt = (
            f"Analyze the following website content and images to provide creative improvement suggestions.\n\n"
            f"Text Content:\n{text}\n\n"
            f"Image Descriptions:\n{', '.join(image_alts)}\n\n"
            f"Return 4-5 creative suggestions to improve the appeal, readability, visual impression, or emotional engagement of the website."
        )

        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)

        raw_lines = response.text.strip().split("\n")

        # Clean markdown formatting from Gemini output
        suggestions = [
            line.replace("**", "").lstrip("-•*0123456789. ").strip()
            for line in raw_lines
            if line.strip()
        ]

        return {"suggestions": suggestions[:6]}  # Limit to 6 if needed
    except Exception as e:
        print("ERROR:", str(e))
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))