import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, setCart }) {

  const increase = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decrease = (id) => {
    setCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const remove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="page">
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <h2>Your cart is empty 🛒</h2>
          <p>Add fresh produce from local farmers.</p>

          <Link className="primary" to="/shop">
            Continue Shopping →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">

      <div className="pill">YOUR CART</div>

      <h2>Fresh produce in your cart</h2>

      <div style={{ maxWidth: "850px", margin: "40px auto" }}>

        {cart.map(item => (
          <div
            key={item.id}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.06)"
            }}
          >

            <div
              style={{
                fontSize: "45px",
                width: "80px",
                textAlign: "center"
              }}
            >
              {item.emoji}
            </div>

            <div style={{ flex: 1 }}>
              <small>{item.farmer || `Farmer #${item.farmer_id}`}</small>

              <h3>{item.name}</h3>

              <strong>
                ₹{item.price} / {item.unit}
              </strong>
            </div>

            <div>
              <button onClick={() => decrease(item.id)}>-</button>

              <strong style={{ margin: "0 15px" }}>
                {item.quantity}
              </strong>

              <button onClick={() => increase(item.id)}>+</button>
            </div>

            <button
              onClick={() => remove(item.id)}
              style={{
                border: "none",
                background: "#ffe8e8",
                color: "#b42318",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Remove
            </button>

          </div>
        ))}

        <div
          style={{
            background: "#173b2c",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            marginTop: "30px"
          }}
        >
          <h3>Total: ₹{total}</h3>

          <Link
            to="/checkout"
            className="primary"
            style={{
              display: "inline-block",
              marginTop: "10px",
              background: "white",
              color: "#173b2c"
            }}
          >
            Proceed to Checkout →
          </Link>
        </div>

      </div>
    </main>
  );
}