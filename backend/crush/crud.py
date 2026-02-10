import uuid
from bson import ObjectId
from backend.database import crush_pages_col
from .models import CrushCreate, CrushPublic


async def create_crush_page(data: CrushCreate):
    try:
        page_id = str(uuid.uuid4())[:6]
        doc = data.model_dump()
        doc["_id"] = ObjectId()
        doc["page_id"] = page_id
        await crush_pages_col.insert_one(doc)
        return {"status": "success", "page_id": page_id}
    except Exception as e:
        return {"status": "error", "message": str(e)}


async def get_crush_page(page_id: str):
    try:
        doc = await crush_pages_col.find_one({"page_id": page_id}, {"_id": 0})
        if not doc:
            return {"status": "error", "message": "Page not found"}
        public = CrushPublic(**doc)
        return {"status": "success", "page": public.model_dump()}
    except Exception as e:
        return {"status": "error", "message": str(e)}
