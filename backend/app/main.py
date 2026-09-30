from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import User
from app.routers.auth import router as auth_router
from app.routers.products import router as products_router
from app.routers.orders import router as orders_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="KisanConnect API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router)
app.include_router(products_router)
app.include_router(orders_router)


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "KisanConnect API"
    }