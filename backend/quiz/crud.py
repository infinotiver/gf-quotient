import uuid
from bson import ObjectId
from backend.database import quizes_col
from .models import QuizCreate, QuizPublic, Quiz, Response


async def create_quiz(quiz_data: QuizCreate):
    try:
        quiz_dict = quiz_data.model_dump()
        quiz_dict["_id"] = ObjectId()
        quiz_dict["quiz_id"] = str(uuid.uuid4())[:6]
        quiz_dict["token"] = str(quiz_dict["_id"])
        quiz_dict["responses"] = []
        quiz_dict["score"] = None

        quiz_obj = Quiz(**quiz_dict)
        await quizes_col.insert_one(quiz_obj.model_dump())
        return {"status": "success", "quiz_id": quiz_dict["quiz_id"], "token": quiz_dict["token"]}
    except Exception as e:
        return {"status": "error", "message": str(e)}


async def get_quiz(quiz_id: str):
    try:
        quiz = await quizes_col.find_one(
            {"quiz_id": quiz_id},
            {"token": 0, "responses": 0, "score": 0, "questions.correct_option": 0},
        )
        if quiz:
            public_quiz = QuizPublic(**quiz)
            attempted = (
                await quizes_col.count_documents(
                    {"quiz_id": quiz_id, "responses.0": {"$exists": True}}
                )
            ) > 0
            return {"status": "success", "quiz": public_quiz.model_dump(), "attempted": attempted}
        return {"status": "error", "message": "Quiz not found"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


async def post_response(quiz_id: str, response_data: Response):
    try:
        quiz = await quizes_col.find_one({"quiz_id": quiz_id}, {"questions": 1, "responses": 1})
        if quiz is None:
            return {"status": "error", "message": "Quiz not found"}

        if quiz.get("responses") and len(quiz.get("responses", [])) > 0:
            return {"status": "error", "message": "Quiz has already been attempted"}

        question_ids = [question["id"] for question in quiz["questions"]]
        invalid_ids = [resp.question_id for resp in response_data.responses if resp.question_id not in question_ids]
        if invalid_ids:
            return {"status": "error", "message": f"Invalid question_id(s): {invalid_ids}"}

        response_dicts = [resp.model_dump() for resp in response_data.responses]
        await quizes_col.update_one({"quiz_id": quiz_id}, {"$set": {"responses": response_dicts}})

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
        quiz = await quizes_col.find_one({"token": token})
        if not quiz:
            return {"status": "error", "message": "Invalid token or quiz not found"}

        quiz_obj = Quiz(**quiz)
        if quiz_obj.responses:
            quiz_obj.compute_score()
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
        return {"status": "success", "total_quizzes": total_quizzes}
    except Exception as e:
        return {"status": "error", "message": str(e)}
