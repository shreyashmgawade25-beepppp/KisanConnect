import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000";

export default function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Mira-Bhayandar",
    pincode: "",
    slot: "Morning (8 AM - 12 PM)",
  });

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ Please login first.");
      return;
    }

    if (!cart || cart.length === 0) {
      setMessage("❌ Cart is empty.");
      return;
    }

    setLoading(true);
    setMessage("⏳ Placing order...");

    try {
      for (const item of cart) {
        const response = await fetch(
          `${API}/api/orders/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              product_id: Number(item.id),
              quantity: Number(item.quantity),
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Failed to place order"
          );
        }
      }

      setMessage("✅ Order placed successfully!");

      localStorage.removeItem("kisan_cart");
      setCart([]);

      setTimeout(() => {
        navigate("/my-orders");
      }, 1200);

    } catch (error) {
      console.error("ORDER ERROR:", error);
      setMessage(`❌ ${error.message}`);
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <main className="page">
        <div
          style={{
            textAlign: "center",
            padding: "100px 20px",
          }}
        >
          <h2>Your cart is empty 🛒</h2>

          <button
            className="primary"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page">

      <div className="pill">
        CHECKOUT
      </div>

      <h2>Complete your order</h2>

      <div
        style={{
          maxWidth: "700px",
          margin: "40px auto",
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >

        <h3>Delivery Details 🚚</h3>

        <label>Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
        />

        <label>Phone Number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          required
        />

        <label>Delivery Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="House no., building, street..."
          required
        />

        <label>City</label>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          required
        />

        <label>Pincode</label>
        <input
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="401107"
          required
        />

        <label>Delivery Slot</label>
        <select
          name="slot"
          value={form.slot}
          onChange={handleChange}
        >
          <option>Morning (8 AM - 12 PM)</option>
          <option>Afternoon (12 PM - 4 PM)</option>
          <option>Evening (4 PM - 8 PM)</option>
        </select>

        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            background: "#173b2c",
            color: "white",
            borderRadius: "15px",
          }}
        >
          <h3>Order Total: ₹{total}</h3>

          <button
            type="button"
            className="primary full"
            onClick={placeOrder}
            disabled={loading}
            style={{
              marginTop: "15px",
            }}
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </div>

        {message && (
          <p
            style={{
              marginTop: "20px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}

      </div>

    </main>
  );
}