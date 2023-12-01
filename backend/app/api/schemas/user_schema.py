from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    id: Optional[int] = None
    first_name: str
    last_name: str
    email: str
    profile_picture_url: Optional[str] = None
    role: Optional[str] = "BasicUser"


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
