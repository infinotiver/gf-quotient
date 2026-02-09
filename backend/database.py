from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))
MONGO_DETAILS = os.getenv("MONGO-URI")

client = AsyncIOMotorClient(MONGO_DETAILS)

db = client["db"]
quizes_col = db["quizes"]
crush_pages_col = db["crush_pages"]
