from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
import uvicorn

async def greeting(request):
    return JSONResponse('Hello! harii')

app = Starlette(debug=True, routes=[Route('/hi', greeting),])
