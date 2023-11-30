from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..dependencies.database import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    post_content = Column(String)
    post_image = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    like_counter = Column(Integer, default=0)

    user = relationship("User", back_populates="posts")
    replies = relationship("Reply", back_populates="post")
