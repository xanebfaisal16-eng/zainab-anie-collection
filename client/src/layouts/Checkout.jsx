import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout({ cartItems: initialCartItems = [], darkMode, lang }) {
  const navigate = useNavigate();

  // Robust cart initialization from props or fallback localStorage
  const [cartItems, setCartItems] = useState(() => {
    if (initialCartItems && initialCartItems.length > 0) return initialCartItems;
    try {
      return JSON.parse(localStorage.getItem("zainab_anie_cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (initialCartItems && initialCartItems.length > 0) {
      setCartItems(initialCartItems);
    }
  }, [initialCartItems]);

  // Saved form details loaded from localStorage to prevent data loss on refresh
  const [formData, setFormData] = useState(() => {
    try {
      const savedData = localStorage.getItem("zainab_anie_checkout_draft");
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch {
      // fallback if error
    }
    return {
      fullName: "",
      phone: "",
      email: localStorage.getItem("loggedInUserEmail") || localStorage.getItem("userEmail") || "",
      address: "",
      country: "Pakistan",
      city: "",
      paymentMethod: "cod"
    };
  });

  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    localStorage.setItem("zainab_anie_checkout_draft", JSON.stringify(updatedForm));
  };

  const subtotal = cartItems.reduce((total, item) => total + (Number(item.price || 0) * Number(item.quantity || 1)), 0);
  const deliveryFee = 0; 
  const grandTotal = subtotal + (cartItems.length > 0 ? deliveryFee : 0);

  const handleCompleteOrder = async (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart before placing an order.");
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.country) {
      alert("Please fill in all required delivery details including country and city.");
      return;
    }

    const orderIdVal = "ZA-" + Math.floor(100000 + Math.random() * 900000);

    const newOrder = {
      id: orderIdVal,
      orderId: orderIdVal,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email || localStorage.getItem("loggedInUserEmail") || "guest@zainabanie.com",
      address: formData.address,
      city: formData.city,
      country: formData.country,
      paymentMethod: formData.paymentMethod,
      items: cartItems,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      grandTotal: grandTotal,
      date: new Date().toLocaleDateString(),
      status: "Pending"
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrder)
      });

      const data = await response.json();
      if (!data.ok) {
        console.error("Failed to save order in database:", data.error);
        alert("Error saving order to database. Please check server.");
        return;
      }
    } catch (err) {
      console.error("Network error saving order:", err);
      alert("Could not connect to server. Make sure backend is running.");
      return;
    }

    setOrderDetails(newOrder);
    setOrderCompleted(true);
    localStorage.removeItem("zainab_anie_cart");
    localStorage.removeItem("zainab_anie_checkout_draft");
  };

  const goldPrimary = "#d4af37";

  if (orderCompleted && orderDetails) {
    return (
      <div className="max-w-2xl mx-auto my-10 md:my-16 p-6 md:p-12 font-sans text-center rounded-2xl shadow-2xl transition-all" style={{ background: darkMode ? "#161616" : "#ffffff", border: `1px solid ${darkMode ? "#2a2a2a" : "#e5e5e5"}`, color: darkMode ? "#fff" : "#000" }}>
        
        <div className="mb-4">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #f3e5ab 0%, #d4af37 50%, #aa7c11 100%)" }}>
            ZAINAB & ANI HAUTE COUTURE
          </span>
        </div>

        <h2 className="text-xl md:text-2xl tracking-widest font-bold mb-4 uppercase" style={{ color: goldPrimary }}>
          Order Confirmed Successfully
        </h2>
        <p className="text-xs md:text-sm leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: darkMode ? "#ccc" : "#444" }}>
          Dear <strong style={{ color: goldPrimary }}>{orderDetails.fullName}</strong>, thank you for placing your order with us. We will contact you shortly to confirm your delivery.
        </p>

        <div className="p-5 md:p-7 text-left mb-8 space-y-3 text-xs rounded-xl" style={{ background: darkMode ? "#101010" : "#faf8f5", border: `1px solid ${goldPrimary}40` }}>
          <div className="flex justify-between border-b pb-2.5" style={{ borderColor: darkMode ? "#222" : "#eee" }}>
            <span style={{ color: darkMode ? "#999" : "#666" }}>Order Reference</span>
            <span className="font-bold" style={{ color: goldPrimary }}>#{orderDetails.orderId}</span>
          </div>
          <div className="flex justify-between border-b pb-2.5" style={{ borderColor: darkMode ? "#222" : "#eee" }}>
            <span style={{ color: darkMode ? "#999" : "#666" }}>Payment Method</span>
            <span className="font-bold" style={{ color: goldPrimary }}>Cash on Delivery</span>
          </div>
          <div className="flex justify-between border-b pb-2.5 gap-4" style={{ borderColor: darkMode ? "#222" : "#eee" }}>
            <span style={{ color: darkMode ? "#999" : "#666" }} className="shrink-0">Destination</span>
            <span className="font-bold text-right truncate max-w-[200px] md:max-w-xs">{orderDetails.address}, {orderDetails.city}, {orderDetails.country}</span>
          </div>
          <div className="flex justify-between border-b pb-2.5 gap-2" style={{ borderColor: darkMode ? "#222" : "#eee" }}>
            <span style={{ color: darkMode ? "#999" : "#666" }}>Phone & Email</span>
            <span className="font-bold truncate max-w-[180px] md:max-w-xs">{orderDetails.phone} | {orderDetails.email}</span>
          </div>
          <div className="flex justify-between pt-1 text-sm md:text-base font-bold">
            <span>Total Payable</span>
            <span style={{ color: goldPrimary }}>PKR {orderDetails.grandTotal}</span>
          </div>
        </div>

        <button 
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
          className="w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-lg"
          style={{ background: `linear-gradient(135deg, #f3e5ab 0%, #d4af37 100%)`, color: "#000", border: "none", cursor: "pointer" }}
        >
          RETURN TO HOMEPAGE
        </button>
      </div>
    );
  }

  const inputStyle = {
    padding: "14px 16px",
    background: darkMode ? "#1a1a1a" : "#fcfbfa",
    border: `1px solid ${darkMode ? "#333" : "#e2ded8"}`,
    color: darkMode ? "#fff" : "#111",
    fontSize: "13px",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "8px",
    outline: "none"
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 font-sans" style={{ background: darkMode ? "#121212" : "#fff", color: darkMode ? "#fff" : "#000" }}>
      <h2 className="text-center mb-8 md:mb-12 text-lg md:text-xl font-medium tracking-[0.25em] uppercase" style={{ color: goldPrimary }}>
        Secure Checkout & Worldwide Shipping
      </h2>

      {/* Responsive Grid Layout: Stacked on mobile, 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-start">
        
        {/* Shipping Form */}
        <form onSubmit={handleCompleteOrder} className="flex flex-col gap-5">
          <h3 className="text-xs md:text-sm font-semibold tracking-widest border-b pb-3 uppercase" style={{ borderColor: darkMode ? "#333" : "#eaeaea", color: goldPrimary }}>
            1. Shipping Information
          </h3>

          <input 
            type="text" 
            name="fullName" 
            required 
            value={formData.fullName} 
            onChange={handleChange}
            placeholder="Full Name *" 
            style={inputStyle}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="tel" 
              name="phone" 
              required 
              value={formData.phone} 
              onChange={handleChange}
              placeholder="Phone Number *" 
              style={inputStyle}
            />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="Email Address" 
              style={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country *" 
              style={inputStyle}
            />
            <input 
              type="text" 
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="City *" 
              style={inputStyle}
            />
          </div>

          <textarea 
            name="address" 
            required 
            rows="3"
            value={formData.address} 
            onChange={handleChange}
            placeholder="Delivery Address *" 
            style={{ ...inputStyle, resize: "none" }}
          />

          {/* Payment Method Section */}
          <h3 className="text-xs md:text-sm font-semibold tracking-widest border-b pb-3 uppercase mt-2" style={{ borderColor: darkMode ? "#333" : "#eaeaea", color: goldPrimary }}>
            2. Payment Method
          </h3>

          <div className="flex gap-4 text-xs">
            <label className="flex items-center gap-2.5 font-bold cursor-pointer" style={{ color: goldPrimary }}>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="cod" 
                checked={true} 
                readOnly 
              />
              Cash on Delivery (COD)
            </label>
          </div>

          <button 
            type="submit"
            disabled={cartItems.length === 0}
            className="w-full mt-2 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-md rounded-lg"
            style={{ 
              background: cartItems.length === 0 ? "#555" : `linear-gradient(135deg, #f3e5ab 0%, #d4af37 100%)`, 
              color: cartItems.length === 0 ? "#aaa" : "#000", 
              border: "none", 
              cursor: cartItems.length === 0 ? "not-allowed" : "pointer" 
            }}
          >
            {cartItems.length === 0 ? "CART IS EMPTY" : "COMPLETE ORDER"}
          </button>
        </form>

        {/* Order Summary Box */}
        <div className="p-6 md:p-8 rounded-xl shadow-sm" style={{ background: darkMode ? "#181818" : "#fbfbfa", border: `1px solid ${darkMode ? "#2a2a2a" : "#eaeaea"}` }}>
          <h3 className="text-xs md:text-sm font-semibold tracking-widest border-b pb-3 uppercase mb-5" style={{ borderColor: darkMode ? "#333" : "#eaeaea", color: goldPrimary }}>
            Order Summary ({cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} items)
          </h3>

          <div className="flex flex-col gap-3.5 max-h-[320px] overflow-y-auto mb-5 pr-1">
            {cartItems.length === 0 ? (
              <p className="text-xs" style={{ color: darkMode ? "#999" : "#666" }}>Your cart is empty.</p>
            ) : (
              cartItems.map((item, idx) => (
                <div key={item.id || idx} className="flex justify-between items-center border-b pb-3 text-xs gap-3" style={{ borderColor: darkMode ? "#2a2a2a" : "#eee" }}>
                  <span className="truncate max-w-[200px] md:max-w-[260px]">{item.title || item.name} (x{item.quantity || 1})</span>
                  <span className="font-bold shrink-0" style={{ color: goldPrimary }}>PKR {(item.price || 0) * (item.quantity || 1)}</span>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-4 flex flex-col gap-3 text-xs" style={{ borderColor: darkMode ? "#333" : "#eaeaea" }}>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold">PKR {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="font-bold">PKR {deliveryFee}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base font-bold pt-3 border-t" style={{ borderColor: darkMode ? "#333" : "#eaeaea" }}>
              <span>Total</span>
              <span style={{ color: goldPrimary }}>PKR {grandTotal}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}