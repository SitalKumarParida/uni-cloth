// Cart.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { userID } = useParams();
  const cartKey = `cart_${userID}`;
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [saveMessage, setSaveMessage] = useState("");
  const [showCheckout, setShowCheckout] = useState(false); // ✅ New State

  useEffect(() => {
    const stored = localStorage.getItem(cartKey);
    const parsed = stored ? JSON.parse(stored) : [];
    setCartItems(parsed);

    if (parsed.length > 0) {
      axios
        .post("http://localhost:5009/api/cart/save", {
          userID,
          items: parsed.map((item) => ({
            ...item,
            price: Number(item.price),
          })),
        })
        .then((res) => {
          console.log("🛒 Cart saved to DB:", res.data);
          setSaveMessage("✅ Cart successfully saved to database.");
          setTimeout(() => setSaveMessage(""), 3000);
        })
        .catch((err) => {
          console.error("❌ Failed to save cart:", err);
          setSaveMessage("❌ Failed to save cart to database.");
        });
    }
  }, [cartKey, userID]);

  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
  };

  const clearCart = () => {
    localStorage.removeItem(cartKey);
    setCartItems([]);
    setShowCheckout(false);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  return (
    <div
      className="cart-page"
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>
        🛒 Your Cart
      </h2>

      {saveMessage && (
        <p
          style={{
            backgroundColor: "#dff0d8",
            color: "#3c763d",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          {saveMessage}
        </p>
      )}

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#999" }}>
          Your cart is empty.
        </p>
      ) : (
        <>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {cartItems.map((item, index) => (
              <li
                key={index}
                style={{
                  background: "#fff",
                  marginBottom: "10px",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ddd",
                }}
              >
                <div>
                  <strong>{item.name}</strong> — ₹{item.price}
                </div>
                <button
                  onClick={() => removeItem(index)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "20px",
              background: "#f0f0f0",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p>
              <strong>Total:</strong> ₹{totalAmount}
            </p>
            <button
              onClick={clearCart}
              style={{
                marginRight: "10px",
                backgroundColor: "#f39c12",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
            <button
              onClick={() => setShowCheckout(true)}
              style={{
                backgroundColor: "#2ecc71",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {/* ✅ Checkout Form */}
      {showCheckout && (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            marginTop: "20px",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
            💳 Enter Card Details
          </h3>
          <input
            type="text"
            placeholder="Cardholder Name"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          />
          <input
            type="text"
            placeholder="Card Number"
            maxLength={16}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            />
            <input
              type="password"
              placeholder="CVV"
              maxLength={3}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            />
          </div>
          <button
            onClick={() => {
              alert("✅ Payment Successful!");
              clearCart();
            }}
            style={{
              marginTop: "15px",
              width: "100%",
              backgroundColor: "#27ae60",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Pay Now
          </button>
        </div>
      )}

      <button
        onClick={() => navigate(`/shop/${userID}`)}
        style={{
          marginTop: "20px",
          backgroundColor: "#3498db",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          display: "block",
          width: "100%",
        }}
      >
        ← Back to Shop
      </button>
    </div>
  );
}

export default Cart;
