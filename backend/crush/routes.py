from fastapi import APIRouter, HTTPException, status
from .models import CrushCreate
from .crud import create_crush_page, get_crush_page

router = APIRouter()


@router.post("/crush")
async def api_create_crush(page: CrushCreate):
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
