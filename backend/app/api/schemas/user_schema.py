from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    role: Optional[str] = "BasicUser"


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
