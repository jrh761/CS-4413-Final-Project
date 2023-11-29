from fastapi import FastAPI
from .api.routers import user_routes
from .api.routers import post_routes
from .api.dependencies.database import engine, Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_routes.router)
app.include_router(post_routes.router)
