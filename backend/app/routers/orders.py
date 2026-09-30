from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderResponse
from app.core.security import get_current_user

router = APIRouter(
    prefix="/api/orders",
    tags=["Orders"]
)


# Create order
@router.post(
    "/",
    response_model=OrderResponse,
    status_code=201
)
def create_order(
    data: OrderCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    product = (
        db.query(Product)
        .filter(Product.id == data.product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if data.quantity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Quantity must be greater than 0"
        )

    if product.stock < data.quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock"
        )

    total_price = product.price * data.quantity

    order = Order(
        buyer_id=current_user.id,
        product_id=product.id,
        quantity=data.quantity,
        total_price=total_price,
        status="pending"
    )

    product.stock -= data.quantity

    db.add(order)
    db.commit()
    db.refresh(order)

    return order


# Consumer: My Orders
@router.get(
    "/my-orders",
    response_model=list[OrderResponse]
)
def get_my_orders(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return (
        db.query(Order)
        .filter(Order.buyer_id == current_user.id)
        .order_by(Order.id.desc())
        .all()
    )


# Farmer: Orders for my products
@router.get(
    "/farmer-orders",
    response_model=list[OrderResponse]
)
def get_farmer_orders(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.role != "farmer":
        raise HTTPException(
            status_code=403,
            detail="Only farmers can view farmer orders"
        )

    return (
        db.query(Order)
        .join(
            Product,
            Order.product_id == Product.id
        )
        .filter(
            Product.farmer_id == current_user.id
        )
        .order_by(Order.id.desc())
        .all()
    )


# Update order status
@router.patch(
    "/{order_id}/status",
    response_model=OrderResponse
)
def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    product = (
        db.query(Product)
        .filter(Product.id == order.product_id)
        .first()
    )

    # Only the farmer who owns the product can update status
    if not product or product.farmer_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You cannot update this order"
        )

    allowed_statuses = [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled"
    ]

    if status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid order status"
        )

    order.status = status

    db.commit()
    db.refresh(order)

    return order