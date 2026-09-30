from pydantic import BaseModel, ConfigDict
from typing import Optional


class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    unit: str
    stock: int
    category: Optional[str] = None
    emoji: Optional[str] = "🌱"


class ProductResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    unit: str
    stock: int
    category: Optional[str]
    emoji: Optional[str]
    is_available: bool
    farmer_id: int

    model_config = ConfigDict(from_attributes=True)