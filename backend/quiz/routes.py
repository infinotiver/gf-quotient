from fastapi import APIRouter, HTTPException, status, Request
from .models import QuizCreate, Response
from .crud import create_quiz, get_quiz, get_result, post_response, get_stats, delete_quiz
import time
import os

router = APIRouter()

RATE_LIMIT_WINDOW = int(os.getenv("RATE_LIMIT_WINDOW", "60"))
CREATE_LIMIT = int(os.getenv("CREATE_LIMIT", "10"))
ATTEMPT_LIMIT = int(os.getenv("ATTEMPT_LIMIT", "20"))
_rate_store = {}


def _client_key(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _throttle(request: Request, key: str, limit: int):
    now = time.time()
    bucket = _rate_store.get(key)
    if not bucket or now - bucket["start"] > RATE_LIMIT_WINDOW:
        _rate_store[key] = {"start": now, "count": 1}
        return
    bucket["count"] += 1
    if bucket["count"] > limit:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded",
        )


@router.post("/quiz", status_code=status.HTTP_201_CREATED)
async def api_create_quiz(request: Request, quiz_data: QuizCreate):
    _throttle(request, f"create:{_client_key(request)}", CREATE_LIMIT)
    result = await create_quiz(quiz_data)
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=result["message"])
    return result


@router.get("/quiz/{quiz_id}")
async def api_get_quiz(quiz_id: str):
    result = await get_quiz(quiz_id)
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=result["message"])
    return result


@router.post("/quiz/{quiz_id}/submit")
async def api_submit_response(request: Request, quiz_id: str, response_data: Response):
    _throttle(request, f"attempt:{_client_key(request)}", ATTEMPT_LIMIT)
    result = await post_response(quiz_id, response_data)
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=result["message"])
    return result


@router.get("/results/{token}")
async def api_get_quiz_results(token: str):
    result = await get_result(token)
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=result["message"])
    return result


@router.delete("/results/{token}")
async def api_delete_quiz(token: str):
    result = await delete_quiz(token)
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=result["message"])
    return result


@router.get("/stats")
async def api_get_stats():
    result = await get_stats()
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=result["message"])
    return result
