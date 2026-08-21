from fastapi import FastAPI
import asyncio
import uvicorn

app = FastAPI()

@app.get("/hi")
async def greet():
    await asyncio.sleep(5)
    return "hello! it's about 5 seconds!"

if __name__ == "__main__":
    uvicorn.run("greet_async:app", port=8001)