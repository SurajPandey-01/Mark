from fastapi import APIRouter, HTTPException
from app.models import UserSignup, UserSignin
from app.auth import hash_password, verify_password, create_token
from app.database import db

router = APIRouter()


@router.get("/test")
def test():
    return {"message": "User route working"}


@router.post("/signup")
def signup(user: UserSignup):
    email = user.email.lower()
    
    if db.users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="User already exists")
    
    db.users.insert_one({
        "name": user.name,
        "email": email,
        "company": user.company.lower(),  # Optional: normalize company name
        "password": hash_password(user.password)
    })

    return {"message": "Signup successful"}


@router.post("/signin")
def signin(user: UserSignin):
    email = user.email.lower()
    found = db.users.find_one({"email": email})
    
    if not found or not verify_password(user.password, found["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"user": email})
    return {"token": token}