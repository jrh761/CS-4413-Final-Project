from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from ..schemas.user_schema import UserBase


class PostBase(BaseModel):
    post_content: str
    post_image: str


class PostCreate(PostBase):
    pass


class Post(BaseModel):
    id: int
    post_content: str
    post_image: str
    created_at: datetime
    like_counter: int
    user: UserBase


class ReplyBase(BaseModel):
    reply_content: str


class ReplyCreate(ReplyBase):
    pass


class Reply(ReplyBase):
    id: int
    post_id: int
    created_at: datetime
    user: UserBase
