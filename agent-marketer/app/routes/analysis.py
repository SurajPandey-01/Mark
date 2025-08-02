# app/routers/analysis.py (Updated)
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from app.services.page_speed import analyze as analyze_pagespeed
from app.services.gemini import analyze_website, generate_competitor_analysis

router = APIRouter()

@router.post("/")
async def analyze(request: Request):
    data = await request.json()
    url = data["company_url"]

    # Get PageSpeed from real API
    pagespeed_result = analyze_pagespeed(url)
    pagespeed_score = pagespeed_result.get("score")

    # Pass the score to Gemini for remarks
    gemini_result = analyze_website(url, pagespeed_score=pagespeed_score)

    # Overwrite Gemini's pagespeed score with the real API result (for consistency)
    gemini_result["pagespeed"]["score"] = pagespeed_score

    print("Final Analysis Result (to be sent to frontend):\n", gemini_result)
    return gemini_result

class CompetitorAnalysisRequest(BaseModel):
    url: str

@router.post("/competitor-analysis")
def competitor_analysis(data: CompetitorAnalysisRequest):
    try:
        result = generate_competitor_analysis(data.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
