from fastapi import FastAPI
from backend.quiz.routes import router as quiz_router
from backend.crush.routes import router as crush_router
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.database import quizes_col, crush_pages_col
import os

env = os.getenv("ENV", "dev")
is_dev = env == "dev"


# Define the lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.db_ready = False
    app.state.db_error = None
    # Speed up quiz lookup by short code and results token
    try:
        await quizes_col.create_index("quiz_id", unique=True)
        await quizes_col.create_index("token", unique=True)
        await crush_pages_col.create_index("page_id", unique=True)
        app.state.db_ready = True
    except Exception as exc:
        message = f"[startup] MongoDB index creation failed: {exc}"
        app.state.db_error = str(exc)
        print(message)
        if not is_dev:
            raise RuntimeError(message) from exc

    # This 'yield' statement separates startup and shutdown logic
    yield


app = FastAPI(lifespan=lifespan)

def _parse_origins(raw: str) -> list[str]:
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


# In production, default to Vercel subdomains unless explicitly overridden.
cors_origins = (
    _parse_origins(
        os.getenv(
            "CORS_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173" if is_dev else "",
        )
    )
)
cors_origin_regex = (
    None if is_dev else os.getenv("CORS_ORIGIN_REGEX", r"^https://.*\.vercel\.app$")
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_origin_regex=cors_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(quiz_router, prefix="/api")
app.include_router(crush_router, prefix="/api")


@app.get("/api/health")
async def health_check():
    return {
        "status": "ok" if getattr(app.state, "db_ready", False) else "degraded",
        "db_ready": getattr(app.state, "db_ready", False),
        "db_error": getattr(app.state, "db_error", None),
        "env": env,
    }
