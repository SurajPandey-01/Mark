from app.routes.user import router as user_router #change
from app.routes.analysis import router as analysis_router #change
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services.creative import router as creative_router
from app.models import InputData, UserSignup, UserSignin
from app.database import db
from app.routes.user import router as user_router 
from app.routes.analysis import router as analysis_router
from app.services import compliance
app = FastAPI()

# Include routers
app.include_router(user_router, prefix="/auth")  # You can still keep this
app.include_router(analysis_router, prefix="/analyze")
app.include_router(creative_router, prefix="/analyze")
app.include_router(compliance.router, prefix="/check")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def root():
    return {"message": "Backend running"}

# Direct DB access
users_collection = db["users"]

# ✅ SIGNUP route
@app.post("/auth/signup")
def signup(user: UserSignup):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = {
        "name": user.name,
        "email": user.email,
        "company": user.company,
        "password": user.password  # ⚠️ You should hash this for production
    }

    result = users_collection.insert_one(new_user)

    return {
        "message": "User signed up successfully",
        "user_id": str(result.inserted_id)
    }

# ✅ SIGNIN route
@app.post("/auth/signin")
def signin(user: UserSignin):
    existing_user = users_collection.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=401, detail="User not found")

    if existing_user["password"] != user.password:
        raise HTTPException(status_code=401, detail="Incorrect password")

    return {
        "message": "Login successful",
        "user": {
            "name": existing_user["name"],
            "email": existing_user["email"],
            "company": existing_user["company"]
        }
    }

# ✅ ANALYZE route (optional here if not moved to analysis.py)
@app.post("/analyze")
def analyze(data: InputData):
    return {
        "message": "Analysis started",
        "url": data.url,
        "keyword": data.keyword,
        "audience": data.target_audience
    }