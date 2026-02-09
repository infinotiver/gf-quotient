from pydantic import BaseModel
from typing import Optional


class CrushTheme(BaseModel):
    background: str
    background_image: Optional[str] = None
    accent: str
    text: str


class CrushCreate(BaseModel):
    title: str
    question: str
    yes_text: str
    no_text: str
    theme: CrushTheme
    message_after_yes: Optional[str] = None
    message_after_no: Optional[str] = None
    hero_image: Optional[str] = None
    after_yes_gif: Optional[str] = None


class CrushPublic(BaseModel):
    page_id: str
    title: str
    question: str
    yes_text: str
    no_text: str
    theme: CrushTheme
    message_after_yes: Optional[str] = None
    message_after_no: Optional[str] = None
    hero_image: Optional[str] = None
    after_yes_gif: Optional[str] = None
