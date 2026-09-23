# Backend — FastAPI + PostgreSQL

Minimal dev base. Add modules as development goes further.

## Layout

```text
app/
├── main.py            # FastAPI entrypoint + lifespan (creates tables)
├── constants/         # env config (DB_URL)
├── db/                # engine.py (async_engine), model.py (Base, Login, Task)
├── api/v1/endpoints/  # auth.py (add more routers here)
├── service/           # empty — add business logic here
└── test/              # empty — add pytest files here
```

## Setup

```bash
cd backend
uv sync
```

`.env`:
```env
DB_URL=postgresql+asyncpg://postgres:<password>@localhost:5432/fastapi
```

Create DB if missing:
```bash
psql "postgresql://postgres:<password>@localhost:5432/postgres" -c "CREATE DATABASE fastapi;"
```

## Initiate tables (run yourself)

```bash
cd backend
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

`main.py:lifespan` runs `Base.metadata.create_all` once on startup
(`CREATE TABLE IF NOT EXISTS`). Safe to restart.

Manual one-shot (no server):
```bash
uv run python -c "import asyncio; from app.db.engine import async_engine; from app.db.model import Base; import app.db.model
async def init():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
asyncio.run(init())"
```

Verify:
```bash
psql "postgresql://postgres:<password>@localhost:5432/fastapi" -c "\dt"
```

> Dev only. Move to Alembic when schema starts changing.
