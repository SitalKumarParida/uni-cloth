// Shop.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Shop.css";
import { defaultHeroData, defaultDealsProducts } from "./Shopitems";

const Shop = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const cartKey = `cart_${userID}`;

  const [heroData, setHeroData] = useState(defaultHeroData);
  const [dealsProducts, setDealsProducts] = useState(defaultDealsProducts);
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({}); // { productIndex: 'M' }

  // Countdown timer restarting every 6 hours
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const msIn6Hours = 6 * 60 * 60 * 1000;

      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);

      const elapsed = now - startOfDay;
      const timeLeftInCycle = msIn6Hours - (elapsed % msIn6Hours);

      const hours = Math.floor((timeLeftInCycle / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeftInCycle / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeftInCycle / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer(); // Initial call
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const addToCart = (product, idx) => {
    const selectedSize = selectedSizes[idx];
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    cartItems.push({
      name: product.name,
      price: product.discountedPrice,
      size: selectedSize,
    });
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
    alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);

    setSelectedSizes((prev) => ({ ...prev, [idx]: null }));
  };

  return (
    <div className="shop-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <p className="hero-tagline">ALL NEW STYLE</p>
          <h1 className="hero-title">{heroData.title}</h1>
          <p className="hero-subtitle">{heroData.subtitle}</p>
        </div>
        <div className="hero-image-container">
          <img
            src={heroData.imageUrl}
            alt="Fashion Model"
            className="hero-image"
          />
        </div>
        <div className="discount-badge">
          <span className="discount-percent">{heroData.discount}</span>
          <span className="discount-off">OFF</span>
        </div>
      </div>

      {/* Deals Section */}
      <div className="deals-section">
        <div className="deals-header">
          <div>
            <h2 className="deals-title">Deals Of The Hour</h2>
            <p className="deals-subtitle">
              Limited-time exclusive savings for you!
            </p>
          </div>
          <div className="deals-timer">
            {Object.keys(timeLeft).length ? (
              Object.entries(timeLeft).map(([key, value]) => (
                <div className="timer-box" key={key}>
                  {String(value).padStart(2, "0")}
                  <span>{key.charAt(0).toUpperCase()}</span>
                </div>
              ))
            ) : (
              <span>Time's up!</span>
            )}
          </div>
        </div>

        <div className="products-grid">
          {dealsProducts.map((product, idx) => (
            <div className="product-card" key={idx}>
              <span className="product-discount">
                -
                {Math.round(
                  ((product.originalPrice - product.discountedPrice) /
                    product.originalPrice) *
                    100
                )}
                %
              </span>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="price-section">
                  <span className="original-price">
                    ₹{product.originalPrice}
                  </span>
                  <span className="discounted-price">
                    ₹{product.discountedPrice}
                  </span>
                </div>

                {/* Size Selection */}
                <div
                  className="size-options"
                  style={{
                    margin: "10px 0",
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      style={{
                        padding: "6px 12px",
                        border: "1px solid #333",
                        borderRadius: "5px",
                        backgroundColor:
                          selectedSizes[idx] === size ? "#4CAF50" : "#f1f1f1",
                        color: selectedSizes[idx] === size ? "#fff" : "#000",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setSelectedSizes((prev) => ({
                          ...prev,
                          [idx]: size,
                        }))
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product, idx)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="go-to-cart-btn"
          onClick={() => navigate(`/cart/${userID}`)}
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default Shop;
