# Backend — FastAPI + PostgreSQL (asyncpg + SQLAlchemy)

## 1. Prerequisites

- PostgreSQL running on `localhost:5432`
- Database exists (this project uses `fastapi` by default)
- `backend/.env` contains:

```env
DB_URL=postgresql+asyncpg://postgres:<password>@localhost:5432/fastapi
```

Create the DB if it doesn't exist:

```bash
psql "postgresql://postgres:<password>@localhost:5432/postgres" -c "CREATE DATABASE fastapi;"
```

## 2. How DB init works

- Models live in `app/db/model.py` (`Base`, `Login`, `Task`).
- Engine lives in `app/db/engine.py` (`async_engine = create_async_engine(DB_URL)`).
- `app/main.py` defines a FastAPI `lifespan` handler:

```python
async def lifespan(app: FastAPI):
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
```

On every `uvicorn` startup it opens one transaction, calls
`Base.metadata.create_all` (which emits `CREATE TABLE IF NOT EXISTS`
for each model), then serves requests. Restarting is safe — existing
tables are left untouched.

## 3. Initiate DB by yourself

### Option A — automatic (just start the server)

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Tables are created on startup.

### Option B — manual one-shot (without starting server)

```bash
cd backend
uv run python -c "import asyncio; from app.db.engine import async_engine; from app.db.model import Base; import app.db.model
async def init():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
asyncio.run(init())"
```

What this does:
1. `async_engine.begin()` — opens an async connection + transaction.
2. `conn.run_sync(...)` — bridges async connection to the sync
   `Base.metadata.create_all` call.
3. `Base.metadata.create_all` — inspects all models subclassing `Base`
   and issues `CREATE TABLE` for missing tables only.
4. Exiting `begin()` commits, or rolls back on error.

## 4. Verify / reset

```bash
# list tables
psql "postgresql://postgres:<password>@localhost:5432/fastapi" -c "\dt"

# inspect one table
psql "postgresql://postgres:<password>@localhost:5432/fastapi" -c "\d login"

# full reset (drops everything created above)
psql "postgresql://postgres:<password>@localhost:5432/fastapi" -c "DROP TABLE IF EXISTS tasks, login;"
```

Then re-run Option A or B to recreate.

> For production migrations use Alembic (`alembic init`, point
> `sqlalchemy.url` at `DB_URL`, `target_metadata = Base.metadata`).
> `create_all` is for local dev only.
