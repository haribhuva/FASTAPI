from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy import select

from ....db.engine import async_engine
from ....models import Login


auth_router = APIRouter()


class UserRegister(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


@auth_router.post("/register")
async def signup(user: UserRegister):
    async with async_engine.begin() as conn:
        # Check whether username already exists
        result = await conn.execute(
            select(Login).where(Login.username == user.username)
        )
        existing_user = result.scalar_one_or_none()

        if existing_user:
            raise HTTPException(
                status_code=409,
                detail="Username already exists"
            )

        # Check whether email already exists
        email_result = await conn.execute(
            select(Login).where(Login.email == user.email)
        )
        existing_email = email_result.scalar_one_or_none()

        if existing_email:
            raise HTTPException(
                status_code=409,
                detail="Email address already registered"
            )

        # Create user
        new_user = Login(
            username=user.username,
            email=user.email,
            password=user.password,
        )

        conn.add(new_user)

    return {
        "message": "Signup successful",
        "username": user.username,
    }


@auth_router.post("/login")
async def login(user: UserLogin):
    async with async_engine.begin() as conn:
        result = await conn.execute(
            select(Login).where(Login.username == user.username)
        )

        db_user = result.scalar_one_or_none()

        if not db_user or db_user.password != user.password:
            raise HTTPException(
                status_code=401,
                detail="Invalid username or password"
            )

    return {
        "message": "Login successful",
        "username": db_user.username,
    }