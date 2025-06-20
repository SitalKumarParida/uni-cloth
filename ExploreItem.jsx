import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Explore.css";
import { mensProducts, womensProducts } from "./Exploreitems";
const ExploreItem = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const cartKey = `cart_${userID}`;

  const [selectedSizes, setSelectedSizes] = useState({}); // Track selected size per product ID

  const addToCart = (product) => {
    const selectedSize = selectedSizes[product.id];
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
    alert(`🛒 Added ${product.name} (Size: ${selectedSize}) to cart!`);

    setSelectedSizes((prev) => ({ ...prev, [product.id]: null }));
  };

  const renderProductCard = (product) => (
    <div className="product-card" key={product.id}>
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
          <span className="original-price">₹{product.originalPrice}</span>
          <span className="discounted-price">₹{product.discountedPrice}</span>
        </div>
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
                  selectedSizes[product.id] === size ? "#4CAF50" : "#f1f1f1",
                color: selectedSizes[product.id] === size ? "#fff" : "#000",
                cursor: "pointer",
              }}
              onClick={() =>
                setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))
              }
            >
              {size}
            </button>
          ))}
        </div>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="shop-container">
      <div className="hero-section">
        <div className="hero-content">
          <p className="hero-tagline">FRESH STYLE FOR EVERYONE</p>
          <h1 className="hero-title">Explore Men’s & Women’s Collection</h1>
          <p className="hero-subtitle">
            Welcome, {userID}! Discover your perfect outfit today.
          </p>
        </div>
        <div className="hero-image-container">
          <img
            src="https://img.freepik.com/free-photo/sexy-smiling-beautiful-woman-her-handsome-boyfriend-happy-cheerful-family-having-tender-momentsyoung-passionate-couple-hugging-sensual-pair-isolated-white-cheerful-happy_158538-22601.jpg?ga=GA1.1.1660874654.1735040715&semt=ais_hybrid&w=740"
            alt="Explore Fashion"
            className="hero-image"
          />
        </div>
        <div className="discount-badge">
          <span className="discount-percent">New</span>
          <span className="discount-off">Arrivals</span>
        </div>
      </div>

      <div className="deals-section">
        <div className="deals-header">
          <h2 className="deals-title">👔 Men's Collection</h2>
        </div>
        <div className="products-grid">
          {mensProducts.map(renderProductCard)}
        </div>
      </div>

      <div className="deals-section">
        <div className="deals-header">
          <h2 className="deals-title">👗 Women's Collection</h2>
        </div>
        <div className="products-grid">
          {womensProducts.map(renderProductCard)}
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

export default ExploreItem;
