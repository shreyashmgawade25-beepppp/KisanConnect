from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean
from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500), nullable=True)
    price = Column(Float, nullable=False)
    unit = Column(String(50), nullable=False)
    stock = Column(Integer, nullable=False, default=0)
    category = Column(String(100), nullable=True)
    emoji = Column(String(10), nullable=True)
    is_available = Column(Boolean, default=True)

    farmer_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )