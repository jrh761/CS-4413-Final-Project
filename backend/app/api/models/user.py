from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from ..dependencies.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    date_of_birth = Column(Date)
    profile_picture_url = Column(String)
    role = Column(String, default="BasicUser")

    posts = relationship("Post", back_populates="user")
    replies = relationship("Reply", back_populates="user")
