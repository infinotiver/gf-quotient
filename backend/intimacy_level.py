from enum import StrEnum

class IntimacyLevel(StrEnum):
    LESS_THAN_TWO_MONTHS = "<2 months"
    SIX_MONTHS           = "6m"
    ONE_YEAR             = "1y"
    TWO_YEARS            = "2y"
    TWO_YEARS_PLUS       = "2y+"