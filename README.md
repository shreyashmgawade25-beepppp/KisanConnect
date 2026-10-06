# 🌾 KisanConnect

## Farm-to-Home Marketplace Connecting Farmers Directly with Consumers

KisanConnect is a full-stack web application designed to connect local farmers directly with consumers through a digital farm-to-home marketplace.

The platform allows farmers to list agricultural products, manage stock and customer orders, while consumers can browse products, add items to their cart, place orders and track order status.

---

## 🌐 Live Demo

**Website:**  
https://kisan-connect-ruddy.vercel.app

**Backend API Documentation:**  
https://kisanconnect-api-bjgv.onrender.com/docs

---

## 🎯 Problem Statement

Local farmers often depend on multiple intermediaries to sell their agricultural products. This can reduce farmers' profit margins while consumers may have limited access to fresh products directly from local sources.

KisanConnect provides a digital platform that creates a direct connection between farmers and consumers.

---

## 💡 Proposed Solution

KisanConnect provides an online marketplace where:

- 👨‍🌾 Farmers can register and list their agricultural products.
- 💰 Farmers can set product prices and manage stock.
- 🛒 Consumers can browse available products.
- 🛍️ Consumers can add products to their cart.
- 📦 Consumers can place orders directly through the platform.
- 🚚 Farmers can view customer orders and update order status.
- 🔐 Secure authentication separates farmer and consumer functionality.

---

## ✨ Key Features

### 👨‍🌾 Farmer Features

- Farmer registration and login
- Add agricultural products
- Set product price and unit
- Manage product stock
- Add product category and description
- View incoming customer orders
- Update order status
- Farmer-specific order management

### 🛒 Consumer Features

- Consumer registration and login
- Browse available products
- View product information
- Add products to cart
- Place orders
- Automatic total price calculation
- Stock availability validation
- View personal order history
- Track order status

### 🔐 Authentication and Security

- JWT-based authentication
- Secure password hashing using bcrypt
- Role-based access control
- Protected API endpoints
- Separate farmer and consumer functionality

### 📦 Order Management

Orders can move through the following stages:

```text
Pending
   ↓
Confirmed
   ↓
Preparing
   ↓
Out for Delivery
   ↓
Delivered
```


🛠️ Technology Stack

Frontend
- React.js
- Vite
- JavaScript
- CSS
- Lucide React
  
Backend
- Python
- FastAPI
- SQLAlchemy
- JWT Authentication
- Passlib
- bcrypt
  
Database
- PostgreSQL
  
Development and Deployment
- Docker
- Git
- GitHub
- Vercel
- Render

<h2>🏗️ System Architecture</h2>

<p><strong>Consumer / Farmer</strong></p>
<p>↓</p>
<p><strong>React + Vite Frontend</strong></p>
<p>↓</p>
<p><strong>REST API</strong></p>
<p>↓</p>
<p><strong>FastAPI Backend</strong></p>
<p>↓</p>
<p><strong>SQLAlchemy ORM</strong></p>
<p>↓</p>
<p><strong>PostgreSQL Database</strong></p>
<br><br>


<h2>📁 Project Structure</h2>

<h3>Backend</h3>

<ul>
  <li><strong>backend/</strong>
    <ul>
      <li><strong>app/</strong>
        <ul>
          <li><strong>core/</strong>
            <ul>
              <li>security.py</li>
            </ul>
          </li>
          <li><strong>models/</strong>
            <ul>
              <li>user.py</li>
              <li>product.py</li>
              <li>order.py</li>
              <li>__init__.py</li>
            </ul>
          </li>
          <li><strong>routers/</strong>
            <ul>
              <li>auth.py</li>
              <li>products.py</li>
              <li>orders.py</li>
            </ul>
          </li>
          <li><strong>schemas/</strong>
            <ul>
              <li>auth.py</li>
              <li>product.py</li>
              <li>order.py</li>
            </ul>
          </li>
          <li>database.py</li>
          <li>main.py</li>
        </ul>
      </li>
      <li>Dockerfile</li>
      <li>requirements.txt</li>
    </ul>
  </li>
</ul>

<h3>Frontend</h3>

<ul>
  <li><strong>frontend/</strong>
    <ul>
      <li><strong>src/</strong>
        <ul>
          <li>App.jsx</li>
          <li>Checkout.jsx</li>
          <li>FarmerDashboard.jsx</li>
          <li>FarmerOrders.jsx</li>
          <li>Myorders.jsx</li>
          <li>...</li>
        </ul>
      </li>
      <li>package.json</li>
    </ul>
  </li>
</ul>

<h3>Root Files</h3>

<ul>
  <li>docker-compose.yml</li>
  <li>.gitignore</li>
  <li>README.md</li>
</ul><br><br>


🔌 API Overview

Authentication

POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

