import uuid
from bson import ObjectId
from .database import quizes_col
from .models import *

async def create_quiz(quiz_data: QuizCreate):
    try:
        # Convert the QuizCreate object to a dictionary
        quiz_dict = quiz_data.model_dump()
        
        # Add fields that are not part of QuizCreate but needed for Quiz
        quiz_dict["_id"] = ObjectId()  # Use ObjectId for _id
        quiz_dict["token"] = str(uuid.uuid4())[:6]  # Use short 6-character code for token
        quiz_dict["responses"] = []
        quiz_dict["score"] = None  # Initialize score as None
        
        # Create a Quiz object for validation
        quiz_obj = Quiz(**quiz_dict)
        
        # Insert the validated quiz data into the database
        await quizes_col.insert_one(quiz_obj.model_dump())
        
        # Return the ID and token of the created quiz
        return {"status": "success", "quiz_id": str(quiz_dict["_id"]), "token": quiz_dict["token"]}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def get_quiz(token: str):
    try:
        quiz = await quizes_col.find_one({"token": token})
        if quiz:
            # Use QuizPublic to avoid exposing answers and token
            public_quiz = QuizPublic(**quiz)
            return {"status": "success", "quiz": public_quiz.model_dump()}
        else:
            return {"status": "error", "message": "Quiz not found"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def post_response(token: str, response_data: Response):
    try:
        # Convert quiz_id to ObjectId
        quiz = quizes_col.find_one({"token":token})
        if not quiz:
            return {"status": "error", "message": "Quiz not found"}
        
        # Validate that the question_id exists in the quiz
        question_ids = [question["id"] for question in quiz["questions"]]
        if response_data.question_id not in question_ids:
            return {"status": "error", "message": f"Invalid question_id: {response_data.question_id}"}
        
        # Check if a response for the same question_id already exists
        if any(resp["question_id"] == response_data.question_id for resp in quiz.get("responses", [])):
            return {"status": "error", "message": f"Response for question_id {response_data.question_id} already exists"}
        
        # Append the response to the quiz's responses
        response_dict = response_data.model_dump()
        if "responses" not in quiz:
            quiz["responses"] = []
        quiz["responses"].append(response_dict)
        
        # Update the quiz in the database
        quizes_col.update_one({"token": token}, {"$set": {"responses": quiz["responses"]}})
        return {"status": "success", "message": "Response submitted successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def get_result(quiz_id: str):
    try:
        # Find the quiz by its short token
        quiz = await quizes_col.find_one({"_id": ObjectId(quiz_id)})
        if not quiz:
            return {"status": "error", "message": "Invalid token or quiz not found"}
        
        quiz_obj = Quiz(**quiz)
        
        # Compute the score if there are responses
        if quiz_obj.responses:
            quiz_obj.compute_score()
            # Save the computed score to the database
            await quizes_col.update_one({"_id": ObjectId(quiz_id)}, {"$set": {"score": quiz_obj.score}})
        
        return {"status": "success", "quiz": quiz_obj.model_dump(exclude_none=True)}
    except Exception as e:
        return {"status": "error", "message": str(e)}
