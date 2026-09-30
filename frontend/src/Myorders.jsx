import React, { useEffect, useState } from "react";

const API = "http://localhost:8000";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login to view your orders.");
      setLoading(false);
      return;
    }

    fetch(`${API}/api/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Failed to load orders");
        }

        return data;
      })
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getStatusEmoji = (status) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "confirmed":
        return "✅";
      case "preparing":
        return "👨‍🌾";
      case "out_for_delivery":
        return "🚚";
      case "delivered":
        return "📦";
      case "cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  return (
    <main className="page">
      <div className="pill">MY ORDERS</div>

      <h2>Your order history</h2>

      {loading && (
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          Loading your orders...
        </p>
      )}

      {error && (
        <p
          style={{
            textAlign: "center",
            marginTop: "50px",
            color: "#b42318",
            fontWeight: "600",
          }}
        >
          {error}
        </p>
      )}

      {!loading && !error && orders.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
          }}
        >
          <div style={{ fontSize: "60px" }}>🛒</div>
          <h3>No orders yet</h3>
          <p>Start shopping for fresh produce from local farmers.</p>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div
          style={{
            maxWidth: "900px",
            margin: "40px auto",
          }}
        >
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "25px",
                marginBottom: "20px",
                boxShadow: "0 5px 25px rgba(0,0,0,0.07)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "15px",
                }}
              >
                <div>
                  <small>ORDER #{order.id}</small>
                  <h3 style={{ margin: "5px 0" }}>
                    Product #{order.product_id}
                  </h3>
                </div>

                <span
                  style={{
                    background: "#eef7ec",
                    color: "#173b2c",
                    padding: "9px 14px",
                    borderRadius: "20px",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {getStatusEmoji(order.status)}{" "}
                  {order.status.replaceAll("_", " ")}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "15px",
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid #edf1eb",
                }}
              >
                <div>
                  <small>Quantity</small>
                  <strong style={{ display: "block" }}>
                    {order.quantity}
                  </strong>
                </div>

                <div>
                  <small>Total</small>
                  <strong style={{ display: "block" }}>
                    ₹{order.total_price}
                  </strong>
                </div>

                <div>
                  <small>Status</small>
                  <strong
                    style={{
                      display: "block",
                      textTransform: "capitalize",
                    }}
                  >
                    {order.status.replaceAll("_", " ")}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}