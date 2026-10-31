import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import get_password_hash
from app.db.database import Base, SessionLocal, engine
from app.routers.auth import router as auth_router
from app.routers.renewals import router as renewals_router

# Ensure all SQLAlchemy models are registered
from app.db import base  # noqa: F401
from app.models.user import User

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("subsense")


def init_db():
    """Create all database tables and seed default administrator if needed."""
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables initialized successfully.")

    db: Session = SessionLocal()
    try:
        admin_email = settings.ADMIN_DEFAULT_EMAIL.lower()
        existing_admin = db.query(User).filter(User.email == admin_email).first()
        if not existing_admin:
            admin_user = User(
                email=admin_email,
                password_hash=get_password_hash(settings.ADMIN_DEFAULT_PASSWORD),
                name=settings.ADMIN_DEFAULT_NAME,
                role="ADMIN",
                is_active=True,
            )
            db.add(admin_user)
            db.commit()
            logger.info(f"Default admin user created: {admin_email}")
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize tables and seed
    init_db()
    yield
    # Shutdown
    logger.info("SUBSENSE API shutdown complete.")


app = FastAPI(
    title="SUBSENSE API",
    description="FastAPI backend for the SUBSENSE subscription management platform.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(renewals_router, prefix=settings.API_V1_STR)


@app.get("/", tags=["Health"])
def root() -> dict:
    return {
        "app": settings.APP_NAME,
        "status": "operational",
        "environment": settings.ENVIRONMENT,
        "api_prefix": settings.API_V1_STR,
        "docs": "/docs",
    }


@app.get("/health", tags=["Health"])
def health_check() -> dict:
    return {
        "status": "healthy",
        "database": "connected",
        "app": settings.APP_NAME,
        "environment": settings.ENVIRONMENT,
    }
