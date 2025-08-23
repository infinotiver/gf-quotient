from pydantic import (
    BaseModel,
    Field,
    field_validator,
    ConfigDict
)
from typing import List, Optional, Dict, Literal


# Option Model
class Option(BaseModel):
    """
    Represents an option with an identifier and display text.
    Attributes:
        id (int): The value of the option, typically used as an identifier 
                  (e.g., 0, 1 for True/False).
        text (str): The display text of the option (e.g., "True", "False").
    Methods:
        __init__(**data):
            Initializes an Option instance with the provided data and logs the initialization.
    """
    id: int  # This will be the value (e.g., 0, 1 for True/False)
    text: str  # This will be the display text (e.g., "True", "False")

    def __init__(self, **data):
        super().__init__(**data)

Option.model_rebuild()


# Question Models
class Question(BaseModel):
    """
    Represents a question in the system with associated options and a correct answer.
    Attributes:
        id (Optional[int]): The unique identifier for the question. If not provided, it will be auto-assigned.
        text (str): The text of the question.
        options (List[Option]): A list of possible options for the question.
        correct_option (int): The ID of the correct option from the list of options.
    Methods:
        __init__(**data):
            Initializes a Question instance with the provided data.
            Args:
                **data: Arbitrary keyword arguments for initializing the Question.
        validate_correct_option(value, values):
            Validates that the `correct_option` matches one of the IDs in the `options` list.
            Args:
                value (int): The ID of the correct option to validate.
                values (dict): A dictionary of field values for the Question instance.
            Returns:
                int: The validated `correct_option` value.
            Raises:
                ValueError: If the `correct_option` does not match any of the option IDs.
    """
    id: Optional[int] = None  # Make it optional, will be auto-assigned
    text: str
    options: List[Option]
    correct_option: int  # The id of the correct option

    def __init__(self, **data):
        super().__init__(**data)

    @field_validator("correct_option")
    def validate_correct_option(cls, value, values):
        options = values.data.get("options", [])
        option_ids = [opt.id for opt in options]
        if value not in option_ids:
            raise ValueError("correct_option must match one of the option ids")
        return value


class QuestionPublic(BaseModel):
    id: int
    text: str
    options: List[Option]

    def __init__(self, **data):
        super().__init__(**data)


# Response Model
class Response(BaseModel):
    """
    Represents a user's response to a question.
    Attributes:
        question_id (int): The ID of the question being answered.
        selected_option (int): The option selected by the user.
    Methods:
        __init__(**data):
            Initializes a Response instance with the provided data and logs the initialization.
    """
    question_id: int
    selected_option: int

    def __init__(self, **data):
        super().__init__(**data)

Response.model_rebuild()


# Quiz Models
class Quiz(BaseModel):
    """
    Represents a quiz model with questions, responses, and scoring functionality.
    Attributes:
        _id (str): Full UUID for unique identification of the quiz.
        title (str): Title of the quiz.
        description (Optional[str]): A brief description of the quiz. Defaults to None.
        intimacy_level (Literal["<2 months", "6m", "1y", "2y", "2y+"]): The intimacy level associated with the quiz, restricted to specific values.
        questions (List[Question]): A list of questions included in the quiz.
        responses (Optional[List[Response]]): A list of responses provided for the quiz. Defaults to None.
        score (Optional[int]): The computed score for the quiz. Defaults to None.
        token (str): A short 6-character code for accessing quiz results.
    Methods:
        __init__(**data):
            Initializes a Quiz instance with the provided data.
            Args:
                **data: Arbitrary keyword arguments for initializing the quiz attributes.
        compute_score():
            Computes the score for the quiz based on the provided responses.
            Returns:
                int: The total score calculated for the quiz.
    """
    _id: str  # Full UUID for unique identification
    title: str
    description: Optional[str] = None
    intimacy_level: Literal["<2 months", "6m", "1y", "2y", "2y+"]  # Restrict to specific values
    questions: List[Question]
    responses: Optional[List[Response]] = None  # List of responses
    score: Optional[int] = None  # Computed score
    token: str  # Short 6-character code for accessing results
    model_config = ConfigDict(validate_by_name=True)

    def compute_score(self):
        if self.responses is None or len(self.responses) == 0:
            return 0

        total_score = 0
        response_mapping = {response.question_id: response.selected_option for response in self.responses}

        for question in self.questions:
            if question.id in response_mapping:
                selected_option = response_mapping[question.id]
                if selected_option == question.correct_option:
                    total_score += 1

        self.score = total_score
        return total_score


class QuizPublic(BaseModel):
    """
    QuizPublic is a model representing a public view of a quiz, designed for scenarios
    where sensitive data should not be exposed. It includes the following attributes:
    Attributes:
        _id (str): A unique identifier for the quiz.
        title (str): The title of the quiz.
        description (Optional[str]): An optional description of the quiz.
        intimacy_level (Literal): The intimacy level of the quiz, represented as one of the
            predefined values: "<2 months", "6m", "1y", "2y", "2y+".
        questions (List[QuestionPublic]): A list of questions included in the quiz, represented
            by the QuestionPublic model.
    Methods:
        __init__(**data): Initializes a new instance of QuizPublic with the provided data.
            Prints the initialization data for debugging purposes.
    """
    """Quiz model for public view (taking the quiz), without sensitive data."""
    _id: str
    title: str
    description: Optional[str] = None
    intimacy_level: Literal["<2 months", "6m", "1y", "2y", "2y+"]
    questions: List[QuestionPublic]

    def __init__(self, **data):
        super().__init__(**data)


class QuizCreate(BaseModel):
    """
    QuizCreate model represents the structure for creating a quiz.
    Attributes:
        title (str): The title of the quiz.
        description (Optional[str]): A brief description of the quiz. Defaults to None.
        intimacy_level (Literal): The intimacy level of the quiz, restricted to specific values 
            ("<2 months", "6m", "1y", "2y", "2y+").
        questions (List[Question]): A list of questions included in the quiz.
    Methods:
        __init__(**data):
            Initializes the QuizCreate instance and prints the provided data for debugging purposes.
        auto_assign_question_ids(cls, value):
            A field validator for the "questions" attribute that automatically assigns unique IDs 
            to each question based on their position in the list. Prints debug information during 
            the assignment process.
    """
    title: str
    description: Optional[str] = None
    intimacy_level: Literal["<2 months", "6m", "1y", "2y", "2y+"]  # Restrict to specific values
    questions: List[Question]
    model_config = ConfigDict(validate_by_name=True)
    
    def __init__(self, **data):
        super().__init__(**data)

    @field_validator("questions", mode="before")
    def auto_assign_question_ids(cls, value):
        for idx, question in enumerate(value):
            question['id'] = idx + 1  # Use dict assignment here
        return value
