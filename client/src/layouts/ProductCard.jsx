import React, { useState, useEffect } from "react";

export default function ProductCard({ product, darkMode, lang }) {
  const [viewCount, setViewCount] = useState(5);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomCount = Math.floor(Math.random() * 4) + 3;
      setViewCount(randomCount);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      border: darkMode ? "1px solid #333" : "1px solid #eaeaea", 
      background: darkMode ? "#1a1a1a" : "#fff", 
      color: darkMode ? "#fff" : "#000",
      padding: "20px", 
      position: "relative",
      fontFamily: "sans-serif"
    }}>
      
      {/* Wishlist Button */}
      <button 
        onClick={() => setIsWishlisted(!isWishlisted)}
        style={{
          position: "absolute", top: "20px", right: "20px",
          background: "transparent", border: "none", cursor: "pointer", fontSize: "18px", zIndex: 2,
          color: darkMode ? "#fff" : "#000"
        }}
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      {/* Live Viewers */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: darkMode ? "#aaa" : "#555", marginBottom: "12px", fontWeight: "500" }}>
        <span>👁️</span> 
        <span>{viewCount} {lang === 'ur' ? 'افراد دیکھ رہے ہیں' : 'people viewing this right now'}</span>
      </div>

      {/* Product Image */}
      <div style={{ width: "100%", height: "350px", background: darkMode ? "#222" : "#f7f7f7", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Brand & ID */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10px", color: darkMode ? "#888" : "#666", letterSpacing: "1.5px" }}>
        <span>{product.brand}</span>
        <span>{product.id}</span>
      </div>

      {/* Title & Description */}
      <h3 style={{ fontSize: "15px", margin: "6px 0 4px 0", letterSpacing: "1px", fontWeight: "600" }}>{product.title}</h3>
      <p style={{ fontSize: "10px", color: darkMode ? "#888" : "#666", textTransform: "uppercase", marginBottom: "12px", letterSpacing: "1px" }}>
        CATEGORY: {product.category}
      </p>
      <p style={{ fontSize: "11px", color: darkMode ? "#aaa" : "#555", marginBottom: "15px", lineHeight: "1.4" }}>
        {product.description || "Pure premium unstitched fabric with intricate details."}
      </p>

      {/* Price & WhatsApp Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: darkMode ? "1px solid #333" : "1px solid #eaeaea", paddingTop: "15px" }}>
        <span style={{ fontSize: "13px", fontWeight: "bold", letterSpacing: "0.5px" }}>PKR {product.price}</span>
        <a 
          href={`https://wa.me/923246667719?text=Hello,%2520I%2520want%2520to%2520order%2520this%2520product:%250A*Brand:%2520${product.brand}*%250A*Product:%2520${product.title}*%250A*Price:%2520PKR%2520${product.price}*`} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ fontSize: "10px", fontWeight: "bold", textDecoration: "underline", color: darkMode ? "#fff" : "#000", letterSpacing: "1.5px" }}
        >
          {lang === 'ur' ? 'واٹس ایپ آرڈر' : 'ORDER VIA WHATSAPP'}
        </a>
      </div>

    </div>
  );
}