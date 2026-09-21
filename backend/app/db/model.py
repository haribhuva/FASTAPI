import uuid

from sqlalchemy import Boolean, ForeignKey, String, Uuid
from sqlalchemy.orm import Mapped, declarative_base, mapped_column, relationship


Base = declarative_base()


class Login(Base):
    __tablename__ = "login"

    id: Mapped[uuid.UUID] = mapped_column(Uuid(as_uuid=True),primary_key=True,default=uuid.uuid4)
    username: Mapped[str] = mapped_column(String(50),unique=True,nullable=False)
    password: Mapped[str] = mapped_column(String(255),nullable=False)
    email: Mapped[str] = mapped_column(String(255),unique=True,nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean,nullable=False,default=True)

    tasks: Mapped[list["Task"]] = relationship(back_populates="owner",cascade="all, delete-orphan")


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[uuid.UUID] = mapped_column(Uuid(as_uuid=True),primary_key=True,default=uuid.uuid4)
    owner_id: Mapped[uuid.UUID] = mapped_column(Uuid(as_uuid=True),ForeignKey("login.id"),nullable=False,index=True)

    owner: Mapped["Login"] = relationship(back_populates="tasks")

    