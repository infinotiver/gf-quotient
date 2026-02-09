import uuid
from bson import ObjectId
from .database import quizes_col
from .models import *

async def _find_quiz_by_quiz_id(quiz_id: str, projection: dict | None = None):
    return await quizes_col.find_one({"quiz_id": quiz_id}, projection or None)

async def _find_quiz_by_token(token: str, projection: dict | None = None):
    return await quizes_col.find_one({"token": token}, projection or None)

async def create_quiz(quiz_data: QuizCreate):
    try:
        # Convert the QuizCreate object to a dictionary
        quiz_dict = quiz_data.model_dump()
        
        # Add fields that are not part of QuizCreate but needed for Quiz
        quiz_dict["_id"] = ObjectId()  # Use ObjectId for _id
        quiz_dict["quiz_id"] = str(uuid.uuid4())[:6]  # Short code for taking the quiz
        quiz_dict["token"] = str(quiz_dict["_id"])  # Full ObjectId string for results
        quiz_dict["responses"] = []
        quiz_dict["score"] = None  # Initialize score as None
        
        # Create a Quiz object for validation
        quiz_obj = Quiz(**quiz_dict)
        
        # Insert the validated quiz data into the database
        await quizes_col.insert_one(quiz_obj.model_dump())
        
        # Return the ID and token of the created quiz
        return {"status": "success", "quiz_id": quiz_dict["quiz_id"], "token": quiz_dict["token"]}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def get_quiz(quiz_id: str):
    try:
        quiz = await _find_quiz_by_quiz_id(
            quiz_id,
            {
                "token": 0,
                "responses": 0,
                "score": 0,
                "questions.correct_option": 0,
            },
        )
        if quiz:
            # Use QuizPublic to avoid exposing answers and token
            public_quiz = QuizPublic(**quiz)
            attempted = (
                await quizes_col.count_documents(
                    {"quiz_id": quiz_id, "responses.0": {"$exists": True}}
                )
            ) > 0
            return {"status": "success", "quiz": public_quiz.model_dump(), "attempted": attempted}
        else:
            return {"status": "error", "message": "Quiz not found"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def post_response(quiz_id: str, response_data: Response):
    try:
        quiz = await _find_quiz_by_quiz_id(quiz_id, {"questions": 1, "responses": 1})
        if quiz is None:
            return {"status": "error", "message": "Quiz not found"}

        # Prevent multiple attempts
        if quiz.get("responses") and len(quiz.get("responses", [])) > 0:
            return {"status": "error", "message": "Quiz has already been attempted"}
        
        # Validate that all question_id exist in the quiz
        question_ids = [question["id"] for question in quiz["questions"]]
        invalid_ids = [resp.question_id for resp in response_data.responses if resp.question_id not in question_ids]
        if invalid_ids:
            return {"status": "error", "message": f"Invalid question_id(s): {invalid_ids}"}

        # Append all responses to the quiz's responses
        response_dicts = [resp.model_dump() for resp in response_data.responses]
        await quizes_col.update_one({"quiz_id": quiz_id}, {"$set": {"responses": response_dicts}})

        # Compute score for immediate feedback
        quiz["responses"] = response_dicts
        quiz_obj = Quiz(**quiz)
        score = quiz_obj.compute_score()
        return {
            "status": "success",
            "message": "Responses submitted successfully",
            "score": score,
            "total": len(quiz_obj.questions),
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def get_result(token: str):
    try:
        # Find the quiz by its ObjectId string token
        quiz = await _find_quiz_by_token(token)
        if not quiz:
            return {"status": "error", "message": "Invalid token or quiz not found"}
        
        quiz_obj = Quiz(**quiz)
        
        # Compute the score if there are responses
        if quiz_obj.responses:
            quiz_obj.compute_score()
            # Save the computed score to the database
            await quizes_col.update_one({"_id": quiz["_id"]}, {"$set": {"score": quiz_obj.score}})
        
        return {"status": "success", "quiz": quiz_obj.model_dump(exclude_none=True)}
    except Exception as e:
        return {"status": "error", "message": str(e)}


async def delete_quiz(token: str):
    try:
        result = await quizes_col.delete_one({"token": token})
        if result.deleted_count == 0:
            return {"status": "error", "message": "Quiz not found"}
        return {"status": "success", "message": "Quiz deleted"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


async def get_stats():
    try:
        total_quizzes = await quizes_col.count_documents({})
        return {
            "status": "success",
            "total_quizzes": total_quizzes,
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
