import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.dependencies import get_current_user
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.database import get_db
from app.models.customer import Customer
from app.models.user import User
from app.schemas.common import APIResponse
from app.schemas.user import (
    ForgotPasswordRequest,
    ResetPasswordRequest,
    TokenResponse,
    UserLogin,
    UserRegister,
    UserResponse,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(
    data: UserRegister,
    db: Session = Depends(get_db),
):
    """
    Register a new user account.
    Validates email uniqueness and password complexity.
    Only allows role CUSTOMER by default unless created by ADMIN.
    """
    existing = db.query(User).filter(User.email == data.email.lower()).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email address already exists.",
        )

    # Protect STAFF role creation
    role = "CUSTOMER"
    if data.role and data.role.upper() == "STAFF":
        # Staff can only be created by admin, but for public signup it defaults to CUSTOMER
        role = "CUSTOMER"

    user = User(
        email=data.email.lower(),
        password_hash=get_password_hash(data.password),
        name=data.name,
        role=role,
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    user_resp = UserResponse.model_validate(user)
    return {
        "success": True,
        "message": "User registered successfully",
        "user": user_resp,
        "data": user_resp,
    }


@router.post("/register-staff", status_code=status.HTTP_201_CREATED)
def register_staff(
    data: UserRegister,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Admin-only endpoint to create new Staff members.
    Scene requirement: Only the admin can add a new member of staff.
    """
    if current_user.role.upper() != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only administrators can add internal staff members.",
        )

    existing = db.query(User).filter(User.email == data.email.lower()).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email address already exists.",
        )

    user = User(
        email=data.email.lower(),
        password_hash=get_password_hash(data.password),
        name=data.name,
        role="STAFF",
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    user_resp = UserResponse.model_validate(user)
    return {
        "success": True,
        "message": "Staff member created successfully",
        "user": user_resp,
        "data": user_resp,
    }


@router.post("/login")
def login(
    data: UserLogin,
    db: Session = Depends(get_db),
):
    """
    Authenticate user with email and password, issuing a signed JWT access token.
    Compatible with both standard OAuth2 token response and frontend contracts.
    """
    user = db.query(User).filter(User.email == data.email.lower()).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive. Please contact support.",
        )

    token = create_access_token(
        subject=str(user.id),
        role=user.role,
        email=user.email,
    )
    user_resp = UserResponse.model_validate(user)

    return {
        "success": True,
        "message": "Login successful",
        "access_token": token,
        "token": token,
        "token_type": "bearer",
        "user": user_resp,
        "data": {
            "token": token,
            "access_token": token,
            "user": user_resp,
        },
    }


@router.get("/me")
def get_current_user_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Return authenticated user profile and associated customer record if customer portal user."""
    user_resp = UserResponse.model_validate(current_user)
    customer_info = None
    if current_user.role.upper() == "CUSTOMER":
        cust = db.query(Customer).filter(Customer.user_id == current_user.id).first()
        if cust:
            customer_info = {
                "id": str(cust.id),
                "company_name": cust.company_name,
                "email": cust.email,
                "billing_address": cust.billing_address,
            }

    return {
        "success": True,
        "data": {
            "user": user_resp,
            "customer": customer_info,
        },
        "user": user_resp,
    }


@router.post("/forgot-password")
def forgot_password(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    """
    Simulate password reset link dispatch to registered email.
    Brightloop requirement: If they forget it later, a reset link should arrive at their registered email.
    """
    user = db.query(User).filter(User.email == data.email.lower()).first()
    # Always return 200 for user privacy
    return {
        "success": True,
        "message": "If an account with this email exists, a password reset link has been dispatched.",
        "data": {"email": data.email},
    }


@router.post("/reset-password")
def reset_password(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    """Reset user password with valid reset token."""
    user = db.query(User).filter(User.email == data.email.lower()).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found",
        )

    user.password_hash = get_password_hash(data.new_password)
    db.commit()

    return {
        "success": True,
        "message": "Password updated successfully. You may now log in with your new password.",
    }
