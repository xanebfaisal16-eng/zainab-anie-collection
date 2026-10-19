import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Categories({ darkMode, lang, addToCart }) {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [showPopup, setShowPopup] = useState(true);

  // Custom Modal State for Login Warning
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Directly check login status from localStorage so it updates instantly without refresh
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const isLogin = localStorage.getItem("zainab_anie_logged_in") === "true" || 
                    Boolean(localStorage.getItem("loggedInUserEmail")) || 
                    Boolean(localStorage.getItem("userEmail"));
    setIsUserLoggedIn(isLogin);
  };

  const brands = ["ALL", "MARIA.B", "ZARA SHAHJAHAN", "ETHNIC", "SEHRISH REHAN", "NADIA FAROOQUI"];

  // Products State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    setLoading(true);

    // 1. Load products from LocalStorage (Admin Panel / Added products)
    const localProducts = JSON.parse(localStorage.getItem("zainab_anie_products")) || [];

    // 2. Fetch products dynamically from MongoDB Backend API
    fetch("http://localhost:8080/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        const mongoProducts = data.products || data;
        const fetchedList = Array.isArray(mongoProducts) ? mongoProducts : [];
        setProducts([...localProducts, ...fetchedList]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products from backend:", err);
        setProducts([...localProducts]);
        setLoading(false);
      });

    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const filteredProducts = selectedBrand === "ALL" 
    ? products 
    : products.filter(item => item.brand?.toUpperCase() === selectedBrand.toUpperCase());

  const goldPrimary = "#d4af37";

  return (
    <div style={{ padding: "40px 20px", background: darkMode ? "#121212" : "#ffffff", color: darkMode ? "#fff" : "#000", fontFamily: "sans-serif", position: "relative" }}>
      
      {/* Custom Luxury Modal Popup for Unlogged Users */}
      {showLoginModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            background: darkMode ? "#181818" : "#ffffff",
            border: `1px solid ${goldPrimary}`,
            padding: "40px 30px",
            maxWidth: "420px",
            width: "90%",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(212,175,55,0.2)",
            position: "relative"
          }}>
            <h3 style={{ fontSize: "16px", letterSpacing: "2.5px", fontWeight: "700", marginBottom: "15px", textTransform: "uppercase", color: goldPrimary }}>
              Authentication Required
            </h3>
            <p style={{ fontSize: "12px", color: darkMode ? "#ccc" : "#555", lineHeight: "1.6", marginBottom: "25px" }}>
              Please login or signup to your account first before adding luxury items to your cart.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button 
                onClick={() => {
                  setShowLoginModal(false);
                  navigate("/login");
                }}
                style={{
                  padding: "12px 24px",
                  background: `linear-gradient(135deg, #f3e5ab 0%, #d4af37 100%)`,
                  color: "#000",
                  border: "none",
                  fontSize: "10px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  cursor: "pointer"
                }}
              >
                LOGIN NOW
              </button>
              <button 
                onClick={() => setShowLoginModal(false)}
                style={{
                  padding: "12px 24px",
                  background: "transparent",
                  color: darkMode ? "#fff" : "#000",
                  border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
                  fontSize: "10px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  cursor: "pointer"
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notice Bar */}
      {!isUserLoggedIn && showPopup && (
        <div style={{ 
          background: darkMode ? "#1a1a1a" : "#111111", 
          color: goldPrimary, 
          border: `1px solid ${goldPrimary}`,
          padding: "10px 20px", 
          textAlign: "center", 
          fontSize: "10px", 
          letterSpacing: "2px", 
          maxWidth: "1200px", 
          margin: "0 auto 30px auto", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          textTransform: "uppercase",
          fontWeight: "600"
        }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            {lang === 'ur' 
              ? 'آپ کی مرضی! فارم فل کر کے آرڈر کریں یا کسی بھی پروڈکٹ پر واٹس ایپ کے ذریعے رابطہ کریں۔' 
              : 'Your choice! Fill out the form to order or simply place your order via WhatsApp on any product.'}
          </div>
          <button 
            onClick={() => setShowPopup(false)} 
            style={{ background: "transparent", border: "none", color: goldPrimary, fontSize: "16px", cursor: "pointer", fontWeight: "bold", paddingLeft: "15px" }}
          >
            ×
          </button>
        </div>
      )}

      {/* Heading */}
      <h1 style={{ textAlign: "center", marginBottom: "25px", letterSpacing: "3px", fontSize: "20px", fontWeight: "600", textTransform: "uppercase", color: goldPrimary }}>
        {lang === 'ur' ? 'زیڈ اے ریپلیکا کلیکشن' : 'ZA REPLICA COLLECTION'}
      </h1>

      {/* Brand Filter Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginBottom: "45px", maxWidth: "950px", margin: "0 auto 45px auto", padding: "0 10px" }}>
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBrand(b)}
            style={{
              padding: "7px 14px",
              background: selectedBrand === b ? goldPrimary : "transparent",
              color: selectedBrand === b ? "#000" : (darkMode ? "#ccc" : "#333"),
              border: `1px solid ${selectedBrand === b ? goldPrimary : (darkMode ? "#333" : "#ddd")}`,
              cursor: "pointer",
              fontSize: "9px",
              letterSpacing: "1.2px",
              fontWeight: "600",
              transition: "all 0.2s ease"
            }}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Loading State with Spinning Loader */}
      {loading ? (
        <div style={{ 
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", 
          minHeight: "50vh", background: darkMode ? "#121212" : "#fff", color: darkMode ? "#fff" : "#000" 
        }}>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{
            width: "50px",
            height: "50px",
            border: `4px solid ${darkMode ? "#333" : "#eaeaea"}`,
            borderTop: "4px solid #d4af37",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            marginBottom: "15px"
          }}></div>
          <p style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "600", textTransform: "uppercase" }}>Loading Collection...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", fontSize: "12px", letterSpacing: "2px", color: darkMode ? "#888" : "#666" }}>
          NO PRODUCTS FOUND IN THIS CATEGORY.
        </div>
      ) : (
        /* Products Grid */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
          {filteredProducts.map((item, index) => {
            const itemTitle = item.title || item.name || "PRODUCT";
            const productId = item.id || item._id || index;
            
            let productImg = "https://via.placeholder.com/300x400";
            if (Array.isArray(item.image) && item.image.length > 0) {
              productImg = item.image[0];
            } else if (typeof item.image === "string" && item.image.trim() !== "") {
              productImg = item.image;
            } else if (Array.isArray(item.images) && item.images.length > 0) {
              productImg = item.images[0];
            }

            const productPrice = item.price ? Number(item.price) : 4450;
            const msg = `Hello, I want to order this product:\n\n*Brand:* ${item.brand}\n*Product:* ${itemTitle}\n*Price:* PKR ${productPrice}\n\n--- *CUSTOMER DETAILS* ---\n*Name:* \n*Phone:* \n*Delivery Address:* `;

            return (
              <div key={productId} style={{ 
                border: `1px solid ${darkMode ? "#222" : "#eaeaea"}`, 
                background: darkMode ? "#161616" : "#ffffff", 
                padding: "15px", 
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
              }}>
                <div>
                  <Link to={`/product/${productId}`} style={{ textDecoration: "none" }}>
                    <div style={{ 
                      width: "100%", 
                      aspectRatio: "3 / 4", 
                      background: darkMode ? "#1f1f1f" : "#f7f7f7", 
                      marginBottom: "15px", 
                      overflow: "hidden", 
                      cursor: "pointer" 
                    }}>
                      <img 
                        src={productImg} 
                        alt={itemTitle} 
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover", 
                          objectPosition: "top center",
                          transition: "transform 0.3s ease" 
                        }} 
                      />
                    </div>
                  </Link>

                  <div style={{ fontSize: "10px", color: darkMode ? "#888" : "#777", letterSpacing: "2px", marginBottom: "6px" }}>
                    <span>{item.brand || "ZAINAB & ANI"}</span>
                  </div>

                  <Link to={`/product/${productId}`} style={{ textDecoration: "none", color: darkMode ? "#fff" : "#000" }}>
                    <h3 style={{ fontSize: "14px", margin: "0 0 4px 0", letterSpacing: "1px", fontWeight: "600" }}>{itemTitle}</h3>
                  </Link>
                  <p style={{ fontSize: "9px", color: darkMode ? "#777" : "#888", textTransform: "uppercase", marginBottom: "15px", letterSpacing: "1.5px" }}>REPLICA EDITION</p>
                </div>

                <div style={{ borderTop: `1px solid ${darkMode ? "#222" : "#f0f0f0"}`, paddingTop: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "1px", color: goldPrimary }}>PKR {productPrice.toLocaleString()}</span>
                  </div>

                  {isUserLoggedIn ? (
                    <button 
                      onClick={() => addToCart && addToCart(item)}
                      style={{
                        width: "100%",
                        padding: "13px 10px",
                        background: darkMode ? "#fff" : "#000",
                        color: darkMode ? "#000" : "#fff",
                        border: `1px solid ${darkMode ? "#fff" : "#000"}`,
                        fontSize: "9px", 
                        fontWeight: "700", 
                        letterSpacing: "2px", 
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                      }}
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <button 
                        onClick={() => setShowLoginModal(true)}
                        style={{
                          padding: "13px 10px",
                          background: darkMode ? "#1f1f1f" : "#f0f0f0",
                          color: darkMode ? "#ccc" : "#444",
                          border: `1px solid ${darkMode ? "#333" : "#ddd"}`,
                          fontSize: "9px", 
                          fontWeight: "700", 
                          letterSpacing: "1.5px", 
                          cursor: "pointer"
                        }}
                      >
                        ADD TO CART
                      </button>

                      <a 
                        href={`https://wa.me/923246667719?text=${encodeURIComponent(msg)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          padding: "13px 10px", 
                          textAlign: "center",
                          background: "#25D366", 
                          color: "#ffffff",
                          border: "none", 
                          textDecoration: "none", 
                          fontSize: "9px", 
                          fontWeight: "700", 
                          letterSpacing: "2px",
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center"
                        }}
                      >
                        WHATSAPP
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}