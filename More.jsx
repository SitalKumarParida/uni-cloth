import React from "react";
import { useNavigate } from "react-router-dom";
import "./Shop.css"; // Reuse the same CSS for consistency

const moreProducts = [
  {
    id: 1,
    name: "Trendy Sunglasses",
    originalPrice: 1200,
    discountedPrice: 699,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/7/a/z/xl-ts36-vebnor-original-imahbyggbtzhfehy.jpeg?q=70",
  },
  {
    id: 2,
    name: "Casual Sneakers",
    originalPrice: 2500,
    discountedPrice: 1599,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/w/k/2/s-togrblhnful-dp-d145-tripr-original-imahcz38hpyhkdef.jpeg?q=70",
  },
  {
    id: 3,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-t-shirt/f/m/b/xl-polo-tshirt-2-combo-leemak-original-imah3yw5khygszxt.jpeg?q=70",
  },
  {
    id: 4,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/y/d/2/m-polo-8016-kajaru-original-imah8qyjz99gfng8.jpeg?q=70",
  },
  {
    id: 5,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/a/3/r/xl-r-hf-458-white-london-hills-original-imahybz6pmyejfgj.jpeg?q=70",
  },
  {
    id: 6,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/k/8/b/-original-imagyk8qaafzmfbc.jpeg?q=70",
  },
  {
    id: 7,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/h/y/d/xl-52-jando-wight-magneto-original-imagz28p77tzkm8v.jpeg?q=70",
  },
  {
    id: 8,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/o/i/s/3xl-askpqrgfw36761-allen-solly-original-imah7m37nzcmcvxu.jpeg?q=70",
  },
  {
    id: 9,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/c/s/xxl-n4107a-austin-wood-original-imagpbygzxfgyvhc.jpeg?q=70",
  },
  {
    id: 10,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/o/m/a/-original-imah2z69bawepj5v.jpeg?q=70",
  },
  {
    id: 11,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/i/g/w/m-oversizetsrt-114-kajaru-original-imah8ysqz3cgvdwe.jpeg?q=70",
  },
  {
    id: 12,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/ky1vl3k0/t-shirt/e/s/9/xxs-tomcut-petrolblue-lauren-adams-original-imagadgduadasgzp.jpeg?q=70",
  },
  {
    id: 13,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/q/5/o/m-solid-men-polo-neck-tshirt-inkkr-original-imaha75zugr5rj6f.jpeg?q=70",
  },
  {
    id: 14,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/f/t/n/l-5214514-try-this-original-imah925yguxr4dy3.jpeg?q=70",
  },
  {
    id: 15,
    name: "Leather Handbag",
    originalPrice: 3200,
    discountedPrice: 1999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/q/7/i/m-aa-12-ausk-original-imahbq3gzcrsbuys.jpeg?q=70",
  },
];

const More = () => {
  const navigate = useNavigate();

  return (
    <div className="shop-container">
      {/* Header */}
      <div className="hero-section">
        <div className="hero-content">
          <p className="hero-tagline">FRESH COLLECTION</p>
          <h1 className="hero-title">More Trending Styles</h1>
          <p className="hero-subtitle">
            Discover top-rated essentials just for you!
          </p>
        </div>
        <div className="hero-image-container">
          <img
            src="https://rukminim2.flixcart.com/image/300/300/xif0q/t-shirt/k/o/x/l-452-453-461-combo-london-hills-original-imahagmqkugzfcze.jpeg?q=90"
            alt="New Collection"
            className="hero-image"
          />
        </div>
        <div className="discount-badge">
          <span className="discount-percent">New</span>
          <span className="discount-off">Arrivals</span>
        </div>
      </div>

      {/* More Products Grid */}
      <div className="deals-section">
        <div className="deals-header">
          <div>
            <h2 className="deals-title">Recommended for You</h2>
            <p className="deals-subtitle">Handpicked premium products</p>
          </div>
        </div>

        <div className="products-grid">
          {moreProducts.map((product) => (
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
                  <span className="original-price">
                    ₹{product.originalPrice}
                  </span>
                  <span className="discounted-price">
                    ₹{product.discountedPrice}
                  </span>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => alert(`Added ${product.name} to cart!`)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default More;
