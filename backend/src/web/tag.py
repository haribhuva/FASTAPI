import datetime

from fastapi import FastAPI, HTTPException

from ..model.tag import Tag, TagIn, TagOut
from ..service.tag import service

app = FastAPI()


@app.post('/')
def create(tag_in: TagIn) -> TagIn:
    tag = Tag(tag=tag_in.tag, created=datetime.datetime.utcnow(), secret='shhh')
    service.create(tag)
    return tag_in


@app.get('/{tag_str}', response_model=TagOut)
def get_one(tag_str: str) -> TagOut:
    try:
        return service.get(tag_str)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail='Tag not found') from exc
