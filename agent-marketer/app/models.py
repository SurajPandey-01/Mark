from pydantic import BaseModel, EmailStr

# Signup model
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    company: str
    password: str

# Signin model
class UserSignin(BaseModel):
    email: EmailStr
    password: str

# Input data model for analysis or other API input
class InputData(BaseModel):
    url: str
    keyword: str
    target_audience: str
