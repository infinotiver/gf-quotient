from fastapi import APIRouter, HTTPException, status
from .models import *
from .crud import create_quiz, get_quiz, get_result, post_response

router = APIRouter()

@router.post("/quiz", status_code=status.HTTP_201_CREATED)
async def api_create_quiz(quiz_data: QuizCreate):
    """
    Creates a new quiz.
    Returns the quiz ID (for taking the quiz) and a secret token (for viewing results).
    """
    result = await create_quiz(quiz_data)
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=result["message"])
    return result

@router.get("/quiz/{token}")
async def api_get_quiz(token: str):
    """
    Fetches the public version of a quiz for a user to take.
    Excludes correct answers and the results token.
    """
    result = await get_quiz(token)
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=result["message"])
    return result

@router.post("/quiz/{quiz_id}/submit")
async def api_submit_response(token: str, response_data: Response):
    """
    Submits a single response for a question in a quiz using the provided token.
    """
    result = await post_response(token, response_data)
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=result["message"])
    return result

@router.get("/results/{token}")
async def api_get_quiz_results(token: str):
    """
    Fetches the complete quiz results, including the score, using the secret token.
    """
    result = await get_result(token)
    if result["status"] == "error":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=result["message"])
    return result