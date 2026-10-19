import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SingleProduct({ darkMode, lang, addToCart, isLoggedIn }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showDescription, setShowDescription] = useState(true);
  const [showProductCare, setShowProductCare] = useState(false);

  // Dynamic Window Width for instant responsiveness
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);

    const localProducts = JSON.parse(localStorage.getItem("zainab_anie_products")) || [];
    const foundLocal = localProducts.find(item => String(item.id) === String(id) || String(item._id) === String(id));

    if (foundLocal) {
      formatAndSetProduct(foundLocal);
      fetchRelated(foundLocal.brand, foundLocal._id || foundLocal.id, localProducts);
    } else {
      fetch(`http://localhost:8080/api/v1/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const fetchedProd = data.product || data;
          if (fetchedProd) {
            formatAndSetProduct(fetchedProd);
            fetchRelated(fetchedProd.brand, fetchedProd._id || fetchedProd.id, localProducts);
          } else {
            setProduct(null);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching product from backend:", err);
          setProduct(null);
          setLoading(false);
        });
    }

    setSelectedImageIndex(0);
    window.scrollTo(0, 0);
  }, [id]);

  const fetchRelated = (brandName, currentId, localProds) => {
    if (!brandName) return;
    const filtered = localProds.filter(p => p.brand?.toLowerCase() === brandName.toLowerCase() && String(p._id || p.id) !== String(currentId));
    if (filtered.length > 0) {
      setRelatedProducts(filtered.slice(0, 4));
    } else {
      axios.get(`http://localhost:8080/api/v1/products?brand=${encodeURIComponent(brandName)}`)
        .then(res => {
          const list = res.data.products || res.data || [];
          setRelatedProducts(list.filter(p => String(p._id || p.id) !== String(currentId)).slice(0, 4));
        })
        .catch(() => setRelatedProducts([]));
    }
  };

  const formatAndSetProduct = (prodData) => {
    let rawImages = prodData.image || prodData.images || prodData.img || [];
    let imgArray = [];

    if (Array.isArray(rawImages)) {
      imgArray = rawImages.filter(img => typeof img === "string" && img.trim() !== "");
    } else if (typeof rawImages === "string" && rawImages.trim() !== "") {
      imgArray = [rawImages];
    }

    if (imgArray.length === 0) {
      imgArray = ["https://via.placeholder.com/500x700"];
    }

    const defaultDescription = `Outfit Type: Eastern\nStyle: Long Shirt\nColor Type: Black\nPackage Includes: 3 Piece Top, Bottom & Dupatta\n\nFabric:\n- Shirt: Marina\n- Trouser: Marina\n- Dupatta: Marina Shawl\n\nWork Technique: Embroidered\nBest worn in: Winter Season`;
    
    const defaultCare = `Fabric\nMix Fabric Handle with care while cleaning\n\nCare\n• Don’t wash dry clean only\n• Can be ironed on low heat\n• Don’t use too much bleach`;

    const rawStock = prodData.stock !== undefined && prodData.stock !== null && prodData.stock !== "" 
                   ? prodData.stock 
                   : (prodData.quantity !== undefined && prodData.quantity !== null 
                   ? prodData.quantity 
                   : (prodData.qty !== undefined && prodData.qty !== null ? prodData.qty : 150));
                   
    const stockVal = Number(rawStock) > 0 ? Number(rawStock) : 150;
    const isInStock = stockVal > 0;

    setProduct({
      ...prodData,
      image: imgArray,
      price: prodData.price ? Number(prodData.price) : 33990,
      stock: stockVal,
      inStock: isInStock,
      description: prodData.description && prodData.description.trim() !== "" ? prodData.description : defaultDescription,
      productCare: prodData.productCare && prodData.productCare.trim() !== "" ? prodData.productCare : defaultCare,
      tiktokUrl: prodData.tiktokUrl || ""
    });
    setLoading(false);
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === product.image.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? product.image.length - 1 : prev - 1));
  };

  // Keyboard Arrow Keys support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product]);

  // Loading Screen with Spinning Loader Animation
  if (loading) {
    return (
      <div style={{ 
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", 
        minHeight: "70vh", background: darkMode ? "#121212" : "#fff", color: darkMode ? "#fff" : "#000", fontFamily: "sans-serif" 
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
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: darkMode ? "#fff" : "#000", fontFamily: "sans-serif" }}>
        <h3>Product not found!</h3>
      </div>
    );
  }

  const currentImage = product.image[selectedImageIndex] || product.image[0];
  const isMobile = windowWidth < 900;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    if (!isLoggedIn) {
      alert("Please login first to add items to cart!");
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  const goldPrimary = "#d4af37";

  return (
    <div style={{ 
      maxWidth: "1300px", 
      margin: "40px auto", 
      padding: "20px", 
      background: darkMode ? "#121212" : "#fff", 
      color: darkMode ? "#fff" : "#000",
      fontFamily: "sans-serif",
      boxSizing: "border-box",
      width: "100%",
      overflowX: "hidden"
    }}>
      
      {/* Main Responsive Layout */}
      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row", 
        gap: "50px", 
        alignItems: "flex-start",
        width: "100%",
        boxSizing: "border-box"
      }}>
        
        {/* Left Section: Thumbnails & Main Image */}
        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column-reverse" : "row", 
          gap: "15px",
          width: "100%",
          maxWidth: isMobile ? "100%" : "52%",
          boxSizing: "border-box",
          position: isMobile ? "static" : "sticky",
          top: "40px"
        }}>
          
          {/* Thumbnails list */}
          <div style={{ 
            display: "flex", 
            flexDirection: isMobile ? "row" : "column", 
            gap: "10px", 
            overflowX: isMobile ? "auto" : "visible",
            overflowY: isMobile ? "hidden" : "auto",
            maxHeight: isMobile ? "none" : "600px",
            width: "100%",
            maxWidth: isMobile ? "100%" : "95px",
            paddingBottom: "5px",
            boxSizing: "border-box"
          }}>
            {product.image.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImageIndex(index)}
                style={{
                  width: isMobile ? "65px" : "85px",
                  height: isMobile ? "85px" : "110px",
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: "4px",
                  flexShrink: 0,
                  border: selectedImageIndex === index ? `2px solid ${goldPrimary}` : "1px solid #ddd",
                  opacity: selectedImageIndex === index ? "1" : "0.5",
                  transition: "all 0.2s ease"
                }}
              />
            ))}
          </div>

          {/* Main Display Image with Zoom */}
          <div 
            onClick={() => setShowModal(true)}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseMove={(e) => {
              const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - left) / width) * 100;
              const y = ((e.clientY - top) / height) * 100;
              const imgEl = e.currentTarget.querySelector('img');
              if (imgEl) imgEl.style.transformOrigin = `${x}% ${y}%`;
            }}
            onMouseLeave={(e) => {
              setIsZoomed(false);
              const imgEl = e.currentTarget.querySelector('img');
              if (imgEl) imgEl.style.transformOrigin = 'center center';
            }}
            style={{ 
              width: "100%", 
              height: isMobile ? "450px" : "620px", 
              background: darkMode ? "#181818" : "#f7f7f7", 
              overflow: "hidden", 
              position: "relative", 
              cursor: "crosshair", 
              borderRadius: "4px",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)"
            }}
          >
            <img 
              src={currentImage} 
              alt={product.title} 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover", 
                transform: isZoomed ? "scale(2.5)" : "scale(1)", 
                transition: isZoomed ? "transform 0.05s ease-out" : "transform 0.3s ease-out" 
              }} 
            />

            {product.image.length > 1 && (
              <button onClick={prevImage} style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: "42px", height: "42px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", zIndex: 10 }}>&#10094;</button>
            )}

            {product.image.length > 1 && (
              <button onClick={nextImage} style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: "42px", height: "42px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", zIndex: 10 }}>&#10095;</button>
            )}
          </div>
        </div>

        {/* Fullscreen Zoom Modal */}
        {showModal && (
          <div onClick={() => setShowModal(false)} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.92)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, cursor: "zoom-out", boxSizing: "border-box", padding: "20px" }}>
            <div style={{ position: "relative", maxWidth: "95vw", maxHeight: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "-50px", right: "0", background: "none", border: "none", color: "#fff", fontSize: "36px", cursor: "pointer", zIndex: 10000 }}>&times;</button>
              <img src={currentImage} alt={product.title} style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px" }} />
              {product.image.length > 1 && (
                <button onClick={prevImage} style={{ position: "absolute", left: isMobile ? "10px" : "-65px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.7)", color: "#fff", border: "none", borderRadius: "50%", width: "45px", height: "45px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", zIndex: 10000 }}>&#10094;</button>
              )}
              {product.image.length > 1 && (
                <button onClick={nextImage} style={{ position: "absolute", right: isMobile ? "10px" : "-65px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.7)", color: "#fff", border: "none", borderRadius: "50%", width: "45px", height: "45px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", zIndex: 10000 }}>&#10095;</button>
              )}
            </div>
          </div>
        )}

        {/* Right Section: Details & Buy Actions */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "100%", maxWidth: isMobile ? "100%" : "48%", boxSizing: "border-box" }}>
          
          <span style={{ fontSize: "11px", letterSpacing: "2.5px", color: darkMode ? "#999" : "#666", textTransform: "uppercase", marginBottom: "8px", fontWeight: "600" }}>
            {product.brand || "ZAINAB & ANI"}
          </span>
          
          <h1 style={{ fontSize: isMobile ? "22px" : "26px", fontWeight: "600", textTransform: "uppercase", marginBottom: "12px", letterSpacing: "1px", lineHeight: "1.3" }}>
            {product.title || product.name}
          </h1>

          <div style={{ marginBottom: "12px", fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase" }}>
            {product.inStock ? (
              <span style={{ color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "5px 10px", borderRadius: "3px" }}>● In Stock</span>
            ) : (
              <span style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "5px 10px", borderRadius: "3px" }}>● Out of Stock</span>
            )}
          </div>
          
          {product.price > 0 && (
            <p style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", color: goldPrimary, letterSpacing: "1px" }}>
              PKR {product.price.toLocaleString()}
            </p>
          )}

          {/* Description Accordion */}
          <div style={{ borderTop: `1px solid ${darkMode ? "#2a2a2a" : "#eaeaea"}`, padding: "12px 0" }}>
            <div onClick={() => setShowDescription(!showDescription)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: "600", fontSize: "12px", letterSpacing: "1.5px" }}>
              <span>DESCRIPTION</span>
              <span style={{ fontSize: "18px" }}>{showDescription ? "−" : "+"}</span>
            </div>
            {showDescription && (
              <div style={{ fontSize: "12px", lineHeight: "1.7", color: darkMode ? "#ccc" : "#555", marginTop: "10px", whiteSpace: "pre-line" }}>
                {product.description}
              </div>
            )}
          </div>

          {/* Product Care Accordion */}
          <div style={{ borderTop: `1px solid ${darkMode ? "#2a2a2a" : "#eaeaea"}`, borderBottom: `1px solid ${darkMode ? "#2a2a2a" : "#eaeaea"}`, padding: "12px 0", marginBottom: "20px" }}>
            <div onClick={() => setShowProductCare(!showProductCare)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: "600", fontSize: "12px", letterSpacing: "1.5px" }}>
              <span>PRODUCT CARE</span>
              <span style={{ fontSize: "18px" }}>{showProductCare ? "−" : "+"}</span>
            </div>
            {showProductCare && (
              <div style={{ fontSize: "12px", lineHeight: "1.7", color: darkMode ? "#ccc" : "#555", marginTop: "10px", whiteSpace: "pre-line" }}>
                {product.productCare}
              </div>
            )}
          </div>

          {/* TikTok Button */}
          {product.tiktokUrl && product.tiktokUrl.trim() !== "" && (
            <a href={product.tiktokUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "15px", padding: "14px", background: "#000", color: "#fff", textAlign: "center", textDecoration: "none", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", letterSpacing: "2px", border: "1px solid #333" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.13z"/>
              </svg>
              WATCH ON TIKTOK
            </a>
          )}

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            style={{ 
              padding: "16px", 
              background: !product.inStock ? "#555" : (darkMode ? "#fff" : "#000"), 
              color: !product.inStock ? "#aaa" : (darkMode ? "#000" : "#fff"), 
              border: "none", fontWeight: "700", letterSpacing: "2px", 
              cursor: product.inStock ? "pointer" : "not-allowed", 
              borderRadius: "4px", fontSize: "11px", width: "100%",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
            }}
          >
            {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
          </button>
        </div>
      </div>

      {/* PEOPLE ALSO BUY IT SECTION (Brand Related Products) */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: "80px", borderTop: `1px solid ${darkMode ? "#2a2a2a" : "#eaeaea"}`, paddingTop: "40px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "25px", textAlign: "center" }}>
            People Also Buy It
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "20px" }}>
            {relatedProducts.map((item) => {
              const itemId = item._id || item.id;
              const itemImg = Array.isArray(item.image) ? item.image[0] : (item.image || "https://via.placeholder.com/300x400");
              return (
                <div 
                  key={itemId} 
                  onClick={() => navigate(`/product/${itemId}`)}
                  style={{ cursor: "pointer", background: darkMode ? "#181818" : "#f9f9f9", borderRadius: "4px", overflow: "hidden", padding: "10px", transition: "transform 0.2s" }}
                >
                  <img src={itemImg} alt={item.title} style={{ width: "100%", height: isMobile ? "220px" : "320px", objectFit: "cover", borderRadius: "4px", marginBottom: "10px" }} />
                  <h4 style={{ fontSize: "12px", fontWeight: "600", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "5px" }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "13px", fontWeight: "700", color: goldPrimary }}>
                    PKR {Number(item.price || 0).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}