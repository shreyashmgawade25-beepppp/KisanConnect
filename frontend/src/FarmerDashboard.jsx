import React, { useState } from "react";

const API = "https://kisanconnect-api-bjgv.onrender.com";

export default function FarmerDashboard() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    unit: "kg",
    stock: "",
    category: "Vegetables",
    emoji: "🥬",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setMessage("Adding product...");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API}/api/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          unit: form.unit,
          stock: Number(form.stock),
          category: form.category,
          emoji: form.emoji,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Failed to add product");
        return;
      }

      setMessage("✅ Product added successfully!");

      setForm({
        name: "",
        description: "",
        price: "",
        unit: "kg",
        stock: "",
        category: "Vegetables",
        emoji: "🥬",
      });
    } catch (error) {
      setMessage("❌ Cannot connect to server");
    }
  };

  return (
    <main className="page">
      <div className="section-head">
        <div>
          <div className="pill">FARMER DASHBOARD</div>
          <h2>Add your fresh produce</h2>
        </div>
      </div>

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
        <form onSubmit={addProduct}>

          <label>Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Fresh Tomatoes"
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Fresh tomatoes grown near Mira-Bhayandar"
            required
          />

          <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ flex: 1 }}>
              <label>Price (₹)</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="42"
                required
              />
            </div>

            <div style={{ flex: 1 }}>
              <label>Unit</label>
              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
              >
                <option value="kg">kg</option>
                <option value="bunch">bunch</option>
                <option value="dozen">dozen</option>
                <option value="piece">piece</option>
              </select>
            </div>
          </div>

          <label>Stock Available</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="50"
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Leafy Greens</option>
            <option>Grains</option>
            <option>Other</option>
          </select>

          <label>Product Emoji</label>
          <input
            name="emoji"
            value={form.emoji}
            onChange={handleChange}
            placeholder="🥬"
            maxLength="5"
          />

          <button
            type="submit"
            className="primary full"
            style={{ marginTop: "20px" }}
          >
            Add Product
          </button>

          {message && (
            <p style={{ marginTop: "20px", fontWeight: "600" }}>
              {message}
            </p>
          )}

        </form>
      </div>
    </main>
  );
}
