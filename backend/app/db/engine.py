from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from ..core.constants import DB_URL

async_engine = create_async_engine(url=DB_URL, echo=True)

AsyncSessionLocal = async_sessionmaker(bind=async_engine, class_=AsyncSession, expire_on_commit=False)

async def get_session() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        else:
            await session.commit()