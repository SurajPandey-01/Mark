import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import re
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
MODEL_NAME = "gemini-1.5-flash"

router = APIRouter()

class URLRequest(BaseModel):
    url: str

def extract(label, text, default=""):
    match = re.search(rf"{label}:\s*(.*)", text)
    return match.group(1).strip() if match else default

@router.post("/")
async def check_compliance(req: URLRequest):
    try:
        logging.info(f"Received request to check URL: {req.url}")

        prompt = f"""
        You are a Legal Compliance Checker for websites. Analyze the content, ad visuals, and policies of this website: {req.url}
        Evaluate based on:
        - Privacy and Data Use Notices
        - Content Restrictions (violence, copyright, sensitive content)

        Return text without any markdown or special characters.

        Return the result in this format:
        Legal Compliance
        Privacy and Data Use Notices: <explanation>
        Content Restrictions: <explanation>
        GDPR: <Yes/No> <explaination>
        Copyright: <Yes/No> <explaination>
        """

        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)

        logging.info(f"API response: {response.text}")

        text = response.text
        result = {
            "privacy_notices": extract("Privacy and Data Use Notices", text),
            "content_restrictions": extract("Content Restrictions", text),
            "gdpr": extract("GDPR", text),
            "copyright": extract("Copyright", text)
        }

        return result

    except Exception as e:
        logging.error("Exception occurred in compliance check", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))