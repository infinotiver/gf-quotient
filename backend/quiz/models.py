from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import List, Optional, Dict, Literal


class Option(BaseModel):
    id: int
    text: str


class Question(BaseModel):
    id: Optional[int] = None
    text: str
    options: List[Option]
    correct_option: Optional[int]

    @field_validator("correct_option")
    def validate_correct_option(cls, correct_option, info):
        if correct_option is None:
            return correct_option
        options = info.data.get("options", [])
        option_ids = [opt.id for opt in options]
        if correct_option not in option_ids:
            raise ValueError("correct_option must match one of the option ids")
        return correct_option


class QuestionPublic(BaseModel):
    id: int
    text: str
    options: List[Option]


class ResponseBase(BaseModel):
    question_id: int
    selected_option: int


class Response(BaseModel):
    responses: List[ResponseBase]


class Quiz(BaseModel):
    _id: str
    title: str
    description: Optional[str] = None
    questions: List[Question]
    responses: Optional[List[ResponseBase]] = None
    score: Optional[int] = None
    quiz_id: str
    token: str
    model_config = ConfigDict(validate_by_name=True)

    def compute_score(self):
        if self.responses is None or len(self.responses) == 0:
            return 0

        total_score = 0
        response_mapping = {response.question_id: response.selected_option for response in self.responses}

        for question in self.questions:
            if question.id in response_mapping:
                selected_option = response_mapping[question.id]
                if question.correct_option is not None and selected_option == question.correct_option:
                    total_score += 1

        self.score = total_score
        return total_score


class QuizPublic(BaseModel):
    _id: str
    title: str
    description: Optional[str] = None
    questions: List[QuestionPublic]
    quiz_id: str


class QuizCreate(BaseModel):
    title: str
    description: Optional[str] = None
    questions: List[Question]
    model_config = ConfigDict(validate_by_name=True)

    @field_validator("questions", mode="before")
    def auto_assign_question_ids(cls, value):
        for idx, question in enumerate(value):
            question["id"] = idx + 1
        return value
