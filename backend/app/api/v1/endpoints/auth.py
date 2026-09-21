from fastapi import APIRouter
from pydantic import BaseModel

auth_router = APIRouter()


class User(BaseModel):
    username: str
    password: str


@auth_router.post("/login")
def login(user: User):
    username = user.username
    password = user.password
    if username != "admin" or password != "password":
        return {"message": "Login failed"}
    return {"message": "Login successful"}
