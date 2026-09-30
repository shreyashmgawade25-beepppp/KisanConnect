from pydantic import BaseModel


class OrderCreate(BaseModel):
    product_id: int
    quantity: int


class OrderResponse(BaseModel):
    id: int
    buyer_id: int
    product_id: int
    quantity: int
    total_price: float
    status: str

    class Config:
        from_attributes = True