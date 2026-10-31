from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import get_password_hash
from app.db.base import Base
from app.db.database import SessionLocal, engine
from app.models.user import User
from app.routers.auth import router as auth_router


def initialize_database() -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        admin = db.query(User).filter(User.email == settings.ADMIN_DEFAULT_EMAIL.lower()).first()
        if admin is None:
            admin = User(
                email=settings.ADMIN_DEFAULT_EMAIL.lower(),
                password_hash=get_password_hash(settings.ADMIN_DEFAULT_PASSWORD),
                name=settings.ADMIN_DEFAULT_NAME,
                role="ADMIN",
                is_active=True,
            )
            db.add(admin)
            db.commit()
        elif admin.role.upper() != "ADMIN":
            raise RuntimeError(
                "ADMIN_DEFAULT_EMAIL already belongs to a non-admin account. "
                "Set ADMIN_DEFAULT_EMAIL to a new address."
            )


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    initialize_database()
    yield


app = FastAPI(title=settings.APP_NAME, debug=settings.DEBUG, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router, prefix=settings.API_V1_STR)
