from fastapi import FastAPI
from backend.quiz.routes import router as quiz_router
from backend.crush.routes import router as crush_router
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.database import quizes_col, crush_pages_col
import os


# Define the lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Speed up quiz lookup by short code and results token
    await quizes_col.create_index("quiz_id", unique=True)
    await quizes_col.create_index("token", unique=True)
    await crush_pages_col.create_index("page_id", unique=True)

    # This 'yield' statement separates startup and shutdown logic
    yield


app = FastAPI(lifespan=lifespan)

# Adding CORS middleware to allow cross-origin requests.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if os.getenv("ENV", "dev") == "dev" else os.getenv("CORS_ORIGINS", "").split(","),
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(quiz_router)
app.include_router(crush_router)
