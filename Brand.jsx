// Brand.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Brand.css"; // Optional, for styling
import { products } from "./Branditem";
const Brand = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const cartKey = `cart_${userID}`;

  const [selectedSizes, setSelectedSizes] = useState({}); // Track selected sizes per product

  const styles = {
    sizeOptions: {
      display: "flex",
      gap: "8px",
      marginTop: "8px",
      flexWrap: "wrap",
    },
    sizeBtn: (isSelected) => ({
      padding: "6px 12px",
      border: "1px solid #333",
      borderRadius: "5px",
      backgroundColor: isSelected ? "#4CAF50" : "#f9f9f9",
      color: isSelected ? "#fff" : "#000",
      cursor: "pointer",
    }),
  };

  const addToCart = (product) => {
    const size = selectedSizes[product.id];
    if (!size) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    existingCart.push({
      name: product.name,
      price: product.price,
      size: size,
    });

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    alert(`${product.name} (Size: ${size}) added to cart!`);

    setSelectedSizes((prev) => ({ ...prev, [product.id]: null }));
  };

  return (
    <div className="brand-container">
      <h2>Brand Products</h2>
      <div className="brand-product-list">
        {products.map((product) => (
          <div
            className="brand-card"
            key={product.id}
            style={{ position: "relative" }}
          >
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <div style={styles.sizeOptions}>
              {[6, 7, 8, 9].map((size) => (
                <button
                  key={size}
                  style={styles.sizeBtn(selectedSizes[product.id] === size)}
                  onClick={() =>
                    setSelectedSizes((prev) => ({
                      ...prev,
                      [product.id]: size,
                    }))
                  }
                >
                  {size}
                </button>
              ))}
            </div>

            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <br />
      <button onClick={() => navigate(`/cart/${userID}`)}>Go to Cart</button>
    </div>
  );
};

export default Brand;
