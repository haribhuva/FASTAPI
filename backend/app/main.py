from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1.endpoints.auth import auth_router
from .db.engine import async_engine
from .models import Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Runs once on startup: creates tables from SQLAlchemy models
    # if they don't exist yet. No-op on restart.
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    lifespan=lifespan,
    # docs_url=None,
    # redoc_url=None,
    # openapi_url=None
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, tags=["Authentication"])



if __name__ == "__main__":

    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
