import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { offerProducts } from "./Offeritem";

const Offer = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const cartKey = `cart_${userID}`;

  const [selectedSizes, setSelectedSizes] = useState({}); // Track selected size per product

  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product.id];
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    storedCart.push({
      ...product,
      size: selectedSize,
    });
    localStorage.setItem(cartKey, JSON.stringify(storedCart));
    alert(`🛒 ${product.name} (Size: ${selectedSize}) added to cart!`);

    // Reset size selection for the product
    setSelectedSizes((prev) => ({ ...prev, [product.id]: null }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🔥 Exclusive Offers for {userID}</h1>
      <p style={styles.subheading}>
        Grab the hottest deals before they’re gone!
      </p>
      <div style={styles.grid}>
        {offerProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.price}>₹{product.price}</p>

            {/* Size Selection */}
            <div style={styles.sizeOptions}>
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSizes((prev) => ({
                      ...prev,
                      [product.id]: size,
                    }))
                  }
                  style={{
                    ...styles.sizeButton,
                    backgroundColor:
                      selectedSizes[product.id] === size
                        ? "#1976d2"
                        : "#f0f0f0",
                    color: selectedSizes[product.id] === size ? "#fff" : "#000",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              style={styles.button}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <button
        style={styles.goToCartButton}
        onClick={() => navigate(`/cart/${userID}`)}
      >
        🛍️ Go to Cart
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    color: "#333",
    marginBottom: "8px",
  },
  subheading: {
    textAlign: "center",
    color: "#777",
    fontSize: "16px",
    marginBottom: "30px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "24px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px",
    width: "260px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "12px",
  },
  name: {
    fontSize: "20px",
    margin: "8px 0",
    color: "#444",
  },
  price: {
    fontSize: "18px",
    color: "#2e7d32",
    marginBottom: "14px",
    fontWeight: "bold",
  },
  sizeOptions: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  sizeButton: {
    padding: "6px 12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.2s",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
  goToCartButton: {
    marginTop: "40px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "12px 28px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#43a047",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Offer;
