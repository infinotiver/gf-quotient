from fastapi import APIRouter, HTTPException, status, Request
from .models import CrushCreate
from .crud import create_crush_page, get_crush_page
import time
import os

router = APIRouter()
RATE_LIMIT_WINDOW = int(os.getenv("RATE_LIMIT_WINDOW", "60"))
CRUSH_CREATE_LIMIT = int(os.getenv("CRUSH_CREATE_LIMIT", os.getenv("CREATE_LIMIT", "10")))
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


@router.post("/crush")
async def api_create_crush(request: Request, page: CrushCreate):
    _throttle(request, f"crush-create:{_client_key(request)}", CRUSH_CREATE_LIMIT)
    result = await create_crush_page(page)
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=result["message"])
    return result


@router.get("/crush/{page_id}")
async def api_get_crush(page_id: str):
    result = await get_crush_page(page_id)
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=result["message"])
    return result
