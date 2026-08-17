import string
from fastapi import Body, APIRouter
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel

router = APIRouter()

class greeting(BaseModel):
    message: str

@router.post("/hi", response_model = greeting)
def greet(who: str = Body(embed = True)) -> greeting:
    return {"message": f"Hello! {who}"}
