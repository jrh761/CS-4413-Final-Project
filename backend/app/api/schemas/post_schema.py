from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PostBase(BaseModel):
    post_content: str
    post_image: str


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    created_at: datetime
    like_counter: int


class ReplyBase(BaseModel):
    reply_content: str


class ReplyCreate(ReplyBase):
    pass


class Reply(ReplyBase):
    id: int
    post_id: int
    created_at: datetime
