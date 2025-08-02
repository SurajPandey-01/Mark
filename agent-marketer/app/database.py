from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Read the connection URI from .env
MONGO_URI = os.getenv("MONGO_URI")

# Initialize the client
client = MongoClient(MONGO_URI)

# Connect to your database
db = client["Muze"]