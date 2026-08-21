import datetime
import pytest
from fastapi.encoders import jsonable_encoder
import json

@pytest.fixture
def data():
    return datetime.datetime.now()

def test_json_dump(data):
    with pytest.raises(Exception):
        _ = json.dump(data)

def test_encoder(data):
    out = jsonable_encoder(data)
    assert out
    json_out = json.dump(out)
    assert json_out