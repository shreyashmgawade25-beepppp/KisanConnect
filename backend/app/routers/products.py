from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.models.user import User
from app.schemas.product import ProductCreate, ProductResponse
from app.core.security import get_current_user


router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)


@router.post(
    "/",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED
)
def create_product(
    data: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "farmer":
        raise HTTPException(
            status_code=403,
            detail="Only farmers can add products"
        )

    product = Product(
        name=data.name,
        description=data.description,
        price=data.price,
        unit=data.unit,
        stock=data.stock,
        category=data.category,
        emoji=data.emoji,
        farmer_id=current_user.id
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


@router.get(
    "/",
    response_model=list[ProductResponse]
)
def get_products(
    db: Session = Depends(get_db)
):
    return (
        db.query(Product)
        .filter(Product.is_available == True)
        .all()
    )


@router.get(
    "/{product_id}",
    response_model=ProductResponse
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


@router.delete(
    "/{product_id}"
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if product.farmer_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You can only delete your own products"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }