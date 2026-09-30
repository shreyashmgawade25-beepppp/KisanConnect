import React, { useEffect, useState } from "react";

const API = "https://kisanconnect-api-bjgv.onrender.com";

export default function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const loadOrders = async () => {
    try {
      const response = await fetch(
        `${API}/api/orders/farmer-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to load orders");
      }

      setOrders(data);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      setMessage("Updating order...");

      const response = await fetch(
        `${API}/api/orders/${orderId}/status?status=${status}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to update order"
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId ? data : order
        )
      );

      setMessage("✅ Order status updated successfully!");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  const statusEmoji = (status) => {
    const emojis = {
      pending: "⏳",
      confirmed: "✅",
      preparing: "👨‍🌾",
      out_for_delivery: "🚚",
      delivered: "📦",
      cancelled: "❌",
    };

    return emojis[status] || "📋";
  };

  return (
    <main className="page">

      <div className="pill">
        FARMER ORDERS
      </div>

      <div
        className="section-head"
        style={{ marginBottom: "30px" }}
      >
        <div>
          <h2>Incoming orders</h2>
          <span>
            Manage orders for your products
          </span>
        </div>
      </div>

      {message && (
        <p
          style={{
            textAlign: "center",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          {message}
        </p>
      )}

      {loading && (
        <p style={{ textAlign: "center" }}>
          Loading orders...
        </p>
      )}

      {!loading && orders.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
          }}
        >
          <div style={{ fontSize: "60px" }}>
            📦
          </div>

          <h3>
            No orders yet
          </h3>

          <p>
            Orders for your products will appear here.
          </p>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div
          style={{
            maxWidth: "950px",
            margin: "0 auto",
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
                boxShadow:
                  "0 5px 25px rgba(0,0,0,0.07)",
              }}
            >

              {/* HEADER */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >

                <div>
                  <small>
                    ORDER #{order.id}
                  </small>

                  <h3
                    style={{
                      margin: "5px 0",
                    }}
                  >
                    Product #{order.product_id}
                  </h3>
                </div>

                <span
                  style={{
                    background: "#eef7ec",
                    color: "#173b2c",
                    padding: "9px 15px",
                    borderRadius: "20px",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {statusEmoji(order.status)}{" "}
                  {order.status.replaceAll("_", " ")}
                </span>

              </div>

              {/* ORDER INFO */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "20px",
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop:
                    "1px solid #edf1eb",
                }}
              >

                <div>
                  <small>
                    Customer ID
                  </small>

                  <strong
                    style={{
                      display: "block",
                    }}
                  >
                    #{order.buyer_id}
                  </strong>
                </div>

                <div>
                  <small>
                    Quantity
                  </small>

                  <strong
                    style={{
                      display: "block",
                    }}
                  >
                    {order.quantity}
                  </strong>
                </div>

                <div>
                  <small>
                    Order Total
                  </small>

                  <strong
                    style={{
                      display: "block",
                    }}
                  >
                    ₹{order.total_price}
                  </strong>
                </div>

              </div>

              {/* STATUS CONTROL */}

              <div
                style={{
                  marginTop: "25px",
                }}
              >

                <label>
                  Update Order Status
                </label>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                  style={{
                    maxWidth: "400px",
                  }}
                >

                  <option value="pending">
                    ⏳ Pending
                  </option>

                  <option value="confirmed">
                    ✅ Confirmed
                  </option>

                  <option value="preparing">
                    👨‍🌾 Preparing
                  </option>

                  <option value="out_for_delivery">
                    🚚 Out for Delivery
                  </option>

                  <option value="delivered">
                    📦 Delivered
                  </option>

                  <option value="cancelled">
                    ❌ Cancelled
                  </option>

                </select>

              </div>

            </div>
          ))}
        </div>
      )}

    </main>
  );
}

