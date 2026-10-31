import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, field_validator
from app.core.security import validate_password_complexity


class UserBase(BaseModel):
    email: EmailStr
    name: str


class UserRegister(UserBase):
    password: str
    role: Optional[str] = "CUSTOMER"  # Can only be set to STAFF by ADMIN

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        is_valid, error_msg = validate_password_complexity(v)
        if not is_valid:
            raise ValueError(error_msg or "Password does not meet complexity requirements.")
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    token: str
    new_password: str

    @field_validator("new_password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        is_valid, error_msg = validate_password_complexity(v)
        if not is_valid:
            raise ValueError(error_msg or "Password does not meet complexity requirements.")
        return v


class UserResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr
    name: str
    role: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    token: str  # For frontend contract compatibility
    token_type: str = "bearer"
    user: UserResponse
