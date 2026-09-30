from sqlalchemy import Column, Integer, Float, String, ForeignKey
from app.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    buyer_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False
    )

    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)

    status = Column(
        String(50),
        default="pending",
        nullable=False
    )