Products

POST   /api/products/
GET    /api/products/
GET    /api/products/{product_id}
DELETE /api/products/{product_id}

Orders

POST   /api/orders/
GET    /api/orders/my-orders
GET    /api/orders/farmer-orders
PATCH  /api/orders/{order_id}/status

Interactive API Documentation

FastAPI Swagger documentation:
https://kisanconnect-api-bjgv.onrender.com/docs


🚀 Running the Project Locally
1. Clone the Repository
git clone https://github.com/shreyashmgawade25-beepppp/KisanConnect.git
cd KisanConnect

2. Start the Backend
cd backend

Install dependencies:
pip install -r requirements.txt

Start the FastAPI server:
uvicorn app.main:app --reload

Backend:
http://localhost:8000

Swagger API documentation:
http://localhost:8000/docs

3. Start the Frontend
Open another terminal:
cd frontend

Install dependencies:
npm install

Start the development server:
npm run dev

Frontend:
http://localhost:5173

🐳 Running with Docker
The project includes Docker configuration for running the backend and PostgreSQL database.
docker compose up --build

To stop the containers:
docker compose down


<h2>🔄 Application Workflow</h2>

<p><strong>1. User Registration</strong></p>

<p>↓</p>

<p><strong>2. Select Role</strong></p>

<p>↓</p>

<ul>
  <li>👨‍🌾 <strong>Farmer</strong> → Add and manage products</li>
  <li>🛒 <strong>Consumer</strong> → Browse products and place orders</li>
</ul>

<p>↓</p>

<p><strong>3. Consumer adds products to Cart</strong></p>

<p>↓</p>

<p><strong>4. Consumer places Order</strong></p>

<p>↓</p>

<p><strong>5. Order Created</strong></p>

<p>↓</p>

<p><strong>6. Farmer receives and manages Order</strong></p>

<p>↓</p>

<p><strong>7. Farmer updates Order Status</strong></p>

<p>↓</p>

<p><strong>8. Order Delivered</strong></p>
<br><br>

🎯 Project Objectives

The main objectives of KisanConnect are:
- Create a direct digital connection between farmers and consumers.
- Provide farmers with an online platform to sell their products.
- Make fresh agricultural products accessible to consumers.
- Reduce dependency on unnecessary intermediaries.
- Provide transparent product pricing.
- Simplify the ordering and order-management process.
- Demonstrate a complete full-stack application using modern technologies.

🔮 Future Scope

The platform can be further extended with:
- 💳 Online payment integration
- 📍 GPS-based farmer discovery
- 🚚 Real-time delivery tracking
- ⭐ Product ratings and reviews
- 👨‍🌾 Farmer verification
- 📊 Advanced analytics dashboard
- 🤖 AI-based demand prediction
- 📱 Dedicated Android/iOS application
- 🔔 Notifications for order updates
- 📈 Farmer sales and revenue analytics

<h2>🌍 Deployment</h2>

<h3>Frontend</h3>

<p><strong>Platform:</strong> Vercel</p>

<p>
  <strong>Live Website:</strong><br>
  <a href="https://kisan-connect-ruddy.vercel.app">
    https://kisan-connect-ruddy.vercel.app
  </a>
</p>

<hr>

<h3>Backend</h3>

<p><strong>Platform:</strong> Render</p>

<p>
  <strong>Backend API:</strong><br>
  <a href="https://kisanconnect-api-bjgv.onrender.com">
    https://kisanconnect-api-bjgv.onrender.com
  </a>
</p>

<hr>

<h3>Database</h3>

<p><strong>Database:</strong> PostgreSQL</p>

<p><strong>Hosting:</strong> Render PostgreSQL</p>

<hr>

<h3>API Documentation</h3>

<p>
  <strong>FastAPI Swagger Documentation:</strong><br>
  <a href="https://kisanconnect-api-bjgv.onrender.com/docs">
    https://kisanconnect-api-bjgv.onrender.com/docs
  </a>
</p><br><br>

Production Links

Frontend:
https://kisan-connect-ruddy.vercel.app

Backend:
https://kisanconnect-api-bjgv.onrender.com

API Documentation:
https://kisanconnect-api-bjgv.onrender.com/docs

<br><br>
👨‍💻 Developer

Shreyash Gawade

B.Tech – Information Technology

Shree L. R. Tiwari College of Engineering

GitHub:
https://github.com/shreyashmgawade25-beepppp

Linkedin:
https://www.linkedin.com/in/shreyashgawade

<br><br>
📚 Project Type

Academic Full-Stack Web Development Project
KisanConnect was developed as a project demonstrating:
- Frontend development
- Backend API development
- Database management
- Authentication
- Role-based access control
- Docker containerization
- Cloud deployment
  <br><br>
📄 License

This project is developed for academic and educational purposes.
