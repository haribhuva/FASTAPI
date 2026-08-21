import string
from fastapi import Body, APIRouter, Header, Response
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel

router = APIRouter()

class greeting(BaseModel):
    message: str

@router.post("/hi", response_model = greeting)
def greet(who: str = Body(embed = True)) -> greeting:
    return {"message": f"Hello! {who}"}

@router.post("/agent")
def greet(user_agent: str = Header()):
    return user_agent

@router.get("/header/{name}/{value}")
def header(name: str, value: str, response:Response):
    response.headers[name] = value
    return "mormal body"