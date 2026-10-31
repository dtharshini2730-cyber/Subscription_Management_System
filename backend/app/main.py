from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import Base, engine
from app.routers.auth import router as auth_router
from app.routers.renewals import router as renewals_router

# Import model modules so SQLAlchemy metadata is aware of them.
from app.db import base  # noqa: F401

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SUBSENSE API",
    version="1.0.0",
    description="FastAPI backend for the SUBSENSE subscription management platform.",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(renewals_router, prefix=settings.API_V1_STR)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok", "app": settings.APP_NAME, "environment": settings.ENVIRONMENT}


@app.get("/")
def root() -> dict:
    return {
        "app": settings.APP_NAME,
        "status": "operational",
        "api_prefix": settings.API_V1_STR,
        "docs": "/docs",
    }
