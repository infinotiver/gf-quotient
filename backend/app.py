from fastapi import FastAPI
from backend.routes import router
from fastapi.middleware.cors import CORSMiddleware
from backend.database import quizes_col
import os

app = FastAPI()

# Adding CORS middleware to allow cross-origin requests.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if os.getenv("ENV", "dev") == "dev" else os.getenv("CORS_ORIGINS", "").split(","),
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(router)


@app.on_event("startup")
async def startup_indexes():
    # Speed up quiz lookup by short code and results token
    await quizes_col.create_index("quiz_id", unique=True)
    await quizes_col.create_index("token", unique=True)
