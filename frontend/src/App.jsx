import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Leaf,
  Store,
  Truck,
  ShieldCheck
} from 'lucide-react';
import Cart from "./Cart";
import FarmerDashboard from "./FarmerDashboard";
import Checkout from "./Checkout";
import MyOrders from "./MyOrders";
import FarmerOrders from "./FarmerOrders";

const API_URL = 'https://kisanconnect-api-bjgv.onrender.com';

function Nav({ cartCount = 0 }) {
  return (
    <nav>

      <Link className="brand" to="/">
        <Leaf />
        Kisan<span>Connect</span>
      </Link>

      <div>

        <Link to="/shop">
          Shop
        </Link>

        <Link to="/cart">
          🛒 Cart {cartCount > 0 && `(${cartCount})`}
        </Link>

        <Link to="/my-orders">
      📦 My Orders
      </Link>

       <Link to="/farmer-orders">
      🌾 Farmer Orders
      </Link>

        <Link to="/login">
          Login
        </Link>

        <Link
          className="btn"
          to="/register"
        >
          Join KisanConnect
        </Link>

      </div>

    </nav>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <div className="pill">
            🌱 FARM-TO-HOME • MIRA-BHAYANDAR
          </div>

          <h1>
            Fresh from local farms.
            <br />
            <em>Direct to your home.</em>
          </h1>

          <p>
            KisanConnect connects local farmers directly with urban consumers
            — fairer prices for farmers, fresher food for families.
          </p>

          <div className="actions">
            <Link className="primary" to="/shop">
              Shop Fresh Produce →
            </Link>

            <Link className="secondary" to="/register">
              Sell on KisanConnect
            </Link>
          </div>

          <div className="stats">
            <div>
              <b>100%</b>
              <small>Direct sourcing</small>
            </div>

            <div>
              <b>Local</b>
              <small>Mira-Bhayandar farms</small>
            </div>

            <div>
              <b>Fresh</b>
              <small>Scheduled delivery</small>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="orb">🌾</div>

          <h3>Support a local farmer</h3>

          <p>
            Your purchase travels a shorter, more transparent journey
            from farm to table.
          </p>

          <div className="route">
            <span>👨‍🌾 Farmer</span>
            <i>→</i>
            <span>🏠 You</span>
          </div>
        </div>
      </section>

      <section className="features">
        <Feature
          icon={<Store />}
          title="Direct Marketplace"
          text="Farmers list produce and reach customers without unnecessary intermediaries."
        />

        <Feature
          icon={<Truck />}
          title="Smart Delivery"
          text="Organized delivery scheduling keeps orders predictable and fresh."
        />

        <Feature
          icon={<ShieldCheck />}
          title="Secure Accounts"
          text="JWT-based authentication protects farmer and consumer accounts."
        />
      </section>
    </>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      {icon}
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Shop({ addToCart }) {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    fetch('https://kisanconnect-api-bjgv.onrender.com/api/products/')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="page">
      <div className="section-head">
        <div>
          <div className="pill">
            TODAY'S LOCAL HARVEST
          </div>

          <h2>Fresh produce near you</h2>
        </div>

        <span>Direct from local farmers</span>
      </div>

      {loading && (
        <p style={{ textAlign: 'center' }}>
          Loading fresh produce...
        </p>
      )}

      {error && (
        <p
          style={{
            textAlign: 'center',
            color: '#b42318'
          }}
        >
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <p style={{ textAlign: 'center' }}>
          No products available right now.
        </p>
      )}

      <div className="grid">
        {products.map((p) => (
          <article className="product" key={p.id}>

            <div className="product-img">
              {p.emoji || '🌱'}
            </div>

            <div className="product-body">

              <small>
                Farmer #{p.farmer_id}
              </small>

              <h3>{p.name}</h3>

              <p>
                {p.description}
              </p>

              <strong>
                ₹{p.price}
                <small> / {p.unit}</small>
              </strong>

              <small>
                Stock: {p.stock}
              </small>

              <button onClick={() => addToCart(p)}>
                     Add to cart
              </button>

            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

/* =========================
   AUTHENTICATION
========================= */

function Auth({ register = false }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("consumer");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Please wait...");

    try {
      // REGISTER
      if (register) {
        const registerResponse = await fetch(
          "https://kisanconnect-api-bjgv.onrender.com/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              role,
            }),
          }
        );

        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {
          setMessage(registerData.detail || "Registration failed");
          return;
        }

        // Automatically login after registration
        const loginResponse = await fetch(
          "https://kisanconnect-api-bjgv.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              username: email,
              password: password,
            }),
          }
        );

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
          setMessage("Registration successful. Please login.");
          return;
        }

        localStorage.setItem("token", loginData.access_token);

        if (loginData.user?.role) {
       localStorage.setItem("role", loginData.user.role);
        }

           setMessage("✅ Login successful!");

         window.location.href =
            loginData.user?.role === "farmer" ? "/farmer" : "/shop";

        return;
      }

      // LOGIN
      const loginResponse = await fetch(
        "https://kisanconnect-api-bjgv.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: email,
            password: password,
          }),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setMessage(loginData.detail || "Login failed");
        return;
      }

      // SAVE JWT
      localStorage.setItem("token", loginData.access_token);

      // Save role if backend returns it
      if (loginData.role) {
        localStorage.setItem("role", loginData.role);
      }

      setMessage("✅ Login successful!");

      // Go to farmer dashboard
      window.location.href = "/farmer";

    } catch (error) {
      setMessage("❌ Cannot connect to backend");
    }
  };

  return (
    <main className="auth">
      <div className="auth-card">

        <div className="brand big">
          <Leaf /> Kisan<span>Connect</span>
        </div>

        <h2>
          {register ? "Create your account" : "Welcome back"}
        </h2>

        <p>
          {register
            ? "Join farmers and consumers building a stronger local food system."
            : "Sign in to manage your KisanConnect account."}
        </p>

        <form onSubmit={handleSubmit}>

          {register && (
            <>
              <label>Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />

              <label>Account Type</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="consumer">Consumer</option>
                <option value="farmer">Farmer</option>
              </select>
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="primary full"
          >
            {register ? "Create account" : "Sign in"}
          </button>

        </form>

        {message && (
          <p style={{ marginTop: "15px", fontWeight: "600" }}>
            {message}
          </p>
        )}

        <small>
          {register
            ? "Already have an account? "
            : "New to KisanConnect? "}

          <Link to={register ? "/login" : "/register"}>
            {register ? "Login" : "Create an account"}
          </Link>
        </small>

      </div>
    </main>
  );
}


/* =========================
   APP
========================= */

export default function App() {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("kisan_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (product) => {

    const existing = cart.find(item => item.id === product.id);

    let updated;

    if (existing) {
      updated = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ];
    }

    setCart(updated);
    localStorage.setItem("kisan_cart", JSON.stringify(updated));

    alert(`${product.name} added to cart 🛒`);
  };

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem(
      "kisan_cart",
      JSON.stringify(newCart)
    );
  };

  return (
    <>
      <Nav cartCount={cart.length} />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<Shop addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={updateCart}
            />
          }
        />

        <Route
          path="/login"
          element={<Auth />}
        />

        <Route
          path="/register"
          element={<Auth register />}
        />

        <Route
          path="/farmer"
          element={<FarmerDashboard />}
        />

        <Route
            path="/checkout"
           element={
            <Checkout
           cart={cart}
         setCart={updateCart}
           />
           }
         />

         <Route path="/my-orders" element={<MyOrders />} />

         <Route
          path="/farmer-orders"
            element={<FarmerOrders />}
           />

      </Routes>

      <footer>
        © 2026 KisanConnect · Empowering local farmers, one order at a time.
      </footer>
    </>
  );
}
