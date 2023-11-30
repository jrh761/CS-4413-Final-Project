from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routers import user_routes
from .api.routers import post_routes
from .api.dependencies.database import engine, Base


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(user_routes.router)
app.include_router(post_routes.router)
