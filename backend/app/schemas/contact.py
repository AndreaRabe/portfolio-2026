from pydantic import BaseModel, EmailStr, field_validator


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    mission_type: str
    message: str

    @field_validator("name", "message", "mission_type")
    @classmethod
    def not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("This field cannot be empty")
        return v.strip()

    @field_validator("message")
    @classmethod
    def message_length(cls, v: str) -> str:
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters")
        if len(v) > 2000:
            raise ValueError("Message must be less than 2000 characters")
        return v


class ContactResponse(BaseModel):
    success: bool
    message: str
